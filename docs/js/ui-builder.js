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
    
    // Map values to friendly names
    const tierNames = {
        'white': 'I need clear instructions',
        'red': 'I need some guidance',
        'blue': "I'm pretty independent",
        'gold': "I'm fully self-directed"
    };
    
    const phaseNames = {
        'early-offseason': 'Early Off-Season',
        'mid-offseason': 'Mid Off-Season',
        'preseason': 'Pre-Season',
        'inseason': 'In-Season'
    };
    
    const equipmentNames = {
        'full': 'Full Facility',
        'commercial': 'Commercial Gym',
        'minimal': 'Minimal Equipment',
        'bodyweight': 'Bodyweight Only'
    };
    
    // Count how many exercises will be adapted
    const adaptationCount = userData.equipment === 'bodyweight' ? 12 : 
                           userData.equipment === 'minimal' ? 8 : 
                           userData.equipment === 'commercial' ? 3 : 0;
    
    content.innerHTML = `
        <div class="confirmation-hero">✓</div>
        <div class="confirmation-title">Your Program is Ready</div>
        <div class="confirmation-subtitle">We've customized everything based on your setup</div>
        
        <div class="confirmation-grid">
            <div class="confirmation-item">
                <div class="confirmation-icon">🎯</div>
                <div class="confirmation-text">
                    <div class="confirmation-label">Training Independence</div>
                    <div class="confirmation-value">${tierNames[userData.tier]}</div>
                </div>
            </div>
            
            <div class="confirmation-item">
                <div class="confirmation-icon">📅</div>
                <div class="confirmation-text">
                    <div class="confirmation-label">Training Phase</div>
                    <div class="confirmation-value">${phaseNames[userData.phase]}</div>
                </div>
            </div>
            
            <div class="confirmation-item">
                <div class="confirmation-icon">🏋️</div>
                <div class="confirmation-text">
                    <div class="confirmation-label">Equipment Access</div>
                    <div class="confirmation-value">${equipmentNames[userData.equipment]}</div>
                </div>
            </div>
        </div>
        
        ${adaptationCount > 0 ? `
            <div class="adaptations-box">
                <div class="adaptations-title">
                    <span>⚙️</span>
                    <span>Automatic Adaptations</span>
                    <span class="adaptations-count">${adaptationCount}</span>
                </div>
                <p style="margin: 0 0 12px 0; color: var(--text-secondary); font-size: 0.95rem;">
                    We've swapped exercises to match your equipment:
                </p>
                <ul class="adaptations-list">
                    ${userData.equipment === 'bodyweight' ? `
                        <li>Barbell Squats → Bodyweight Squats</li>
                        <li>Bench Press → Push-ups</li>
                        <li>DB Rows → Inverted Rows</li>
                        <li>...and 9 more exercises adapted</li>
                    ` : userData.equipment === 'minimal' ? `
                        <li>Barbell Squats → DB Goblet Squats</li>
                        <li>Bench Press → DB Bench Press</li>
                        <li>Cable Rows → DB Rows</li>
                        <li>...and 5 more exercises adapted</li>
                    ` : userData.equipment === 'commercial' ? `
                        <li>Specialty Bars → Standard Barbells</li>
                        <li>Sleds → Cardio Machines</li>
                        <li>...and 1 more exercise adapted</li>
                    ` : ''}
                </ul>
            </div>
        ` : `
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 8px; margin: 24px 0;">
                <p style="margin: 0; color: var(--text-secondary);">
                    <strong style="color: var(--text-primary);">✓ No adaptations needed</strong><br>
                    You have full equipment access, so you'll see the program as designed.
                </p>
            </div>
        `}
        
        <p style="margin: 32px 0 24px 0; font-size: 1.1rem; color: var(--text-primary); font-weight: 500;">
            Everything is set. Ready to start training?
        </p>
        
        <button class="btn" onclick="generateProgram()" style="width: 100%; padding: 16px; font-size: 1.1rem;">
            Start Week 1 →
        </button>
        
        <button class="btn btn-secondary" onclick="goBack('equipment')" style="width: 100%; margin-top: 12px;">
            ← Go Back
        </button>
    `;
    
    screen.classList.remove('hidden');
    updateProgressTracker(4);
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
            <div style="background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)); padding: 40px 32px; text-align: center; color: white;">
                <div style="font-size: 4rem; margin-bottom: 16px; animation: bounce 0.6s ease-out;">🔥</div>
                <h2 style="margin: 0 0 8px 0; font-size: 2rem; font-weight: 800; letter-spacing: -0.02em;">Workout Complete!</h2>
                <p style="margin: 0; font-size: 1.1rem; opacity: 0.95;">You just did the work. Own it.</p>
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
                <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid var(--primary-color);">
                    <p style="margin: 0; font-size: 0.95rem; color: var(--text-secondary);">
                        <strong style="color: var(--text-primary);">💪 Keep the momentum:</strong> Come back tomorrow and do it again.
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
