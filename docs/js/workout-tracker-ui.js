// ==================== WORKOUT TRACKING UI COMPONENTS ====================
// UI for logging sets, viewing history, and tracking progress

// ==================== EXERCISE CARD WITH TRACKING ====================

function renderExerciseWithTracking(exercise, circuitInfo, exerciseKey) {
    const trackingData = addTrackingToExercise(
        exerciseKey,
        exercise.name,
        exercise.sets || 3,
        exercise.reps || 8
    );
    
    const todayWorkout = WorkoutTracker.getTodayWorkout();
    const loggedSets = todayWorkout?.exercises[exerciseKey]?.sets || [];
    
    // Parse prescription (e.g., "3 × 8" or "4 × 5")
    const prescription = exercise.prescription || "3 × 8";
    const [numSets, numReps] = prescription.split('×').map(s => parseInt(s.trim()));
    
    return `
        <div class="exercise-card" data-exercise-key="${exerciseKey}">
            <!-- Existing exercise header -->
            <div class="exercise-header">
                <div class="exercise-order">${circuitInfo.order}</div>
                <div class="exercise-info">
                    <div class="exercise-name">${exercise.name}</div>
                    <div class="exercise-meta">${prescription} @ ${exercise.rpe || 'RPE 6-7'}</div>
                </div>
            </div>
            
            <!-- Previous workout reference -->
            ${trackingData.lastWeight ? `
                <div class="exercise-previous" style="background: rgba(59, 130, 246, 0.1); padding: 8px 12px; border-radius: 6px; margin: 12px 0; font-size: 0.9rem;">
                    <strong>💪 Last workout:</strong> ${trackingData.lastWeight} lbs
                    ${trackingData.suggestedWeight ? `<span style="color: #10b981; margin-left: 8px;">→ Try ${trackingData.suggestedWeight} lbs</span>` : ''}
                </div>
            ` : ''}
            
            <!-- Set logging interface -->
            <div class="exercise-sets" style="margin-top: 12px;">
                <div style="display: grid; grid-template-columns: 40px 1fr 80px 80px 60px 40px; gap: 8px; margin-bottom: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">
                    <div>Set</div>
                    <div></div>
                    <div>Reps</div>
                    <div>Weight</div>
                    <div>RPE</div>
                    <div>✓</div>
                </div>
                
                ${Array.from({ length: numSets }, (_, i) => {
                    const setNumber = i + 1;
                    const loggedSet = loggedSets.find(s => s.setNumber === setNumber);
                    const isLogged = !!loggedSet;
                    
                    return `
                        <div class="set-row" data-set-number="${setNumber}" style="display: grid; grid-template-columns: 40px 1fr 80px 80px 60px 40px; gap: 8px; margin-bottom: 8px; align-items: center;">
                            <!-- Set number -->
                            <div class="set-number" style="font-weight: 600; color: var(--text-secondary);">${setNumber}</div>
                            
                            <!-- Prescription -->
                            <div class="set-prescription" style="font-size: 0.9rem; color: var(--text-secondary);">
                                ${numReps} reps × ___ lbs
                            </div>
                            
                            <!-- Reps input -->
                            <input 
                                type="number" 
                                class="set-input" 
                                data-field="reps" 
                                placeholder="${numReps}"
                                value="${loggedSet?.reps || ''}"
                                min="1"
                                max="50"
                                style="padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-tertiary); width: 100%;"
                                ${isLogged ? 'disabled' : ''}
                            />
                            
                            <!-- Weight input -->
                            <input 
                                type="number" 
                                class="set-input" 
                                data-field="weight" 
                                placeholder="${trackingData.suggestedWeight || trackingData.lastWeight || '0'}"
                                value="${loggedSet?.weight || ''}"
                                min="0"
                                step="2.5"
                                style="padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-tertiary); width: 100%;"
                                ${isLogged ? 'disabled' : ''}
                            />
                            
                            <!-- RPE input -->
                            <input 
                                type="number" 
                                class="set-input" 
                                data-field="rpe" 
                                placeholder="7"
                                value="${loggedSet?.rpe || ''}"
                                min="1"
                                max="10"
                                style="padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-tertiary); width: 100%;"
                                ${isLogged ? 'disabled' : ''}
                            />
                            
                            <!-- Complete button -->
                            <button 
                                class="set-complete-btn" 
                                data-set-number="${setNumber}"
                                style="padding: 6px; border-radius: 4px; border: none; background: ${isLogged ? '#10b981' : 'var(--bg-secondary)'}; color: white; cursor: pointer; font-size: 1rem;"
                                ${isLogged ? 'disabled' : ''}
                            >
                                ${isLogged ? '✓' : '○'}
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- Exercise notes -->
            <div class="exercise-notes-section" style="margin-top: 12px;">
                <textarea 
                    class="exercise-notes-input" 
                    placeholder="Notes (e.g., 'felt strong', 'left knee twinge')"
                    style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-tertiary); resize: vertical; min-height: 60px; font-size: 0.9rem;"
                >${todayWorkout?.exercises[exerciseKey]?.notes || ''}</textarea>
            </div>
            
            <!-- View history button -->
            <button 
                class="view-history-btn" 
                data-exercise-key="${exerciseKey}"
                style="margin-top: 12px; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary); cursor: pointer; width: 100%; font-size: 0.9rem;"
            >
                📊 View History
            </button>
        </div>
    `;
}

// ==================== EVENT HANDLERS ====================

function initTrackingEventHandlers() {
    // Handle set completion
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('set-complete-btn')) {
            const button = e.target;
            const setRow = button.closest('.set-row');
            const exerciseCard = button.closest('.exercise-card');
            const exerciseKey = exerciseCard.dataset.exerciseKey;
            const setNumber = parseInt(button.dataset.setNumber);
            
            // Get input values
            const repsInput = setRow.querySelector('[data-field="reps"]');
            const weightInput = setRow.querySelector('[data-field="weight"]');
            const rpeInput = setRow.querySelector('[data-field="rpe"]');
            
            const reps = parseInt(repsInput.value) || parseInt(repsInput.placeholder);
            const weight = parseFloat(weightInput.value) || parseFloat(weightInput.placeholder);
            const rpe = parseInt(rpeInput.value) || null;
            
            // Validate
            if (!reps || !weight) {
                alert('Please enter reps and weight');
                return;
            }
            
            // Get exercise name
            const exerciseName = exerciseCard.querySelector('.exercise-name').textContent;
            
            // Log the set
            WorkoutTracker.logSet(exerciseKey, exerciseName, setNumber, reps, weight, rpe);
            
            // Update UI
            button.textContent = '✓';
            button.style.background = '#10b981';
            button.disabled = true;
            repsInput.disabled = true;
            weightInput.disabled = true;
            rpeInput.disabled = true;
            
            // Show success feedback
            showToast(`Set ${setNumber} logged: ${reps} × ${weight} lbs`);
        }
    });
    
    // Handle notes save
    document.addEventListener('blur', (e) => {
        if (e.target.classList.contains('exercise-notes-input')) {
            const exerciseCard = e.target.closest('.exercise-card');
            const exerciseKey = exerciseCard.dataset.exerciseKey;
            const notes = e.target.value;
            
            WorkoutTracker.addExerciseNotes(exerciseKey, notes);
            showToast('Notes saved');
        }
    }, true);
    
    // Handle view history
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-history-btn')) {
            const exerciseKey = e.target.dataset.exerciseKey;
            showExerciseHistory(exerciseKey);
        }
    });
}

// ==================== EXERCISE HISTORY MODAL ====================

function showExerciseHistory(exerciseKey) {
    const history = WorkoutTracker.getExerciseHistory(exerciseKey, 10);
    
    if (history.length === 0) {
        alert('No history for this exercise yet!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'history-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--bg-primary); border-radius: 12px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto; padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: var(--text-primary);">📊 Exercise History</h2>
                <button class="close-modal-btn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);">×</button>
            </div>
            
            <div style="font-weight: 600; margin-bottom: 16px; color: var(--text-primary); font-size: 1.1rem;">
                ${history[0].exerciseName}
            </div>
            
            <div style="margin-bottom: 20px;">
                ${history.map((workout, index) => `
                    <div style="background: var(--bg-secondary); padding: 16px; border-radius: 8px; margin-bottom: 12px; ${index === 0 ? 'border: 2px solid #10b981;' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <div style="font-weight: 600; color: ${index === 0 ? '#10b981' : 'var(--text-primary)'};">
                                ${workout.date} ${index === 0 ? '(Most Recent)' : ''}
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">
                                Week ${workout.week}
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px; margin-top: 12px;">
                            ${workout.sets.map(set => `
                                <div style="background: var(--bg-tertiary); padding: 8px; border-radius: 6px; text-align: center;">
                                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">Set ${set.setNumber}</div>
                                    <div style="font-weight: 600;">${set.reps} × ${set.weight}</div>
                                    ${set.rpe ? `<div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">RPE ${set.rpe}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                        
                        ${workout.notes ? `
                            <div style="margin-top: 12px; padding: 8px; background: rgba(245, 158, 11, 0.1); border-radius: 6px; font-size: 0.9rem; font-style: italic;">
                                💬 ${workout.notes}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            
            <!-- Progress chart placeholder -->
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 8px; text-align: center;">
                <div style="font-size: 0.9rem; color: var(--text-secondary);">
                    📈 Visual progress charts coming soon!
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ==================== TOAST NOTIFICATIONS ====================

function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== WORKOUT SUMMARY BUTTON ====================

function addWorkoutSummaryButton() {
    const summaryBtn = document.createElement('button');
    summaryBtn.textContent = '📊 Workout Summary';
    summaryBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        z-index: 1000;
    `;
    
    summaryBtn.addEventListener('click', showWorkoutSummary);
    document.body.appendChild(summaryBtn);
}

function showWorkoutSummary() {
    const stats = WorkoutTracker.getStats();
    const todayWorkout = WorkoutTracker.getTodayWorkout();
    
    const modal = document.createElement('div');
    modal.className = 'summary-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    const todayExercises = todayWorkout ? Object.keys(todayWorkout.exercises).length : 0;
    const todayCompletedSets = todayWorkout ? 
        Object.values(todayWorkout.exercises).reduce((sum, ex) => sum + ex.sets.filter(s => s.completed).length, 0) : 0;
    
    modal.innerHTML = `
        <div style="background: var(--bg-primary); border-radius: 12px; max-width: 500px; width: 100%; padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2 style="margin: 0; color: var(--text-primary);">📊 Your Progress</h2>
                <button class="close-modal-btn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);">×</button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
                <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1)); padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: #3b82f6;">${stats.totalWorkouts}</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 4px;">Total Workouts</div>
                </div>
                
                <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1)); padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: #10b981;">${stats.completionRate}%</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 4px;">Completion Rate</div>
                </div>
            </div>
            
            ${todayWorkout ? `
                <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 24px;">
                    <div style="font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">Today's Session:</div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: var(--text-secondary);">Exercises:</span>
                        <span style="font-weight: 600;">${todayExercises}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-secondary);">Sets Completed:</span>
                        <span style="font-weight: 600;">${todayCompletedSets}</span>
                    </div>
                </div>
            ` : ''}
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                <button class="export-data-btn" style="padding: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; color: var(--text-primary);">
                    📥 Export Data
                </button>
                <button class="complete-workout-btn" style="padding: 12px; background: linear-gradient(135deg, #10b981, #059669); border: none; border-radius: 8px; cursor: pointer; color: white; font-weight: 600;">
                    ✓ Complete Workout
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event handlers
    modal.querySelector('.close-modal-btn').addEventListener('click', () => modal.remove());
    modal.querySelector('.export-data-btn').addEventListener('click', () => {
        WorkoutTracker.exportData();
        showToast('Data exported!');
    });
    modal.querySelector('.complete-workout-btn').addEventListener('click', () => {
        WorkoutTracker.completeWorkout();
        showToast('Workout marked complete! 💪');
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ==================== INITIALIZATION ====================

// Call this when app loads
function initWorkoutTracking() {
    initTrackingEventHandlers();
    addWorkoutSummaryButton();
    console.log('✅ Workout tracking initialized');
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorkoutTracking);
} else {
    initWorkoutTracking();
}
