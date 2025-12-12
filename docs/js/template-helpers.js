// ==================== TEMPLATE HELPERS ====================
// Template evaluation, availability checking, and block periodization integration

// ==================== ERROR CHECKING ====================

function checkTemplatesLoaded() {
    if (!window.workoutTemplates || Object.keys(window.workoutTemplates).length === 0) {
        console.error('Templates not loaded!');
        showError('Workout templates failed to load. Please refresh the page.');
        return false;
    }
    return true;
}

function checkBlockPeriodizationLoaded() {
    if (!window.BlockPeriodization) {
        console.error('Block Periodization not loaded!');
        showError('Block Periodization system failed to load. Please refresh the page.');
        return false;
    }
    return true;
}

function showError(message) {
    console.error(message);
    const box = document.getElementById('errorBox');
    if (box) {
        box.classList.remove('hidden');
        box.innerHTML += `<div class="error-message">⚠️ ${message}</div>`;
    }
}

// ==================== DYNAMIC TEMPLATE EVALUATION ====================

/**
 * Evaluates template strings containing Block Periodization functions
 * Converts ${getPhaseRM()} to actual values like "5-8RM"
 */
function evaluateTemplateString(templateString, context = {}) {
    if (!templateString || typeof templateString !== 'string') {
        return templateString;
    }

    if (!checkBlockPeriodizationLoaded()) {
        return templateString;
    }

    const evalContext = {
        tier: userData.tier || 'white',
        experience: TIER_TO_EXPERIENCE_MAP[userData.tier] || 'beginner',
        phase: userData.phase || 'early-offseason', 
        week: userData.currentWeek || 1,
        ...context
    };

    try {
        let evaluated = templateString;

        // ${getPhaseRM()} - gets rep range for current context
        evaluated = evaluated.replace(/\$\{getPhaseRM\(\)\}/g, () => {
            return window.BlockPeriodization.getPhaseRM(
                evalContext.experience, 
                evalContext.phase, 
                evalContext.week
            );
        });

        // ${getPhaseIntensity()} - gets intensity for current context  
        evaluated = evaluated.replace(/\$\{getPhaseIntensity\(\)\}/g, () => {
            return window.BlockPeriodization.getPhaseIntensity(
                evalContext.experience,
                evalContext.phase, 
                evalContext.week
            );
        });

        // ${getPhaseNote()} - gets phase-specific coaching note
        evaluated = evaluated.replace(/\$\{getPhaseNote\(\)\}/g, () => {
            return window.BlockPeriodization.getPhaseNote(
                evalContext.experience,
                evalContext.phase
            );
        });

        // ${getWeeklyFocus()} - gets weekly focus description
        evaluated = evaluated.replace(/\$\{getWeeklyFocus\(\)\}/g, () => {
            return window.BlockPeriodization.getWeeklyFocus(
                evalContext.phase,
                evalContext.week  
            );
        });

        return evaluated;

    } catch (error) {
        console.error('Error evaluating template string:', error);
        return templateString;
    }
}

// ==================== TEMPLATE AVAILABILITY CHECKING ====================

/**
 * Checks if a template has actual workout data (not just description/note)
 */
function templateHasData(tier, phase, templateType) {
    try {
        const template = window.workoutTemplates?.[tier]?.[phase]?.[templateType];
        
        if (!template || template === null) return false;
        if (template.description && !template.week1) return false;
        
        if (template.week1) {
            const dayKeys = Object.keys(template.week1).filter(k => 
                ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(k)
            );
            return dayKeys.length > 0;
        }
        
        return false;
    } catch (error) {
        console.warn(`Error checking template data for ${tier}/${phase}/${templateType}:`, error);
        return false;
    }
}

/**
 * Checks if a template is marked as unavailable (coming soon)
 */
function templateIsUnavailable(tier, phase, templateType) {
    try {
        const template = window.workoutTemplates?.[tier]?.[phase]?.[templateType];
        
        if (template && template.unavailable === true) return true;
        
        // For white tier early-offseason, mark 3-day as unavailable
        if (tier === 'white' && phase === 'early-offseason' && templateType === '3day') {
            return true;
        }
        
        return false;
    } catch (error) {
        return false;
    }
}

/**
 * Gets only templates that have actual data built
 */
function getAvailableTemplatesWithData(tier, phase) {
    const possibleTemplates = [
        { key: '2day', name: '2-Day' },
        { key: '3day', name: '3-Day' },
        { key: '4day', name: '4-Day' }
    ];
    
    return possibleTemplates.filter(t => templateHasData(tier, phase, t.key));
}

/**
 * Gets all templates including unavailable ones for display purposes
 */
function getAllTemplatesForDisplay(tier, phase) {
    const possibleTemplates = [
        { key: '2day', name: '2-Day' },
        { key: '3day', name: '3-Day' },
        { key: '4day', name: '4-Day' }
    ];
    
    return possibleTemplates.map(t => ({
        ...t,
        hasData: templateHasData(tier, phase, t.key),
        unavailable: templateIsUnavailable(tier, phase, t.key)
    }));
}

// ==================== BLOCK PERIODIZATION DISPLAY ====================

/**
 * Enhanced week display with block periodization context
 */
function updateWeekDisplay() {
    const weekDisplay = document.getElementById('weekDisplay');
    if (!weekDisplay) return;

    let displayText = `Week ${userData.currentWeek}`;
    
    if (checkBlockPeriodizationLoaded() && userData.phase) {
        try {
            const blockType = window.BlockPeriodization.getBlockWaveType(userData.phase);
            const weeklyFocus = window.BlockPeriodization.getWeeklyFocus(userData.phase, userData.currentWeek);
            
            displayText += ` - ${blockType.charAt(0).toUpperCase() + blockType.slice(1)} Block`;
            
            weekDisplay.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-weight: 600; font-size: 1.1rem; color: var(--text-primary);">${displayText}</div>
                    <div style="font-size: 0.8rem; color: var(--text-tertiary); margin-top: 4px; font-style: italic;">
                        ${weeklyFocus}
                    </div>
                </div>
            `;
            return;
        } catch (error) {
            console.warn('Error getting block periodization info:', error);
        }
    }
    
    weekDisplay.textContent = displayText;
}

/**
 * Gets block periodization banner for workout display
 */
function getBlockPeriodizationBanner() {
    // Banner removed for visual clarity - block info integrated into week display
    return '';
}

// ==================== EXPORTS ====================
window.checkTemplatesLoaded = checkTemplatesLoaded;
window.checkBlockPeriodizationLoaded = checkBlockPeriodizationLoaded;
window.showError = showError;
window.evaluateTemplateString = evaluateTemplateString;
window.templateHasData = templateHasData;
window.templateIsUnavailable = templateIsUnavailable;
window.getAvailableTemplatesWithData = getAvailableTemplatesWithData;
window.getAllTemplatesForDisplay = getAllTemplatesForDisplay;
window.updateWeekDisplay = updateWeekDisplay;
window.getBlockPeriodizationBanner = getBlockPeriodizationBanner;

console.log('✅ Template Helpers loaded');
