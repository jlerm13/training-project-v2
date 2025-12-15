// ==================== WORKOUT RENDERER ====================
// All workout display logic, exercise rendering, and tracking integration

// ==================== MAIN WORKOUT RENDERING ====================

function renderWorkouts() {
    if (!checkTemplatesLoaded()) {
        const container = document.getElementById('workoutDays');
        container.innerHTML = `
            <div class="workout-day">
                <p style="color: red;">Error: Templates not loaded. Please refresh the page.</p>
            </div>
        `;
        return;
    }

    const container = document.getElementById('workoutDays');
    const weekKey = `week${userData.currentWeek}`;
    
    const templates = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.[userData.currentTemplate];
    
    console.log('🔍 Template Lookup:', {
        tier: userData.tier,
        phase: userData.phase,
        currentTemplate: userData.currentTemplate,
        found: !!templates
    });

    if (!templates) {
        container.innerHTML = `
            <div class="workout-day">
                <div style="padding: 20px; text-align: center;">
                    <p style="color: #f59e0b; font-weight: 600;">No templates found for this combination.</p>
                    <p style="color: var(--text-secondary);">Try selecting <strong>White</strong> tier and <strong>Early Off-Season</strong> phase.</p>
                </div>
            </div>
        `;
        return;
    }

    const currentWeek = templates?.[weekKey];
    if (!currentWeek) {
        container.innerHTML = `
            <div class="workout-day">
                <div style="padding: 20px; text-align: center;">
                    <p style="color: #f59e0b;">No workouts found for ${weekKey}.</p>
                    <p style="color: var(--text-secondary);">Try Week 1 or a different template.</p>
                </div>
            </div>
        `;
        return;
    }

    let html = getBlockPeriodizationBanner();
    
    Object.entries(currentWeek).forEach(([dayKey, workoutDay]) => {
        if (dayKey === 'title' || dayKey === 'notes') return;
        
        html += `
            <div class="workout-day">
                <div class="workout-header">
                    <div class="workout-title">${dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}: ${workoutDay.title || ''}</div>
                    <div class="workout-badge">${dayKey}</div>
                </div>
        `;
        
        // Render warmup section if it exists
        if (workoutDay.warmup && workoutDay.warmup.length > 0) {
            html += renderWarmupSection(workoutDay.warmup, dayKey);
        }
        
        // Render main exercises
        if (workoutDay.exercises) {
            html += renderExercisesSection(workoutDay.exercises, dayKey);
        }
        
        // Completion button
        html += renderCompletionButton(dayKey);
        
        html += `</div>`;
    });
    
    container.innerHTML = html;

    // 📊 ANALYTICS: Track workout started
    if (typeof Analytics !== 'undefined') {
        const weekKey = `week${userData.currentWeek}`;
        const templates = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.[userData.currentTemplate];
        const currentWeek = templates?.[weekKey];
        
        if (currentWeek) {
            Object.entries(currentWeek).forEach(([dayKey, workoutDay]) => {
                if (dayKey === 'title' || dayKey === 'notes') return;
                
                const totalExercises = workoutDay.exercises ? workoutDay.exercises.length : 0;
                
                // Only track if we haven't tracked this workout yet today
                const session = Analytics.getCurrentSession();
                if (!session.workoutStartTime && totalExercises > 0) {
                    Analytics.trackWorkoutStarted(totalExercises, dayKey);
                }
            });
        }
    }
}

// ==================== WARMUP RENDERING ====================

function renderWarmupSection(warmupExercises, dayKey) {
    let html = `<div style="padding: 16px; background: rgba(245, 158, 11, 0.05); margin: 12px; border-radius: 8px; border-left: 4px solid #f59e0b;">`;
    html += `<h4 style="margin: 0 0 12px 0; color: #d97706;">Warm-Up</h4>`;
    
    warmupExercises.forEach((exercise, index) => {
        const exerciseName = window.getExerciseName 
            ? window.getExerciseName(exercise.exercise)
            : exercise.exercise;
        
        html += `
            <div style="background: white; padding: 12px; border-radius: 6px; margin-bottom: 8px;">
                <div style="font-weight: 600; margin-bottom: 4px;">${exerciseName}</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">${exercise.sets} • ${exercise.tempo}</div>
                <div style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 4px;">${exercise.note}</div>
            </div>
        `;
    });
    
    html += `</div>`;
    return html;
}

// ==================== EXERCISES RENDERING ====================

function renderExercisesSection(exercises, dayKey) {
    let html = '';
    
    exercises.forEach((exercise, index) => {
        const exerciseData = window.exerciseLibrary?.[exercise.exercise];
        let exerciseName = window.getExerciseName 
            ? window.getExerciseName(exercise.exercise)
            : exercise.exercise;
            
        let isSubstituted = false;
    
        // Equipment adaptation logic
        if (userData.exerciseVariations && userData.exerciseVariations[exercise.exercise]) {
            exerciseName = userData.exerciseVariations[exercise.exercise];
        } else if (exerciseData && exerciseData.equipmentMap) {
            if (userData.phase && exerciseData.equipmentMap[userData.phase]) {
                exerciseName = exerciseData.equipmentMap[userData.phase][userData.equipment] || 
                             exerciseData.equipmentMap[userData.phase].commercial ||
                             exerciseData.equipmentMap[userData.phase].minimal ||
                             exerciseData.equipmentMap[userData.phase].bodyweight;
            } else {
                exerciseName = exerciseData.equipmentMap[userData.equipment] || exerciseData.name;
            }
            if (exerciseName !== exerciseData.name) isSubstituted = true;
        }
    
        const exerciseId = `${exercise.exercise}-${dayKey}-${index}`;
        const evaluatedSets = evaluateTemplateString(exercise.sets);
        const evaluatedIntensity = evaluateTemplateString(exercise.intensity);
        const evaluatedNote = evaluateTemplateString(exercise.note);
        const evaluatedTempo = evaluateTemplateString(exercise.tempo);
        const evaluatedRest = evaluateTemplateString(exercise.rest);
    
        html += renderExerciseBlock(
            exercise,
            exerciseData,
            exerciseName,
            exerciseId,
            evaluatedSets,
            evaluatedIntensity,
            evaluatedNote,
            evaluatedTempo,
            evaluatedRest,
            isSubstituted
        );
    });
    
    return html;
}

function renderExerciseBlock(exercise, exerciseData, exerciseName, exerciseId, evaluatedSets, evaluatedIntensity, evaluatedNote, evaluatedTempo, evaluatedRest, isSubstituted) {
    return `
        <div class="exercise-block" id="exercise-${exerciseId}" onclick="toggleExerciseDetails('${exerciseId}')">
            <div class="exercise-header-row">
                <span class="exercise-category category-${exercise.type}">${exercise.order || exercise.type.toUpperCase()}</span>
                ${exerciseData?.variations ? `<button class="variation-btn" onclick="event.stopPropagation(); showVariations('${exerciseId}', this)">Variations</button>` : ''}
            </div>
            
            <div class="exercise-name-large" id="exercise-${exerciseId}-name">${exerciseName}</div>
            
            <div class="exercise-prescription-large">${evaluatedSets}</div>
            
            <div class="exercise-actions">
                <button class="exercise-btn exercise-btn-details" onclick="event.stopPropagation(); toggleExerciseDetails('${exerciseId}');">
                    Tap for Details
                </button>
                <button class="exercise-btn exercise-btn-done" onclick="event.stopPropagation(); markExerciseDone('${exerciseId}')">
                    ✓ Done
                </button>
            </div>
            
            <div class="exercise-details-expanded" onclick="event.stopPropagation()">
                ${renderExerciseDetails(evaluatedIntensity, evaluatedTempo, evaluatedRest, evaluatedNote, isSubstituted)}
                ${renderTrackingSection(exercise.exercise, exerciseName, evaluatedSets, exerciseId)}
                <div class="collapse-hint">Tap anywhere to collapse</div>
            </div>
            
            ${exerciseData?.variations ? renderVariationsDropdown(exercise.exercise, exerciseData, exerciseId) : ''}
        </div>
    `;
}

function renderExerciseDetails(evaluatedIntensity, evaluatedTempo, evaluatedRest, evaluatedNote, isSubstituted) {
    let html = '';
    
    if (evaluatedIntensity) {
        html += `
            <div class="exercise-detail-row">
                <span class="exercise-detail-label">Intensity:</span>
                <span class="exercise-detail-value">${evaluatedIntensity}</span>
            </div>
        `;
    }
    
    if (evaluatedTempo) {
        html += `
            <div class="exercise-detail-row">
                <span class="exercise-detail-label">Tempo:</span>
                <span class="exercise-detail-value">${evaluatedTempo}</span>
            </div>
        `;
    }
    
    if (evaluatedRest) {
        html += `
            <div class="exercise-detail-row">
                <span class="exercise-detail-label">Rest:</span>
                <span class="exercise-detail-value">${evaluatedRest}</span>
            </div>
        `;
    }
    
    if (evaluatedNote) {
        html += `
            <div class="exercise-detail-row">
                <span class="exercise-detail-label">Coach Note:</span>
                <span class="exercise-detail-value">${evaluatedNote}</span>
            </div>
        `;
    }
    
    if (isSubstituted) {
        html += `
            <div class="last-week-reference">
                ⚙️ Adapted to your equipment: ${userData.equipment}
            </div>
        `;
    }
    
    return html;
}

// ==================== TRACKING INTERFACE ====================

function renderTrackingSection(exerciseKey, exerciseName, prescription, exerciseId) {
    return `
        <div class="tracking-section" onclick="event.stopPropagation()">
            <div class="tracking-header">📊 Track Your Sets</div>
            ${renderTrackingInterface(exerciseKey, exerciseName, prescription, exerciseId)}
            ${renderNotesArea(exerciseId)}
        </div>
    `;
}

function renderTrackingInterface(exerciseKey, exerciseName, prescription, exerciseId) {
    const prescriptionMatch = prescription.match(/(\d+)\s*[×x]\s*(\d+)/);
    if (!prescriptionMatch) {
        return '<p style="color: var(--text-tertiary); font-style: italic;">Tracking not available for this exercise type</p>';
    }
    
    const numSets = parseInt(prescriptionMatch[1]);
    const numReps = parseInt(prescriptionMatch[2]);
    const lastWeight = WorkoutTracker.getLastWeight(exerciseKey);
    const suggestedWeight = WorkoutTracker.getSuggestedWeight(exerciseKey);
    const todayWorkout = WorkoutTracker.getTodayWorkout();
    const loggedSets = todayWorkout?.exercises?.[exerciseKey]?.sets || [];
    
    let html = '';
    
    if (lastWeight) {
        html += `
            <div class="last-workout-reference" onclick="event.stopPropagation()">
                <span>💪 Last workout: <strong>${lastWeight} lbs</strong></span>
                ${suggestedWeight && suggestedWeight > lastWeight ? `
                    <span class="suggested-weight-badge">Try ${suggestedWeight} lbs</span>
                ` : ''}
            </div>
        `;
    }
    
    html += `
        <div class="tracking-grid-header" onclick="event.stopPropagation()">
            <div>Set</div>
            <div>Target</div>
            <div>Reps</div>
            <div>Weight</div>
            <div></div>
        </div>
    `;
    
    for (let i = 1; i <= numSets; i++) {
        const loggedSet = loggedSets.find(s => s.setNumber === i);
        const isCompleted = !!loggedSet;
        
        html += renderSetRow(i, numReps, exerciseId, loggedSet, isCompleted, suggestedWeight, lastWeight);
    }
    
    return html;
}

function renderSetRow(setNumber, numReps, exerciseId, loggedSet, isCompleted, suggestedWeight, lastWeight) {
    return `
        <div class="tracking-set-row ${isCompleted ? 'completed' : ''}" id="set-row-${exerciseId}-${setNumber}" onclick="event.stopPropagation()">
            <div class="set-number-badge">${setNumber}</div>
            <div class="set-prescription-hint">${numReps} × __</div>
            <input 
                type="number" 
                class="tracking-input"
                id="reps-${exerciseId}-${setNumber}"
                placeholder="${numReps}"
                value="${loggedSet?.reps || ''}"
                min="1"
                max="50"
                onclick="event.stopPropagation()"
                onfocus="event.stopPropagation()"
                ${isCompleted ? 'disabled' : ''}
            />
            <input 
                type="number" 
                class="tracking-input"
                id="weight-${exerciseId}-${setNumber}"
                placeholder="${suggestedWeight || lastWeight || '0'}"
                value="${loggedSet?.weight || ''}"
                min="0"
                step="2.5"
                onclick="event.stopPropagation()"
                onfocus="event.stopPropagation()"
                ${isCompleted ? 'disabled' : ''}
            />
            <button 
                class="tracking-check-btn"
                id="check-${exerciseId}-${setNumber}"
                onclick="event.stopPropagation(); logSetInline('${exerciseId.split('-')[0]}', '${exerciseId.split('-name')[0]}', ${setNumber}, '${exerciseId}')"
                ${isCompleted ? 'disabled' : ''}
            >
                ${isCompleted ? '✓' : '○'}
            </button>
        </div>
    `;
}

function renderNotesArea(exerciseId) {
    return `
        <div class="exercise-notes-area" onclick="event.stopPropagation()">
            <div class="exercise-notes-label">Notes (optional)</div>
            <textarea 
                class="exercise-notes-textarea" 
                placeholder="How did it feel? Any adjustments needed?"
                id="notes-${exerciseId}"
                onclick="event.stopPropagation()"
                onfocus="event.stopPropagation()"
                onblur="saveExerciseNotes('${exerciseId.split('-')[0]}', '${exerciseId}')"
            ></textarea>
        </div>
    `;
}

// ==================== VARIATIONS DROPDOWN ====================

function renderVariationsDropdown(exerciseKey, exerciseData, exerciseId) {
    return `
        <div class="variations-dropdown hidden" id="variations-${exerciseId}">
            <div class="variations-header">Choose Variation:</div>
            ${exerciseData.variations.map(variation => 
                `<div class="variation-option" onclick="selectVariation('${exerciseKey}', '${variation}', '${exerciseId}')">${variation}</div>`
            ).join('')}
            <div class="variation-option default-option" onclick="selectVariation('${exerciseKey}', '${exerciseData.name}', '${exerciseId}')">← Back to ${exerciseData.name}</div>
        </div>
    `;
}

// ==================== COMPLETION BUTTON ====================

function renderCompletionButton(dayKey) {
    const isCompleted = isWorkoutDayComplete(dayKey);
    
    return `
        <div style="padding: 24px 16px 16px 16px;">
            <button 
                id="complete-workout-${dayKey}"
                onclick="completeWorkoutDay('${dayKey}')"
                style="
                    width: 100%;
                    padding: 20px;
                    background: ${isCompleted ? '#10b981' : 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))'};
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.3rem;
                    font-weight: 800;
                    cursor: ${isCompleted ? 'default' : 'pointer'};
                    box-shadow: ${isCompleted ? '0 4px 14px rgba(16, 185, 129, 0.4)' : '0 4px 14px rgba(224, 1, 34, 0.4)'};
                    transition: all 0.2s ease;
                    letter-spacing: -0.01em;
                    text-transform: uppercase;
                "
                ${isCompleted ? 'disabled' : ''}
                onmouseover="if(!this.disabled) { this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(224, 1, 34, 0.5)'; }"
                onmouseout="if(!this.disabled) { this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 14px rgba(224, 1, 34, 0.4)'; }"
            >
                ${isCompleted ? '✓ Workout Completed' : '🔥 Complete Workout'}
            </button>
        </div>
    `;
}

function isWorkoutDayComplete(dayKey) {
    const todayWorkout = WorkoutTracker.getTodayWorkout();
    if (!todayWorkout || !todayWorkout.exercises) return false;
    
    const weekKey = `week${userData.currentWeek}`;
    const templates = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.[userData.currentTemplate];
    const workoutDay = templates?.[weekKey]?.[dayKey];
    
    if (!workoutDay || !workoutDay.exercises) return false;
    
    const totalExercises = workoutDay.exercises.length;
    
    let completedExercises = 0;
    workoutDay.exercises.forEach(exercise => {
        if (todayWorkout.exercises[exercise.exercise] && 
            todayWorkout.exercises[exercise.exercise].sets.length > 0) {
            completedExercises++;
        }
    });
    
    return completedExercises === totalExercises;
}

// ==================== EXERCISE INTERACTIONS ====================

function toggleExerciseDetails(exerciseId) {
    const exerciseBlock = document.getElementById(`exercise-${exerciseId}`);
    
    if (!exerciseBlock) return;
    
    // Close all other expanded exercises
    document.querySelectorAll('.exercise-block.expanded').forEach(block => {
        if (block.id !== `exercise-${exerciseId}`) {
            block.classList.remove('expanded');
        }
    });
    
    // Toggle this exercise
    const isExpanding = !exerciseBlock.classList.contains('expanded');
    exerciseBlock.classList.toggle('expanded');

    // If expanding, load any saved notes
    if (isExpanding) {
        const notesTextarea = exerciseBlock.querySelector('.exercise-notes-textarea');
        if (notesTextarea) {
            const exerciseKey = exerciseId.split('-')[0];
            const todayWorkout = WorkoutTracker.getTodayWorkout();
            const savedNotes = todayWorkout?.exercises?.[exerciseKey]?.notes || '';
            notesTextarea.value = savedNotes;
        }
    }
}

function markExerciseDone(exerciseId) {
    const exerciseBlock = document.getElementById(`exercise-${exerciseId}`);
    const doneButton = exerciseBlock.querySelector('.exercise-btn-done');
    
    if (doneButton.classList.contains('completed')) {
        doneButton.classList.remove('completed');
        doneButton.innerHTML = '✓ Done';
    } else {
        doneButton.classList.add('completed');
        doneButton.innerHTML = '✓ Completed';
        
        // 📊 ANALYTICS: Track exercise completion
        if (typeof Analytics !== 'undefined') {
            const allExercises = document.querySelectorAll('.exercise-block');
            const currentIndex = Array.from(allExercises).indexOf(exerciseBlock) + 1;
            const totalExercises = allExercises.length;
            
            const exerciseKey = exerciseId.split('-')[0];
            const nameElement = exerciseBlock.querySelector('.exercise-name-large');
            const exerciseName = nameElement ? nameElement.textContent : 'unknown';
            
            Analytics.trackExerciseCompleted(exerciseKey, exerciseName, currentIndex, totalExercises);
        }
        showQuickToast('Exercise marked complete! 💪');
        setTimeout(() => {
            exerciseBlock.classList.remove('expanded');
        }, 800);
    }
}

function showVariations(exerciseId, buttonElement) {
        // 📊 ANALYTICS: Track variation exploration
    if (typeof Analytics !== 'undefined') {
        const exerciseKey = exerciseId.split('-')[0];
        const nameElement = document.getElementById(`exercise-${exerciseId}-name`);
        const exerciseName = nameElement ? nameElement.textContent : 'unknown';
        Analytics.trackVariationButtonClicked(exerciseKey, exerciseName);
    }
    const dropdown = document.getElementById(`variations-${exerciseId}`);
    const allDropdowns = document.querySelectorAll('.variations-dropdown');
    
    allDropdowns.forEach(dd => {
        if (dd.id !== `variations-${exerciseId}`) {
            dd.classList.add('hidden');
        }
    });
    
    document.querySelectorAll('.variation-btn').forEach(btn => {
        if (btn !== buttonElement) {
            btn.textContent = 'Variations';
        }
    });
    
    dropdown.classList.toggle('hidden');
    
    if (dropdown.classList.contains('hidden')) {
        buttonElement.textContent = 'Variations';
    } else {
        buttonElement.textContent = 'Close';
    }
}

function selectVariation(exerciseKey, variationName, exerciseId) {
    // 📊 ANALYTICS: Track variation selection
    if (typeof Analytics !== 'undefined') {
        const exerciseData = window.exerciseLibrary[exerciseKey];
        const originalName = exerciseData ? exerciseData.name : exerciseKey;
        Analytics.trackVariationSelected(exerciseKey, originalName, variationName);
    }
    const nameElement = document.getElementById(`exercise-${exerciseId}-name`);
    const dropdown = document.getElementById(`variations-${exerciseId}`);
    
    nameElement.textContent = variationName;
    dropdown.classList.add('hidden');
    
    const button = dropdown.parentElement.querySelector('.variation-btn');
    if (button) button.textContent = 'Variations';
    
    if (!userData.exerciseVariations) userData.exerciseVariations = {};
    userData.exerciseVariations[exerciseKey] = variationName;
}

// ==================== TRACKING ACTIONS ====================

function logSetInline(exerciseKey, exerciseName, setNumber, exerciseId) {
    const repsInput = document.getElementById(`reps-${exerciseId}-${setNumber}`);
    const weightInput = document.getElementById(`weight-${exerciseId}-${setNumber}`);
    
    const reps = parseInt(repsInput.value) || parseInt(repsInput.placeholder);
    const weight = parseFloat(weightInput.value) || parseFloat(weightInput.placeholder);
    
    if (!reps || !weight) {
        alert('Please enter both reps and weight');
        return;
    }
    
    WorkoutTracker.logSet(exerciseKey, exerciseName, setNumber, reps, weight, null);

    // 📊 ANALYTICS: Track first set logged for session start latency
    if (setNumber === 1 && typeof Analytics !== 'undefined') {
        Analytics.trackFirstSetLogged(exerciseKey);
    }
    
    const setRow = document.getElementById(`set-row-${exerciseId}-${setNumber}`);
    const checkBtn = document.getElementById(`check-${exerciseId}-${setNumber}`);
    
    setRow.classList.add('completed');
    checkBtn.disabled = true;
    checkBtn.innerHTML = '✓';
    repsInput.disabled = true;
    weightInput.disabled = true;
    
    showQuickToast(`Set ${setNumber} logged: ${reps} reps × ${weight} lbs`);
}

function saveExerciseNotes(exerciseKey, exerciseId) {
    const notesTextarea = document.getElementById(`notes-${exerciseId}`);
    if (!notesTextarea) return;
    
    const notes = notesTextarea.value.trim();
    if (notes) {
        WorkoutTracker.addExerciseNotes(exerciseKey, notes);
        showQuickToast('Notes saved');
    }
}

// ==================== EXPORTS ====================
window.renderWorkouts = renderWorkouts;
window.toggleExerciseDetails = toggleExerciseDetails;
window.markExerciseDone = markExerciseDone;
window.showVariations = showVariations;
window.selectVariation = selectVariation;
window.logSetInline = logSetInline;
window.saveExerciseNotes = saveExerciseNotes;
window.isWorkoutDayComplete = isWorkoutDayComplete;

console.log('✅ Workout Renderer loaded');
