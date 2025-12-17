// ==================== UI BUILDER ====================
// Reusable UI components and screens

// ==================== PROGRESS TRACKER ====================

function updateProgressTracker(step) {
    document.querySelectorAll('.progress-step').forEach((el, idx) => {
        if (idx < step - 1) {
            el.classList.add('completed');
            el.classList.remove('active');
        } else if (idx === step - 1) {
            el.classList.add('active');
            el.classList.remove('completed');
        } else {
            el.classList.remove('active', 'completed');
        }
    });
}

// ==================== CONFIRMATION SCREEN ====================

function showConfirmationScreen() {
    hideAllScreens();
    const screen = document.getElementById('confirmationScreen');
    const content = document.getElementById('confirmationContent');
    
    // Calculate start date (next Monday)
    const startDate = getNextMonday();
    const dateString = startDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Get Monday's workout preview
    const mondayPreview = getMondayWorkoutPreview();
    
    // Count actual adaptations
    const adaptationCount = countActualAdaptations();
    
    content.innerHTML = `
        <!-- Start Date Hero -->
        <div style="text-align: center; margin-bottom: 32px;">
            <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                Week 1 Starts
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
                ${dateString}
            </div>
            ${adaptationCount > 0 ? `
                <div style="font-size: 0.9rem; color: var(--text-secondary);">
                    ${adaptationCount} exercises matched to your equipment
                </div>
            ` : ''}
        </div>
        
        <!-- Weekly Schedule Overview -->
        <div style="background: var(--bg-secondary); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-primary); margin-bottom: 16px;">
                📅 Your Week
            </div>
            <div style="display: grid; gap: 8px;">
                ${getWeeklyScheduleHTML()}
            </div>
        </div>
        
        <!-- Monday's Workout Preview -->
        <div style="background: var(--bg-secondary); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-primary); margin-bottom: 16px;">
                💪 Monday's Workout
            </div>
            ${mondayPreview.html}
        </div>
        
        <!-- Action Buttons -->
        <button class="btn" onclick="generateProgramAndShowMonday()" style="width: 100%; padding: 16px; font-size: 1.1rem; margin-bottom: 12px;">
            Start Monday's Workout →
        </button>
        
        <button class="btn btn-secondary" onclick="goBack('equipment')" style="width: 100%;">
            ← Go Back
        </button>
    `;
    
    screen.classList.remove('hidden');
    updateProgressTracker(4);
}

// ==================== HELPER: Calculate Next Monday ====================

function getNextMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ...
    
    // If today is Monday, return today
    if (dayOfWeek === 1) {
        return today;
    }
    
    // Calculate days until next Monday
    const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
    
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    
    return nextMonday;
}

// ==================== HELPER: Get Weekly Schedule HTML ====================

function getWeeklyScheduleHTML() {
    const schedule = [
        { day: 'Monday', activity: 'Full Body Workout', type: 'lift' },
        { day: 'Tuesday', activity: 'Rest or Conditioning', type: 'rest' },
        { day: 'Wednesday', activity: 'Rest or Conditioning', type: 'rest' },
        { day: 'Thursday', activity: 'Rest or Conditioning', type: 'rest' },
        { day: 'Friday', activity: 'Full Body Workout', type: 'lift' },
        { day: 'Saturday', activity: 'Rest', type: 'rest' },
        { day: 'Sunday', activity: 'Rest', type: 'rest' }
    ];
    
    return schedule.map(item => {
        const isLift = item.type === 'lift';
        return `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: ${isLift ? 'rgba(224, 1, 34, 0.05)' : 'var(--bg-tertiary)'}; border-radius: 8px; border-left: 3px solid ${isLift ? 'var(--primary-color)' : 'var(--border-strong)'};">
                <span style="font-weight: 600; color: var(--text-primary);">${item.day}</span>
                <span style="color: var(--text-secondary); font-size: 0.9rem;">${item.activity}</span>
            </div>
        `;
    }).join('');
}

// ==================== HELPER: Get Monday Workout Preview ====================

function getMondayWorkoutPreview() {
    try {
        const templates = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.['2day'];
        const mondayWorkout = templates?.week1?.monday;
        
        if (!mondayWorkout || !mondayWorkout.exercises) {
            return { html: '<p style="color: var(--text-secondary);">Workout preview unavailable</p>' };
        }
        
        // Get first 5 exercises
        const exercisesToShow = mondayWorkout.exercises.slice(0, 5);
        const remainingCount = mondayWorkout.exercises.length - 5;
        
        let html = '<div style="display: grid; gap: 10px;">';
        
        exercisesToShow.forEach(ex => {
            const exerciseName = window.getExerciseName ? window.getExerciseName(ex.exercise) : ex.exercise;
            const isAdapted = checkIfAdapted(ex.exercise);
            
            html += `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg-tertiary); border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 2px;">
                            ${ex.order} ${exerciseName}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">
                            ${ex.sets}
                        </div>
                    </div>
                </div>
            `;
        });
        
        if (remainingCount > 0) {
            html += `
                <div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 0.9rem;">
                    +${remainingCount} more exercises
                </div>
            `;
        }
        
        html += '</div>';
        
        return { html };
        
    } catch (error) {
        console.error('Error generating Monday preview:', error);
        return { html: '<p style="color: var(--text-secondary);">Workout preview unavailable</p>' };
    }
}

// ==================== HELPER: Check If Exercise Is Adapted ====================

function checkIfAdapted(exerciseKey) {
    try {
        const exerciseData = window.exerciseLibrary?.[exerciseKey];
        if (!exerciseData || !exerciseData.equipmentMap) {
            return false;
        }
        
        const adaptedName = exerciseData.equipmentMap[userData.equipment];
        const originalName = exerciseData.name;
        
        return adaptedName && adaptedName !== originalName;
        
    } catch (error) {
        return false;
    }
}

// ==================== HELPER: Count Actual Adaptations ====================

function countActualAdaptations() {
    try {
        const templates = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.['2day'];
        const week1 = templates?.week1;
        
        if (!week1) return 0;
        
        let adaptedCount = 0;
        const seenExercises = new Set();
        
        // Check all days in week 1
        Object.values(week1).forEach(day => {
            if (day.exercises) {
                day.exercises.forEach(ex => {
                    // Only count each unique exercise once
                    if (!seenExercises.has(ex.exercise)) {
                        seenExercises.add(ex.exercise);
                        if (checkIfAdapted(ex.exercise)) {
                            adaptedCount++;
                        }
                    }
                });
            }
        });
        
        return adaptedCount;
        
    } catch (error) {
        console.error('Error counting adaptations:', error);
        return 0;
    }
}

// ==================== CELEBRATION MODAL ====================

/**
 * Completes the workout day and shows celebration screen
 */
function completeWorkoutDay(dayKey) {
    // Mark workout as complete
    WorkoutTracker.completeWorkout();
    // 📊 ANALYTICS: Track workout completed
    if (typeof Analytics !== 'undefined') {
        Analytics.trackWorkoutCompleted(dayKey);
    }
    
    // Get stats
    const stats = WorkoutTracker.getStats();
    const todayWorkout = WorkoutTracker.getTodayWorkout();
    
    const todayExercises = todayWorkout ? Object.keys(todayWorkout.exercises).length : 0;
    const todayCompletedSets = todayWorkout ? 
        Object.values(todayWorkout.exercises).reduce((sum, ex) => sum + ex.sets.filter(s => s.completed).length, 0) : 0;
    
    // Calculate total volume for today
    let todayVolume = 0;
    if (todayWorkout) {
        Object.values(todayWorkout.exercises).forEach(exercise => {
            exercise.sets.forEach(set => {
                if (set.completed) {
                    todayVolume += set.reps * set.weight;
                }
            });
        });
    }
    
    // Create celebration modal
    const modal = document.createElement('div');
    modal.id = 'completion-celebration-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--bg-primary); border-radius: 16px; max-width: 500px; width: 100%; padding: 0; overflow: hidden; animation: slideUp 0.4s ease-out; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
            
            <!-- Hero Section -->
            <div style="background: var(--bg-primary); padding: 32px; text-align: left; border-bottom: 1px solid var(--border-subtle);">
                <h2 style="margin: 0 0 8px 0; font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">✓ Workout Logged</h2>
                <p style="margin: 0; font-size: 0.95rem; color: var(--text-secondary);">Your progress has been saved</p>
            </div>
            
            <!-- Stats Grid -->
            <div style="padding: 32px;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
                    <div style="background: linear-gradient(135deg, rgba(224, 1, 34, 0.1), rgba(224, 1, 34, 0.05)); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid rgba(224, 1, 34, 0.2);">
                        <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 4px;">${todayExercises}</div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Exercises</div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, rgba(224, 1, 34, 0.1), rgba(224, 1, 34, 0.05)); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid rgba(224, 1, 34, 0.2);">
                        <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 4px;">${todayCompletedSets}</div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Sets</div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, rgba(224, 1, 34, 0.1), rgba(224, 1, 34, 0.05)); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid rgba(224, 1, 34, 0.2);">
                        <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 4px;">${todayVolume.toLocaleString()}</div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Total Lbs</div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, rgba(224, 1, 34, 0.1), rgba(224, 1, 34, 0.05)); padding: 20px; border-radius: 12px; text-align: center; border: 2px solid rgba(224, 1, 34, 0.2);">
                        <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 4px;">${stats.completedWorkouts}</div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Total Workouts</div>
                    </div>
                </div>
                
                <!-- Next Workout Prompt -->
                <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 24px;">
                    <p style="margin: 0; font-size: 0.95rem; color: var(--text-secondary);">
                        <strong style="color: var(--text-primary);">Next workout:</strong> Return tomorrow to continue Week ${userData.currentWeek}
                    </p>
                </div>
                
                <!-- Close Button -->
                <button 
                    onclick="closeCelebrationModal()"
                    style="width: 100%; padding: 16px; background: var(--primary-color); color: white; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 14px rgba(224, 1, 34, 0.4); transition: all 0.2s ease;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(224, 1, 34, 0.5)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 14px rgba(224, 1, 34, 0.4)'"
                >
                    Done →
                </button>
            </div>
        </div>
    `;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    // 📊 ANALYTICS: Track celebration shown
    if (typeof Analytics !== 'undefined') {
        Analytics.trackCelebrationShown({
            exercises: todayExercises,
            sets: todayCompletedSets,
            volume: todayVolume,
            totalWorkouts: stats.completedWorkouts
        });
    }
    
    document.body.appendChild(modal);
    
    // Mark the workout button as completed in the UI
    const completionBtn = document.getElementById(`complete-workout-${dayKey}`);
    if (completionBtn) {
        completionBtn.style.background = '#10b981';
        completionBtn.innerHTML = '✓ Workout Completed';
        completionBtn.disabled = true;
    }
}

/**
 * Closes the celebration modal
 */
function closeCelebrationModal() {
    // 📊 ANALYTICS: Track celebration engagement
    if (typeof Analytics !== 'undefined') {
        Analytics.trackCelebrationClosed();
    }
    const modal = document.getElementById('completion-celebration-modal');
    if (modal) {
        modal.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => modal.remove(), 300);
    }
}

// ==================== TOAST NOTIFICATIONS ====================

function showQuickToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: slideUp 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ==================== EXPORTS ====================
window.updateProgressTracker = updateProgressTracker;
window.showConfirmationScreen = showConfirmationScreen;
window.completeWorkoutDay = completeWorkoutDay;
window.closeCelebrationModal = closeCelebrationModal;
window.showQuickToast = showQuickToast;

console.log('✅ UI Builder loaded');
