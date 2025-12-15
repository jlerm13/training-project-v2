// ==================== ANALYTICS SYSTEM - PHASE 1 ENHANCED ====================
// Behavioral tracking for pilot validation
// Events stored in localStorage, exportable for analysis
// v1.1 - PHASE 1: Complete abandonment detection with inactivity reset

// ==================== STORAGE KEYS ====================

const ANALYTICS_STORAGE_KEY = 'ignition_analytics_events';
const SESSION_STORAGE_KEY = 'ignition_current_session';

// ==================== SUPABASE CONNECTION ====================

const SUPABASE_URL = 'https://qkxnwpnguwtvtpxqrggr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_b701hMqncj7uo43rVd82tw_l3vbYRzI';

// Generate or retrieve athlete ID
function getOrCreateAthleteId() {
    let id = localStorage.getItem('athlete_id');
    if (!id) {
        id = `athlete_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('athlete_id', id);
    }
    return id;
}

// Send event to Supabase
async function sendToSupabase(event) {
    try {
        await fetch(`${SUPABASE_URL}/rest/v1/analytics_events`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                athlete_id: getOrCreateAthleteId(),
                session_id: event.sessionId,
                event_name: event.eventName,
                event_data: event,
                tier: event.tier,
                phase: event.phase,
                equipment: event.equipment,
                week: event.week,
                template: event.template
            })
        });
    } catch (error) {
        // Silently fail - localStorage still has the data
        console.warn('📊 Analytics sync offline:', error.message);
    }
}

// ==================== SESSION MANAGEMENT ====================

/**
 * Get or create current session
 * Session = one workout day (resets daily or on new workout start)
 */
function getCurrentSession() {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
        const session = JSON.parse(stored);
        // Session expires after 2 hours of inactivity
        if (Date.now() - session.lastActivity < 2 * 60 * 60 * 1000) {
            return session;
        }
    }
    
    // Create new session
    const newSession = {
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        startTime: Date.now(),
        lastActivity: Date.now(),
        tier: userData?.tier || 'unknown',
        phase: userData?.phase || 'unknown',
        equipment: userData?.equipment || 'unknown',
        week: userData?.currentWeek || 1,
        template: userData?.currentTemplate || 'unknown'
    };
    
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
    
    // Log session start
    logEvent('session_started', {
        tier: newSession.tier,
        phase: newSession.phase,
        equipment: newSession.equipment,
        week: newSession.week,
        template: newSession.template
    });
    
    return newSession;
}

/**
 * Update session last activity time
 */
function touchSession() {
    const session = getCurrentSession();
    session.lastActivity = Date.now();
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

/**
 * End current session
 */
function endSession(reason = 'manual') {
    const session = getCurrentSession();
    
    logEvent('session_ended', {
        duration_ms: Date.now() - session.startTime,
        reason: reason
    });
    
    localStorage.removeItem(SESSION_STORAGE_KEY);
}

// ==================== EVENT LOGGING ====================

/**
 * Core event logging function
 * All events go through here
 */
function logEvent(eventName, properties = {}) {
    const session = getCurrentSession();
    
    const event = {
        eventName: eventName,
        timestamp: Date.now(),
        sessionId: session.sessionId,
        tier: session.tier,
        phase: session.phase,
        equipment: session.equipment,
        week: session.week,
        template: session.template,
        ...properties
    };

    sendToSupabase(event);
    
    // Get existing events
    const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    const events = stored ? JSON.parse(stored) : [];
    
    // Add new event
    events.push(event);
    
    // Store back
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events));
    
    // Console log for debugging
    console.log('📊 Analytics:', eventName, properties);
    
    touchSession();
}

// ==================== CRITICAL TRACKING EVENTS ====================

/**
 * 1. SESSION START LATENCY
 * Tracks hesitation between app open and first set logged
 */
function trackAppOpened() {
    const session = getCurrentSession();
    
    // Store app open time on session object
    session.appOpenTime = Date.now();
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    
    logEvent('app_opened', {
        returning_user: !!WorkoutTracker.getStats().totalWorkouts,
        has_logged_before: WorkoutTracker.getStats().totalWorkouts > 0
    });
}

function trackFirstSetLogged(exerciseKey) {
    const session = getCurrentSession();
    
    if (session.appOpenTime && !session.firstSetLogged) {
        const latency = Date.now() - session.appOpenTime;
        
        logEvent('session_start_latency', {
            latency_ms: latency,
            latency_seconds: Math.round(latency / 1000),
            first_exercise: exerciseKey,
            hesitation_level: latency < 30000 ? 'low' : latency < 120000 ? 'moderate' : 'high'
        });
        
        // Mark that we've tracked first set
        session.firstSetLogged = true;
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
}

/**
 * 2. EQUIPMENT GAP RESPONSE
 * What happens when athlete encounters missing equipment
 */
function trackVariationButtonClicked(exerciseKey, exerciseName) {
    const startTime = Date.now();
    
    // Store start time for time-to-decision calculation
    const session = getCurrentSession();
    if (!session.variationDecisions) session.variationDecisions = {};
    session.variationDecisions[exerciseKey] = {
        startTime: startTime,
        exerciseName: exerciseName
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    
    logEvent('variation_explored', {
        exercise_key: exerciseKey,
        exercise_name: exerciseName,
        equipment_context: userData?.equipment || 'unknown'
    });
}

function trackVariationSelected(exerciseKey, originalName, selectedVariation) {
    const session = getCurrentSession();
    const decision = session.variationDecisions?.[exerciseKey];
    
    const timeToDecision = decision ? Date.now() - decision.startTime : null;
    
    const responseType = selectedVariation === originalName ? 'kept_default' : 'substituted';
    
    logEvent('equipment_gap_response', {
        exercise_key: exerciseKey,
        original_exercise: originalName,
        selected_variation: selectedVariation,
        response_type: responseType,
        time_to_decision_ms: timeToDecision,
        decision_speed: timeToDecision < 5000 ? 'fast' : timeToDecision < 15000 ? 'moderate' : 'slow'
    });
    
    // Clean up decision tracking
    if (session.variationDecisions) {
        delete session.variationDecisions[exerciseKey];
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
}

function trackExerciseSkipped(exerciseKey, exerciseName, reason = 'unknown') {
    logEvent('equipment_gap_response', {
        exercise_key: exerciseKey,
        exercise_name: exerciseName,
        response_type: 'skipped',
        skip_reason: reason
    });
}

/**
 * 3. CELEBRATION ENGAGEMENT
 * Do athletes care about the "holy shit" moment?
 */
function trackCelebrationShown(sessionStats) {
    const session = getCurrentSession();
    
    // Store celebration show time
    session.celebrationShowTime = Date.now();
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    
    logEvent('celebration_shown', {
        exercises_completed: sessionStats.exercises || 0,
        sets_completed: sessionStats.sets || 0,
        total_volume: sessionStats.volume || 0,
        total_workouts_alltime: sessionStats.totalWorkouts || 0
    });
}

function trackCelebrationClosed() {
    const session = getCurrentSession();
    
    if (session.celebrationShowTime) {
        const dwellTime = Date.now() - session.celebrationShowTime;
        const immediateClose = dwellTime < 1000;
        
        logEvent('celebration_engagement', {
            dwell_time_ms: dwellTime,
            dwell_time_seconds: Math.round(dwellTime / 1000),
            immediate_close: immediateClose,
            engagement_level: immediateClose ? 'dismissed' : dwellTime < 3000 ? 'glanced' : dwellTime < 10000 ? 'read' : 'studied'
        });
        
        // Clean up
        delete session.celebrationShowTime;
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
}

function trackCelebrationInteraction(interactionType) {
    logEvent('celebration_interaction', {
        interaction_type: interactionType // 'tapped_stats', 'viewed_next_workout', etc.
    });
}

/**
 * 4. RETURN BEHAVIOR
 * Do they come back Day 2?
 */
function trackReturnBehavior() {
    const allWorkouts = WorkoutTracker.getUserWorkouts();
    const workoutDates = Object.keys(allWorkouts).sort();
    
    if (workoutDates.length < 2) {
        // First workout - can't calculate return behavior yet
        logEvent('first_workout_completed', {
            date: workoutDates[0] || new Date().toISOString().split('T')[0]
        });
        return;
    }
    
    // Calculate gaps between workouts (in hours)
    const gaps = [];
    for (let i = 1; i < workoutDates.length; i++) {
        const prev = new Date(workoutDates[i - 1]).getTime();
        const curr = new Date(workoutDates[i]).getTime();
        gaps.push((curr - prev) / (1000 * 60 * 60)); // hours
    }
    
    // Day 2 return = came back within 48 hours
    const day2Return = gaps[0] <= 48;
    
    logEvent('return_behavior', {
        total_workouts: workoutDates.length,
        returned_day_2: day2Return,
        average_gap_hours: gaps.reduce((a, b) => a + b, 0) / gaps.length,
        longest_gap_hours: Math.max(...gaps),
        consistency_score: gaps.filter(g => g <= 48).length / gaps.length
    });
}

/**
 * 5. ABANDONMENT POINT
 * Where do they quit?
 */
function trackWorkoutStarted(totalExercises, workoutDayKey) {
    const session = getCurrentSession();
    
    session.workoutStartTime = Date.now();
    session.totalExercises = totalExercises;
    session.completedExercises = 0;
    session.workoutDayKey = workoutDayKey;
    session.lastExerciseCompleted = null;
    
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    
    logEvent('workout_started', {
        total_exercises: totalExercises,
        workout_day: workoutDayKey
    });
}

function trackExerciseCompleted(exerciseKey, exerciseName, exerciseNumber, totalExercises) {
    const session = getCurrentSession();
    
    session.completedExercises = exerciseNumber;
    session.lastExerciseCompleted = exerciseKey;
    session.lastActivity = Date.now();
    
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    
    logEvent('exercise_completed', {
        exercise_key: exerciseKey,
        exercise_name: exerciseName,
        exercise_number: exerciseNumber,
        total_exercises: totalExercises,
        progress_percent: Math.round((exerciseNumber / totalExercises) * 100)
    });
}

function trackWorkoutCompleted(dayKey) {
    const session = getCurrentSession();
    
    const duration = Date.now() - (session.workoutStartTime || session.startTime);
    
    logEvent('workout_completed', {
        workout_day: dayKey,
        duration_ms: duration,
        duration_minutes: Math.round(duration / 60000),
        exercises_completed: session.completedExercises || 0,
        total_exercises: session.totalExercises || 0,
        completion_rate: session.totalExercises ? (session.completedExercises / session.totalExercises) : 0
    });
    
    // Track return behavior after completion
    trackReturnBehavior();
    
    // Stop abandonment detection on completion
    stopAbandonmentDetection();
}

function trackWorkoutAbandoned(reason = 'unknown') {
    const session = getCurrentSession();
    
    const abandonmentPoint = session.lastExerciseCompleted || 'warmup';
    const progress = session.totalExercises ? (session.completedExercises / session.totalExercises) : 0;
    
    logEvent('session_abandonment', {
        abandonment_point: abandonmentPoint,
        completed_exercises: session.completedExercises || 0,
        total_exercises: session.totalExercises || 0,
        progress_percent: Math.round(progress * 100),
        abandonment_type: reason,
        time_since_last_action_ms: Date.now() - (session.lastActivity || session.startTime),
        workout_duration_before_abandon_ms: Date.now() - (session.workoutStartTime || session.startTime)
    });
    
    // Stop checking after abandonment is logged
    stopAbandonmentDetection();
}

// ==================== PHASE 1: ENHANCED ABANDONMENT DETECTION ====================

let abandonmentCheckInterval;
let inactivityResetTimer;

/**
 * CRITICAL FIX: Reset inactivity on ANY user interaction
 * This prevents false positives (marking engaged users as abandoned)
 */
function resetInactivityTimer() {
    // Update session.lastActivity immediately
    touchSession();
    
    // Reset the auto-abandonment check timer
    if (inactivityResetTimer) {
        clearTimeout(inactivityResetTimer);
    }
    
    // If user is still inactive after 5 minutes, check for abandonment
    inactivityResetTimer = setTimeout(() => {
        checkForAbandonment();
    }, 5 * 60 * 1000); // 5 minutes
}

/**
 * Check if workout should be marked as abandoned
 */
function checkForAbandonment() {
    const session = getCurrentSession();
    
    // Only check if workout was started
    if (!session.workoutStartTime) {
        return;
    }
    
    // Check if workout was already completed
    const todayWorkout = WorkoutTracker.getTodayWorkout();
    if (todayWorkout?.completed) {
        return; // Don't mark completed workouts as abandoned
    }
    
    // Calculate inactivity time
    const inactiveTime = Date.now() - session.lastActivity;
    
    // If more than 5 minutes inactive, mark as abandoned
    if (inactiveTime >= 5 * 60 * 1000) {
        trackWorkoutAbandoned('timeout');
    }
}

/**
 * Start checking for abandonment
 * Called when workout screen is shown
 */
function startAbandonmentDetection() {
    console.log('📊 Starting abandonment detection');
    
    // Start the inactivity reset timer
    resetInactivityTimer();
    
    // Also check periodically (backup mechanism)
    abandonmentCheckInterval = setInterval(() => {
        checkForAbandonment();
    }, 60 * 1000); // Check every minute
}

/**
 * Stop abandonment detection
 * Called on workout completion or manual close
 */
function stopAbandonmentDetection() {
    console.log('📊 Stopping abandonment detection');
    
    if (abandonmentCheckInterval) {
        clearInterval(abandonmentCheckInterval);
        abandonmentCheckInterval = null;
    }
    
    if (inactivityResetTimer) {
        clearTimeout(inactivityResetTimer);
        inactivityResetTimer = null;
    }
}

// ==================== DATA EXPORT ====================

/**
 * Export all analytics data for analysis
 */
function exportAnalytics() {
    const events = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    
    if (!events) {
        alert('No analytics data to export yet!');
        return;
    }
    
    const parsed = JSON.parse(events);
    
    // Create downloadable JSON
    const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ignition-analytics-${Date.now()}.json`;
    a.click();
    
    console.log('📊 Exported', parsed.length, 'events');
}

/**
 * Get analytics summary for debugging
 */
function getAnalyticsSummary() {
    const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    const events = stored ? JSON.parse(stored) : [];
    
    const summary = {
        totalEvents: events.length,
        eventTypes: {},
        sessions: new Set(),
        dateRange: {
            first: events.length > 0 ? new Date(events[0].timestamp).toISOString() : null,
            last: events.length > 0 ? new Date(events[events.length - 1].timestamp).toISOString() : null
        }
    };
    
    events.forEach(event => {
        summary.eventTypes[event.eventName] = (summary.eventTypes[event.eventName] || 0) + 1;
        summary.sessions.add(event.sessionId);
    });
    
    summary.uniqueSessions = summary.sessions.size;
    
    return summary;
}

/**
 * Clear all analytics data (use with caution)
 */
function clearAnalytics() {
    if (confirm('Clear all analytics data? This cannot be undone.')) {
        localStorage.removeItem(ANALYTICS_STORAGE_KEY);
        localStorage.removeItem(SESSION_STORAGE_KEY);
        console.log('📊 Analytics cleared');
    }
}

// ==================== PAGE LIFECYCLE HOOKS ====================

// Track when page is loaded
window.addEventListener('load', () => {
    trackAppOpened();
    startAbandonmentDetection();
});

// Track when page is about to close
window.addEventListener('beforeunload', () => {
    const session = getCurrentSession();
    const todayWorkout = WorkoutTracker.getTodayWorkout();
    
    // If session was started but not completed
    if (session.workoutStartTime && !todayWorkout?.completed) {
        trackWorkoutAbandoned('manual_close');
    }
    
    stopAbandonmentDetection();
});

// Track when page loses focus (app backgrounded)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        const session = getCurrentSession();
        const todayWorkout = WorkoutTracker.getTodayWorkout();
        
        // If workout in progress
        if (session.workoutStartTime && !todayWorkout?.completed) {
            const inactiveTime = Date.now() - session.lastActivity;
            
            // If inactive for more than 2 minutes when backgrounded, likely abandoned
            if (inactiveTime > 2 * 60 * 1000) {
                trackWorkoutAbandoned('app_backgrounded');
            }
        }
    } else {
        // App came back to foreground - reset inactivity timer
        resetInactivityTimer();
    }
});

// ==================== PHASE 1: INACTIVITY RESET ON USER INTERACTIONS ====================

/**
 * CRITICAL: Track ALL user interactions to prevent false abandonment
 * This runs after DOM is ready
 */
function initializeInactivityTracking() {
    // Track clicks (buttons, links, exercise cards, etc.)
    document.addEventListener('click', resetInactivityTimer, { passive: true });
    
    // Track input (typing in notes, entering reps/weight)
    document.addEventListener('input', resetInactivityTimer, { passive: true });
    
    // Track scrolling (browsing through workout)
    document.addEventListener('scroll', resetInactivityTimer, { passive: true });
    
    // Track touch events (mobile tapping)
    document.addEventListener('touchstart', resetInactivityTimer, { passive: true });
    
    // Track keyboard (arrow keys, tab navigation)
    document.addEventListener('keydown', resetInactivityTimer, { passive: true });
    
    console.log('📊 Inactivity tracking initialized - monitoring user interactions');
}

// Initialize inactivity tracking when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInactivityTracking);
} else {
    initializeInactivityTracking();
}

// ==================== EXPORTS ====================

window.Analytics = {
    // Core functions
    logEvent,
    getCurrentSession,
    
    // Critical tracking functions
    trackAppOpened,
    trackFirstSetLogged,
    trackVariationButtonClicked,
    trackVariationSelected,
    trackExerciseSkipped,
    trackCelebrationShown,
    trackCelebrationClosed,
    trackCelebrationInteraction,
    trackReturnBehavior,
    trackWorkoutStarted,
    trackExerciseCompleted,
    trackWorkoutCompleted,
    trackWorkoutAbandoned,
    
    // Utility functions
    exportAnalytics,
    getAnalyticsSummary,
    clearAnalytics,
    
    // Session management
    startAbandonmentDetection,
    stopAbandonmentDetection,
    
    // Phase 1: Inactivity management
    resetInactivityTimer,
    checkForAbandonment
};

console.log('📊 Analytics System Loaded - PHASE 1 COMPLETE');
console.log('✅ Auto-abandonment detection (5min timeout)');
console.log('✅ Page lifecycle tracking (close/background)');
console.log('✅ Inactivity reset on user interactions');
console.log('Export data: Analytics.exportAnalytics()');
console.log('View summary: Analytics.getAnalyticsSummary()');
