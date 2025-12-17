// ==================== MONDAY-DIRECT LANDING (NEW) ====================
// This function is called from confirmation screen button
// Shows Monday's workout directly instead of week overview

function generateProgramAndShowMonday() {
    // Mark that user has completed onboarding
    userData.hasSeenConfirmation = true;
    saveProgress();
    
    hideAllScreens();
    document.getElementById('programScreen').classList.remove('hidden');
    updateProgressTracker(4);
    
    // Title shows "Week X"
    document.getElementById('programTitle').textContent = `Week ${userData.currentWeek}`;
    
    // Setup template system
    const availableTemplates = getAvailableTemplatesWithData(userData.tier, userData.phase);
    if (availableTemplates.length > 0) {
        userData.currentTemplate = availableTemplates[0].key;
    } else {
        userData.currentTemplate = '2day';
    }
    
    generateProgramOverview();
    generateTemplateTabs();
    updateWeekDisplay();
    
    // CRITICAL: Show ONLY Monday's workout (not all days)
    renderMondayOnly();
}

// ==================== RENDER MONDAY ONLY ====================
// Simplified version of renderWorkouts() that shows only Monday

function renderMondayOnly() {
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
    const monday = templates?.[weekKey]?.monday;

    if (!monday) {
        container.innerHTML = `
            <div class="workout-day">
                <p style="color: #f59e0b;">Monday's workout not found.</p>
            </div>
        `;
        return;
    }

    let html = getBlockPeriodizationBanner();
    
    // Render Monday only
    html += `
        <div class="workout-day">
            <div class="workout-header">
                <div class="workout-title">Monday: ${monday.title || ''}</div>
                <div class="workout-badge">monday</div>
            </div>
    `;
    
    // Render warmup section if it exists
    if (monday.warmup && monday.warmup.length > 0) {
        html += renderWarmupSection(monday.warmup, 'monday');
    }
    
    // Render main exercises
    if (monday.exercises) {
        html += renderExercisesSection(monday.exercises, 'monday');
    }
    
    // Completion button
    html += renderCompletionButton('monday');
    
    html += `</div>`;
    
    // Show Friday link
    html += `
        <div style="padding: 20px; text-align: center;">
            <button class="btn btn-secondary" onclick="renderWorkouts()" style="padding: 12px 20px;">
                View Full Week →
            </button>
        </div>
    `;
    
    container.innerHTML = html;

    // 📊 ANALYTICS: Track workout started (Monday only)
    if (typeof Analytics !== 'undefined' && monday.exercises) {
        Analytics.trackWorkoutStarted(monday.exercises.length, 'monday');
    }
}

// Export the new functions
window.generateProgramAndShowMonday = generateProgramAndShowMonday;
window.renderMondayOnly = renderMondayOnly;

console.log('✅ Monday-direct landing functions loaded');
