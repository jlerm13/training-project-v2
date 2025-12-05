// ==================== ERROR CHECKING AND UTILITIES ====================
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

// Utility: log and display errors
function showError(message) {
    console.error(message);
    const box = document.getElementById('errorBox');
    if (box) {
        box.classList.remove('hidden');
        box.innerHTML += `<div class="error-message">⚠️ ${message}</div>`;
    }
}

// ==================== STATE MANAGEMENT ====================
let userData = {
    tier: null,  // 'white', 'red', 'blue', 'gold' - COACH ASSIGNED
    phase: 'early-offseason',  // Start here, expand later
    equipment: null,  // REMOVED: context
    currentWeek: 1,
    currentTemplate: '2day',  // Default to 2day since it's the only one fully built
    currentView: 'lifting',  // 'lifting', 'conditioning', 'schedule'
    daysPerWeek: 2,
    exerciseVariations: {},
    maxWeeks: 4,  // 4-week blocks for early off-season
    sessionDuration: 45
};

// ==================== TIER DEFINITIONS ====================
// Athlete-friendly language - avoid jargon, be clear and actionable
const TIER_SYSTEM = {
    white: {
        name: 'White',
        stage: 'Learning Phase',
        focus: 'Learn the Movements',
        // Athlete-friendly descriptions
        intensity: 'Light to moderate — leave a lot in the tank',
        intensityTechnical: '<60% effort',
        tempo: 'Slow, controlled, rhythmic  (ex: 3 sec down, 3 sec up)',
        tempoTechnical: '3-0-3 or 2-1-2',
        frequency: '2-4 days/week',
        sessionLength: '30-45 min',
        repRanges: '6-12 reps per set, some holds',
        whatToExpect: "You'll focus on moving well before moving heavy. Expect to feel like you could do more — that's the point.",
        color: '#10b981'
    },
    red: {
        name: 'Red',
        stage: 'Building Phase',
        focus: 'Build the Foundation',
        intensity: 'Moderate — should feel challenging but doable',
        intensityTechnical: '55-70% effort',
        tempo: 'Controlled with pauses',
        tempoTechnical: '2-0-2 with pauses',
        frequency: '3-4 days/week',
        sessionLength: '40-55 min',
        repRanges: '6-10 reps per set',
        whatToExpect: "Now you're building strength. Weights get heavier, but form stays tight.",
        color: '#ef4444'
    },
    blue: {
        name: 'Blue',
        stage: 'Strength Phase',
        focus: 'Build Real Strength',
        intensity: 'Challenging — 2-3 reps left in the tank',
        intensityTechnical: '65-80%',
        tempo: 'You control the speed',
        tempoTechnical: 'Self-selected',
        frequency: '4 days/week',
        sessionLength: '45-70 min',
        repRanges: '4-6 reps per set',
        whatToExpect: "Time to push. Heavier weights, fewer reps, more rest between sets.",
        color: '#3b82f6'
    },
    gold: {
        name: 'Gold',
        stage: 'Peak Phase',
        focus: 'Maximize Performance',
        intensity: 'Heavy — 1-2 reps left in the tank',
        intensityTechnical: '70-85%',
        tempo: 'Based on how you feel',
        tempoTechnical: 'Autoregulated',
        frequency: '4-5 days/week',
        sessionLength: '50-75 min',
        repRanges: '3-6 reps per set',
        whatToExpect: "You know your body. Train hard, recover smart, perform when it counts.",
        color: '#f59e0b'
    }
};

// ==================== TIER TO EXPERIENCE MAPPING ====================
// Maps new tier system to existing template structure for backwards compatibility
const TIER_TO_EXPERIENCE_MAP = {
    white: 'beginner',
    red: 'intermediate',
    blue: 'advanced',
    gold: 'advanced'  // Will have separate templates later
};

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
        return templateString; // Return original if BP not loaded
    }

    // Default context values - support both tier and experience for backwards compatibility
    const evalContext = {
        tier: userData.tier || 'white',
        experience: TIER_TO_EXPERIENCE_MAP[userData.tier] || 'beginner',  // For existing templates
        phase: userData.phase || 'early-offseason', 
        week: userData.currentWeek || 1,
        ...context
    };

    try {
        // Replace Block Periodization function calls
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
        return templateString; // Return original on error
    }
}

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
            
            // Add block type and weekly focus
            displayText += ` - ${blockType.charAt(0).toUpperCase() + blockType.slice(1)} Block`;
            
            // Add a tooltip or subtitle with weekly focus
            weekDisplay.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-weight: 600; font-size: 1.1rem;">${displayText}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px; font-style: italic;">
                        ${weeklyFocus}
                    </div>
                </div>
            `;
            return;
        } catch (error) {
            console.warn('Error getting block periodization info:', error);
        }
    }
    
    // Fallback to simple display
    weekDisplay.textContent = displayText;
}

/**
 * Gets block periodization banner for workout display
 */
function getBlockPeriodizationBanner() {
    if (!checkBlockPeriodizationLoaded() || !userData.phase) {
        return '';
    }

    try {
        const blockType = window.BlockPeriodization.getBlockWaveType(userData.phase);
        const weeklyFocus = window.BlockPeriodization.getWeeklyFocus(userData.phase, userData.currentWeek);
        const concentratedLoading = window.BlockPeriodization.getConcentratedLoading(userData.phase, userData.currentWeek);

        const blockColors = {
            'volume': '#16a34a',        // Green for volume
            'intensity': '#dc2626',     // Red for intensity  
            'specificity': '#2563eb',   // Blue for specificity
            'maintenance': '#ca8a04'    // Amber for maintenance
        };

        const blockColor = blockColors[blockType] || '#64748b';

        return `
            <div class="block-periodization-banner" style="
                background: linear-gradient(135deg, ${blockColor}15, ${blockColor}05);
                border-left: 4px solid ${blockColor};
                padding: 16px;
                margin-bottom: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            ">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: ${blockColor}; font-size: 1.1rem; margin-bottom: 4px;">
                            ${blockType.charAt(0).toUpperCase() + blockType.slice(1)} Block - Week ${userData.currentWeek}
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.4;">
                            ${weeklyFocus}
                        </div>
                    </div>
                    <div style="text-align: right; font-size: 0.85rem; color: var(--text-tertiary);">
                        <div><strong>Primary:</strong> ${concentratedLoading.primary.quality}</div>
                        <div style="margin-top: 2px;">${concentratedLoading.primary.focus}</div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error creating block periodization banner:', error);
        return '';
    }
}

// ==================== UI FLOW (4 STEPS - NO CONTEXT SCREEN) ====================
function startOnboarding() {
    hideAllScreens();
    document.getElementById('progressTracker').classList.remove('hidden');
    showExperienceScreen();
    updateProgressTracker(1);
}

function showExperienceScreen() {
    const screen = document.getElementById('experienceScreen');
    screen.innerHTML = `
        <div class="card">
            <h2>What's your competency tier?</h2>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">
                This determines rep ranges, intensity, and exercise complexity. 
                <strong>For demos: Pick "White" to see full programming (only tier currently built).</strong>
            </p>
            <div class="options-grid">
                <div class="option-card" onclick="selectTier('white')">
                    <div class="option-title">⚪ White</div>
                    <div class="option-desc">Learn the Shapes - Movement learning & work capacity</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        6-10 reps + holds | 30-45 min sessions
                    </div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #10b981; font-weight: 600;">
                        ✓ Templates Available
                    </div>
                </div>
                <div class="option-card" onclick="selectTier('red')" style="opacity: 0.6;">
                    <div class="option-title">🔴 Red</div>
                    <div class="option-desc">Stabilize the Shapes - Technique refinement & strength building</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        6-10 reps | 40-55 min sessions
                    </div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b; font-weight: 600;">
                        ⏳ Coming Soon
                    </div>
                </div>
                <div class="option-card" onclick="selectTier('blue')" style="opacity: 0.6;">
                    <div class="option-title">🔵 Blue</div>
                    <div class="option-desc">Regulate the Shapes - Strength-speed & power development</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        4-6 reps @ RPE 7-8 | 45-70 min sessions
                    </div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b; font-weight: 600;">
                        ⏳ Coming Soon
                    </div>
                </div>
                <div class="option-card" onclick="selectTier('gold')" style="opacity: 0.6;">
                    <div class="option-title">🟡 Gold</div>
                    <div class="option-desc">Own the Shapes - Maximum output & optimization</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        3-6 reps @ RPE 8 | 50-75 min sessions
                    </div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b; font-weight: 600;">
                        ⏳ Coming Soon
                    </div>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="goBack('welcome')">Back</button>
                <button class="btn hidden" id="experienceContinue" onclick="showPhaseScreen()">Continue</button>
            </div>
        </div>
    `;
    screen.classList.remove('hidden');
}

function showPhaseScreen() {
    hideAllScreens();
    const screen = document.getElementById('phaseScreen');
    screen.innerHTML = `
        <div class="card">
            <h2>What training phase are you in?</h2>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">
                <strong>Note:</strong> Only Early Off-Season has full templates built currently.
            </p>
            <div class="options-grid">
                <div class="option-card" onclick="selectPhase('early-offseason')">
                    <div class="option-title">Early Off-Season</div>
                    <div class="option-desc">Recovery & base building</div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #10b981; font-weight: 600;">
                        ✓ Templates Available
                    </div>
                </div>
                <div class="option-card" onclick="selectPhase('mid-offseason')" style="opacity: 0.6;">
                    <div class="option-title">Mid Off-Season</div>
                    <div class="option-desc">Maximum strength & muscle building</div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b; font-weight: 600;">
                        ⏳ Coming Soon
                    </div>
                </div>
                <div class="option-card" onclick="selectPhase('preseason')" style="opacity: 0.6;">
                    <div class="option-title">Pre-Season</div>
                    <div class="option-desc">Convert strength to power</div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b; font-weight: 600;">
                        ⏳ Coming Soon
                    </div>
                </div>
                <div class="option-card" onclick="selectPhase('inseason')" style="opacity: 0.6;">
                    <div class="option-title">In-Season</div>
                    <div class="option-desc">Maintain & perform</div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b; font-weight: 600;">
                        ⏳ Coming Soon
                    </div>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="goBack('experience')">Back</button>
                <button class="btn hidden" id="phaseContinue" onclick="showEquipmentScreen()">Continue</button>
            </div>
        </div>
    `;
    screen.classList.remove('hidden');
    updateProgressTracker(2);
}

// REMOVED: showContextScreen() - No longer part of flow

function showEquipmentScreen() {
    hideAllScreens();
    const screen = document.getElementById('equipmentScreen');
    screen.innerHTML = `
        <div class="card">
            <h2>What equipment do you have access to?</h2>
            <div class="options-grid">
                <div class="option-card" onclick="selectEquipment('full')">
                    <div class="option-title">Full Facility</div>
                    <div class="option-desc">Power racks, specialty bars, sleds, etc.</div>
                </div>
                <div class="option-card" onclick="selectEquipment('commercial')">
                    <div class="option-title">Commercial Gym</div>
                    <div class="option-desc">Standard equipment, machines</div>
                </div>
                <div class="option-card" onclick="selectEquipment('minimal')">
                    <div class="option-title">Minimal Equipment</div>
                    <div class="option-desc">Dumbbells, bands, basic setup</div>
                </div>
                <div class="option-card" onclick="selectEquipment('bodyweight')">
                    <div class="option-title">Bodyweight Only</div>
                    <div class="option-desc">No equipment, creativity required</div>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="goBack('phase')">Back</button>
                <button class="btn hidden" id="equipmentContinue" onclick="generateProgram()">Generate Program</button>
            </div>
        </div>
    `;
    screen.classList.remove('hidden');
    updateProgressTracker(3);  // Now step 3 instead of 4
}

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

function hideAllScreens() {
    // REMOVED contextScreen from this list
    const screens = ['welcomeScreen', 'experienceScreen', 'phaseScreen', 'equipmentScreen', 'programScreen'];
    screens.forEach(screenId => {
        const el = document.getElementById(screenId);
        if (el) el.classList.add('hidden');
    });
}

function goBack(screen) {
    hideAllScreens();
    switch (screen) {
        case 'welcome':
            document.getElementById('welcomeScreen').classList.remove('hidden');
            document.getElementById('progressTracker').classList.add('hidden');
            break;
        case 'experience':
            showExperienceScreen();
            updateProgressTracker(1);
            break;
        case 'phase':
            showPhaseScreen();
            updateProgressTracker(2);
            break;
        // REMOVED: case 'context' - no longer needed
    }
}

// ==================== SELECTORS ====================
function selectTier(tier) {
    userData.tier = tier;
    selectCard('#experienceScreen', 'experienceContinue');
}

function selectPhase(phase) {
    userData.phase = phase;
    selectCard('#phaseScreen', 'phaseContinue');
}

// REMOVED: selectContext() - no longer needed

function selectEquipment(equipment) {
    userData.equipment = equipment;
    selectCard('#equipmentScreen', 'equipmentContinue');
}

function selectCard(screenSelector, continueBtnId) {
    document.querySelectorAll(`${screenSelector} .option-card`).forEach(opt => opt.classList.remove('selected'));
    event.target.closest('.option-card').classList.add('selected');
    document.getElementById(continueBtnId).classList.remove('hidden');
}

// ==================== TEMPLATE AVAILABILITY CHECK ====================
/**
 * Checks if a template has actual workout data (not just description/note)
 */
function templateHasData(tier, phase, templateType) {
    try {
        const template = window.workoutTemplates?.[tier]?.[phase]?.[templateType];
        
        // If null, undefined, or empty object, no data
        if (!template || template === null) return false;
        
        // If it's just a description object (placeholder), no data
        if (template.description && !template.week1) return false;
        
        // Check if it has at least week1 with workout data
        if (template.week1) {
            // Check if week1 has actual day data (monday, friday, etc.)
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

// ==================== PROGRAM GENERATION ====================
function generateProgram() {
    hideAllScreens();
    document.getElementById('programScreen').classList.remove('hidden');
    updateProgressTracker(4);  // Now step 4 instead of 5

    const phaseNames = {
        'early-offseason': 'Early Off-Season',
        'mid-offseason': 'Mid Off-Season',
        'preseason': 'Pre-Season',
        'inseason': 'In-Season'
    };
    
    const tierInfo = TIER_SYSTEM[userData.tier] || TIER_SYSTEM.white;

    document.getElementById('programTitle').textContent =
        `${tierInfo.name} Tier - ${phaseNames[userData.phase] || 'Phase'} Program`;

    // Get available templates that have actual data
    const availableTemplates = getAvailableTemplatesWithData(userData.tier, userData.phase);
    
    // Set default template to first available, or fallback to 2day
    if (availableTemplates.length > 0) {
        userData.currentTemplate = availableTemplates[0].key;
    } else {
        userData.currentTemplate = '2day';  // Fallback
    }

    generateProgramOverview();
    generateTemplateTabs();
    updateWeekDisplay();
    renderWorkouts();
}

function generateTemplateTabs() {
    const container = document.querySelector('.template-tabs');
    const availableTemplates = getAvailableTemplatesWithData(userData.tier, userData.phase);
    
    if (availableTemplates.length === 0) {
        container.innerHTML = `
            <div style="color: #f59e0b; padding: 12px; background: rgba(245, 158, 11, 0.1); border-radius: 8px;">
                ⚠️ No templates available for this combination. Try <strong>White tier</strong> + <strong>Early Off-Season</strong>.
            </div>
        `;
        return;
    }
    
    let tabsHTML = '';
    
    // Lifting template tabs
    availableTemplates.forEach((template, index) => {
        const isActive = template.key === userData.currentTemplate && userData.currentView !== 'conditioning' && userData.currentView !== 'schedule' ? 'active' : '';
        tabsHTML += `<div class="template-tab ${isActive}" onclick="selectTemplate('${template.key}')">${template.name} Lift</div>`;
    });
    
    // Check if conditioning exists for this tier/phase
    const hasConditioning = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.['conditioning'];
    
    if (hasConditioning) {
        // Add separator
        tabsHTML += `<div style="width: 1px; background: var(--border-color); margin: 0 4px;"></div>`;
        
        // Conditioning tab
        const conditioningActive = userData.currentView === 'conditioning' ? 'active' : '';
        tabsHTML += `<div class="template-tab ${conditioningActive}" style="background: ${conditioningActive ? 'var(--primary-color)' : 'rgba(16, 185, 129, 0.1)'}; color: ${conditioningActive ? 'white' : '#10b981'};" onclick="showConditioning()">🏃 Conditioning</div>`;
        
        // Schedule tab
        const scheduleActive = userData.currentView === 'schedule' ? 'active' : '';
        tabsHTML += `<div class="template-tab ${scheduleActive}" style="background: ${scheduleActive ? 'var(--primary-color)' : 'rgba(59, 130, 246, 0.1)'}; color: ${scheduleActive ? 'white' : '#3b82f6'};" onclick="showWeeklySchedule()">📅 Weekly Schedule</div>`;
    }
    
    container.innerHTML = tabsHTML;
}

function generateProgramOverview() {
    const overview = document.getElementById('programOverview');
    
    // Athlete-friendly phase descriptions (no jargon)
    const phaseGuidelines = {
        'early-offseason': {
            focus: 'Build Your Base',
            subtitle: "Get your body ready to train hard",
            goals: ['Build your engine (work capacity)', 'Move better before moving heavier', 'Get in shape to train'],
            emphasis: "Focus on getting your reps in with good form — don't go heavy yet. This phase is about building the foundation.",
            weeks: '4 weeks',
            whatToExpect: "You might feel like you could do more. That's the point — we're building the base for what's coming next."
        },
        'mid-offseason': {
            focus: 'Build Strength',
            subtitle: "Time to get stronger",
            goals: ['Get stronger', 'Build muscle', 'Train your nervous system'],
            emphasis: "Weights get heavier, sets get harder. You should feel challenged but able to complete your sets with good form.",
            weeks: '4-6 weeks',
            whatToExpect: "This is where the real strength gains happen. Expect to feel genuinely tired after sessions."
        },
        'preseason': {
            focus: 'Get Explosive',
            subtitle: "Turn strength into speed and power",
            goals: ['Move faster and more explosive', 'Get game-ready', 'Peak at the right time'],
            emphasis: "Less grinding, more explosive work. Quality over quantity. Every rep should be fast and powerful.",
            weeks: '3-4 weeks',
            whatToExpect: "Sessions feel different — less fatigue, more neural. You're sharpening the blade."
        },
        'inseason': {
            focus: 'Stay Strong & Fresh',
            subtitle: "Maintain what you built, perform when it counts",
            goals: ['Keep your strength', 'Stay healthy', 'Be ready to compete'],
            emphasis: "Minimum effective dose. Get in, get the work done, get out. Save your energy for competition.",
            weeks: 'All season',
            whatToExpect: "Training supports your sport, not the other way around. Less is more during the season."
        }      
    };

    const phase = phaseGuidelines[userData.phase];
    const tierInfo = TIER_SYSTEM[userData.tier] || TIER_SYSTEM.white;
    const availableTemplates = getAvailableTemplatesWithData(userData.tier, userData.phase);
    
    // Equipment-friendly names
    const equipmentNames = {
        'full': 'Full Gym',
        'commercial': 'Commercial Gym',
        'minimal': 'Minimal Equipment',
        'bodyweight': 'Bodyweight Only'
    };
    
    overview.innerHTML = `
        <h4>Your Training Plan</h4>
        
        <!-- Main Phase Info -->
        <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                <div>
                    <h3 style="margin: 0; color: var(--primary-color);">${phase.focus}</h3>
                    <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">
                        ${phase.subtitle} • ${phase.weeks}
                    </p>
                </div>
                <div style="background: ${tierInfo.color}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                    ${tierInfo.name} Tier
                </div>
            </div>
            
            <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">${phase.emphasis}</p>
        </div>
        
        <!-- Goals and Setup Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px;">
                <h5 style="margin: 0 0 8px 0; font-size: 0.9rem; color: var(--text-secondary);">What You're Working On</h5>
                ${phase.goals.map(goal => `<div style="margin: 4px 0;">✓ ${goal}</div>`).join('')}
            </div>
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px;">
                <h5 style="margin: 0 0 8px 0; font-size: 0.9rem; color: var(--text-secondary);">Your Setup</h5>
                <div style="margin: 4px 0;"><strong>Equipment:</strong> ${equipmentNames[userData.equipment] || userData.equipment}</div>
                <div style="margin: 4px 0;"><strong>Days/Week:</strong> ${userData.currentTemplate.replace('day', '')}</div>
                <div style="margin: 4px 0;"><strong>Session:</strong> ${tierInfo.sessionLength}</div>
            </div>
        </div>
        
        <!-- How to Train -->
        <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px; margin-bottom: 12px;">
            <h5 style="margin: 0 0 8px 0; font-size: 0.9rem; color: var(--text-secondary);">How to Train</h5>
            <div style="margin: 4px 0;"><strong>Effort Level:</strong> ${tierInfo.intensity}</div>
            <div style="margin: 4px 0;"><strong>Speed:</strong> ${tierInfo.tempo}</div>
            <div style="margin: 4px 0;"><strong>Reps:</strong> ${tierInfo.repRanges}</div>
        </div>
        
        <!-- What to Expect -->
        <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid ${tierInfo.color}; padding: 12px; border-radius: 4px;">
            <p style="margin: 0; font-size: 0.9rem;">
                <strong>💡 What to Expect:</strong> ${phase.whatToExpect}
            </p>
        </div>
    `;
}

function selectTemplate(template) {
    userData.currentTemplate = template;
    userData.currentView = 'lifting';  // Reset to lifting view
    generateTemplateTabs(); // Regenerate tabs to update active state
    updateWeekDisplay(); // Update week display
    renderWorkouts();
}

// ==================== CONDITIONING VIEW ====================
function showConditioning() {
    userData.currentView = 'conditioning';
    generateTemplateTabs();
    updateWeekDisplay();
    renderConditioning();
}

function renderConditioning() {
    const container = document.getElementById('workoutDays');
    const conditioning = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.['conditioning'];
    
    if (!conditioning) {
        container.innerHTML = `<div class="workout-day"><p>No conditioning plan available for this phase.</p></div>`;
        return;
    }
    
    // Get the current week's conditioning (handle repeat weeks)
    let weekKey = `week${userData.currentWeek}`;
    let weekData = conditioning[weekKey];
    
    // Handle repeat weeks
    if (weekData?.repeatWeek) {
        const repeatKey = `week${weekData.repeatWeek}`;
        weekData = { ...conditioning[repeatKey], note: weekData.note };
    }
    
    let html = '';
    
    // Overview card
    html += `
        <div class="workout-day" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));">
            <div class="workout-header">
                <div class="workout-title">🏃 Conditioning Overview</div>
                <div class="workout-badge" style="background: #10b981;">Week ${userData.currentWeek}</div>
            </div>
            <div style="padding: 16px;">
                <p style="margin: 0 0 12px 0; font-size: 1.1rem; font-weight: 500;">${conditioning.overview.goal}</p>
                <div style="margin-bottom: 12px;">
                    <strong>Frequency:</strong> ${conditioning.overview.frequency}
                </div>
                <div style="margin-bottom: 12px;">
                    <strong>Equipment Options:</strong> ${conditioning.overview.equipment.join(', ')}
                </div>
                <div style="background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <strong>Key Rules:</strong>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                        ${conditioning.overview.keyRules.map(rule => `<li style="margin-bottom: 4px;">${rule}</li>`).join('')}
                    </ul>
                </div>
                ${weekData.note ? `<p style="margin: 12px 0 0 0; font-style: italic; color: var(--text-secondary);">📌 ${weekData.note}</p>` : ''}
            </div>
        </div>
    `;
    
    // Session cards
    ['sessionA', 'sessionB', 'sessionC'].forEach((sessionKey, index) => {
        const session = weekData[sessionKey];
        if (!session) return;
        
        const dayLabels = ['Session A (Tue or Post-Lift)', 'Session B (Thu or Post-Lift)', 'Session C (Sat or Post-Lift)'];
        
        html += `
            <div class="workout-day">
                <div class="workout-header">
                    <div class="workout-title">${session.title}</div>
                    <div class="workout-badge">${session.totalTime}</div>
                </div>
                <div style="padding: 16px;">
                    <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                        <div style="background: var(--bg-tertiary); padding: 8px 12px; border-radius: 6px;">
                            <span style="font-size: 0.8rem; color: var(--text-secondary);">Total Time</span><br>
                            <strong>${session.totalTime}</strong>
                        </div>
                        <div style="background: var(--bg-tertiary); padding: 8px 12px; border-radius: 6px;">
                            <span style="font-size: 0.8rem; color: var(--text-secondary);">Running Time</span><br>
                            <strong>${session.runningTime}</strong>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        ${session.structure.map(item => {
                            let bgColor = 'var(--bg-secondary)';
                            let icon = '•';
                            if (item.type === 'warmup') { bgColor = 'rgba(59, 130, 246, 0.1)'; icon = '🔥'; }
                            if (item.type === 'cooldown') { bgColor = 'rgba(139, 92, 246, 0.1)'; icon = '❄️'; }
                            if (item.type === 'work') { bgColor = 'rgba(16, 185, 129, 0.15)'; icon = '💪'; }
                            
                            return `
                                <div style="background: ${bgColor}; padding: 12px; border-radius: 6px; margin-bottom: 8px;">
                                    <div style="font-weight: 600; margin-bottom: 4px;">${icon} ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</div>
                                    <div style="font-size: 1rem;">${item.description}</div>
                                    ${item.detail ? `<div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">${item.detail}</div>` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div style="background: rgba(245, 158, 11, 0.1); padding: 10px 12px; border-radius: 6px; border-left: 3px solid #f59e0b;">
                        <strong>💡 Coach Note:</strong> ${session.coachNote}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ==================== WEEKLY SCHEDULE VIEW ====================
function showWeeklySchedule() {
    userData.currentView = 'schedule';
    generateTemplateTabs();
    renderWeeklySchedule();
}

function renderWeeklySchedule() {
    const container = document.getElementById('workoutDays');
    const scheduleData = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.['weeklySchedule'];
    
    if (!scheduleData) {
        container.innerHTML = `<div class="workout-day"><p>No schedule available for this phase.</p></div>`;
        return;
    }
    
    const templateSchedule = scheduleData[userData.currentTemplate];
    if (!templateSchedule) {
        container.innerHTML = `<div class="workout-day"><p>No schedule available for ${userData.currentTemplate} template.</p></div>`;
        return;
    }
    
    let html = `
        <div class="workout-day" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));">
            <div class="workout-header">
                <div class="workout-title">📅 ${templateSchedule.name}</div>
                <div class="workout-badge" style="background: #3b82f6;">Weekly View</div>
            </div>
            <div style="padding: 16px;">
    `;
    
    // If there are options (like for 3-day)
    if (templateSchedule.options) {
        html += `<p style="margin: 0 0 16px 0; font-style: italic; color: var(--text-secondary);">${templateSchedule.note || ''}</p>`;
        
        templateSchedule.options.forEach((option, index) => {
            html += `
                <div style="margin-bottom: 20px; ${index > 0 ? 'border-top: 1px solid var(--border-color); padding-top: 16px;' : ''}">
                    <h4 style="margin: 0 0 12px 0; color: var(--primary-color);">${option.name}</h4>
                    ${renderScheduleTable(option.schedule)}
                </div>
            `;
        });
    } else {
        // Single schedule (like for 2-day)
        html += renderScheduleTable(templateSchedule.schedule);
    }
    
    html += `
            </div>
        </div>
    `;
    
    // Add tips card
    html += `
        <div class="workout-day">
            <div class="workout-header">
                <div class="workout-title">💡 Scheduling Tips</div>
            </div>
            <div style="padding: 16px;">
                <ul style="margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;"><strong>Rest days matter</strong> — recovery is when you get stronger</li>
                    <li style="margin-bottom: 8px;"><strong>Don't skip conditioning</strong> — building your aerobic base helps everything else</li>
                    <li style="margin-bottom: 8px;"><strong>Lift before conditioning</strong> if doing same day — strength first, cardio second</li>
                    <li style="margin-bottom: 8px;"><strong>Listen to your body</strong> — if you're exhausted, take an extra rest day</li>
                </ul>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function renderScheduleTable(schedule) {
    const typeColors = {
        lift: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', icon: '🏋️' },
        conditioning: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', icon: '🏃' },
        rest: { bg: 'rgba(156, 163, 175, 0.1)', text: '#6b7280', icon: '😴' },
        both: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6', icon: '💪' }
    };
    
    let html = '<div style="display: grid; gap: 8px;">';
    
    schedule.forEach(day => {
        const colors = typeColors[day.type] || typeColors.rest;
        html += `
            <div style="display: flex; align-items: center; background: ${colors.bg}; padding: 10px 14px; border-radius: 8px; border-left: 4px solid ${colors.text};">
                <div style="width: 100px; font-weight: 600;">${day.day}</div>
                <div style="flex: 1;">${colors.icon} ${day.activity}</div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// ==================== ENHANCED WORKOUT RENDERING WITH DYNAMIC EVALUATION ====================
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
    
    // CRITICAL FIX: Access templates by TIER -> PHASE -> TEMPLATE TYPE
    const templates = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.[userData.currentTemplate];
    
    // DEBUG LOGGING
    console.log('🔍 Template Lookup:', {
        tier: userData.tier,
        phase: userData.phase,
        currentTemplate: userData.currentTemplate,
        found: !!templates,
        availableStructure: window.workoutTemplates ? Object.keys(window.workoutTemplates) : 'none'
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

    // Start with block periodization banner
    let html = getBlockPeriodizationBanner();
    
    Object.entries(currentWeek).forEach(([dayKey, workoutDay]) => {
        if (dayKey === 'title' || dayKey === 'notes') return;
        
        // Handle conditioning guidelines separately
        if (dayKey === 'conditioningGuidelines') {
            html += `
                <div class="workout-day">
                    <div class="workout-header">
                        <div class="workout-title">${workoutDay.title}</div>
                        <div class="workout-badge">CONDITIONING</div>
                    </div>
                    <div class="conditioning-content" style="padding: 16px;">
                        <div class="conditioning-section" style="margin-bottom: 20px;">
                            <h4 style="margin-bottom: 8px; color: var(--primary-color);">Frequency: ${workoutDay.weeklyFrequency}</h4>
                            <p style="margin-bottom: 12px;"><strong>Equipment Options:</strong> ${workoutDay.modalities.join(', ')}</p>
                        </div>
                        
                        <div class="conditioning-section" style="margin-bottom: 20px; padding: 12px; background: var(--bg-tertiary); border-radius: 6px;">
                            <h4 style="margin-bottom: 8px; color: var(--text-primary);">Session Type 1: ${workoutDay.sessions.steadyCardio.goal}</h4>
                            <p style="margin-bottom: 6px;"><strong>Structure:</strong> ${workoutDay.sessions.steadyCardio.structure.join(' → ')}</p>
                            <p style="margin-bottom: 6px;"><strong>Effort:</strong> ${workoutDay.sessions.steadyCardio.effortCue}</p>
                            <p style="margin-bottom: 0;"><strong>Progression:</strong> ${workoutDay.sessions.steadyCardio.progression}</p>
                        </div>
                        
                        <div class="conditioning-section" style="margin-bottom: 20px; padding: 12px; background: var(--bg-tertiary); border-radius: 6px;">
                            <h4 style="margin-bottom: 8px; color: var(--text-primary);">Session Type 2: ${workoutDay.sessions.easyIntervals.goal}</h4>
                            <p style="margin-bottom: 8px;"><strong>Options:</strong></p>
                            <ul style="margin-bottom: 8px; padding-left: 20px;">
                                ${workoutDay.sessions.easyIntervals.options.map(option => `<li style="margin-bottom: 4px;">${option}</li>`).join('')}
                            </ul>
                            <p style="margin-bottom: 6px;"><strong>Effort:</strong> ${workoutDay.sessions.easyIntervals.effortCue}</p>
                            <p style="margin-bottom: 0;"><strong>Progression:</strong> ${workoutDay.sessions.easyIntervals.progression}</p>
                        </div>
                        
                        <div class="conditioning-section" style="padding: 12px; background: var(--bg-secondary); border-radius: 6px; border-left: 4px solid var(--primary-color);">
                            <h4 style="margin-bottom: 8px; color: var(--text-primary);">Key Points:</h4>
                            <ul style="margin-bottom: 0; padding-left: 20px;">
                                ${workoutDay.notes.map(note => `<li style="margin-bottom: 4px;">${note}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        // Regular workout day rendering
        html += `
            <div class="workout-day">
                <div class="workout-header">
                    <div class="workout-title">${dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}: ${workoutDay.title || ''}</div>
                    <div class="workout-badge">${dayKey}</div>
                </div>
        `;
        
        if (workoutDay.exercises) {
            workoutDay.exercises.forEach((exercise, index) => {
                // Use exerciseLibrary (from exercise-loader.js) or fall back to old exerciseDatabase
                const exerciseData = window.exerciseLibrary?.[exercise.exercise] || 
                                    (typeof exerciseDatabase !== 'undefined' ? exerciseDatabase?.[exercise.exercise] : null);
                
                // Use getExerciseName helper if available, otherwise format the key
                let exerciseName = typeof getExerciseName === 'function' 
                    ? getExerciseName(exercise.exercise)
                    : exercise.exercise;
                let isSubstituted = false;

                // Check if user has selected a variation for this exercise
                if (userData.exerciseVariations && userData.exerciseVariations[exercise.exercise]) {
                    exerciseName = userData.exerciseVariations[exercise.exercise];
                } else {
                    // Handle equipment adaptation with phase-specific mapping
                    if (exerciseData && exerciseData.equipmentMap) {
                        // Check for phase-specific mapping first
                        if (userData.phase && exerciseData.equipmentMap[userData.phase]) {
                            exerciseName = exerciseData.equipmentMap[userData.phase][userData.equipment] || 
                                         exerciseData.equipmentMap[userData.phase].commercial ||
                                         exerciseData.equipmentMap[userData.phase].minimal ||
                                         exerciseData.equipmentMap[userData.phase].bodyweight;
                        } else {
                            // Fall back to simple equipment mapping
                            exerciseName = exerciseData.equipmentMap[userData.equipment] || exerciseData.name;
                        }
                        if (exerciseName !== exerciseData.name) isSubstituted = true;
                    } else if (exerciseData && exerciseData.name) {
                        exerciseName = exerciseData.name;
                    }
                    // If no exerciseData, the getExerciseName fallback is already set above
                }

                const exerciseId = `${exercise.exercise}-${dayKey}-${index}`;

                // Dynamic evaluation of template strings
                const evaluatedSets = evaluateTemplateString(exercise.sets);
                const evaluatedIntensity = evaluateTemplateString(exercise.intensity);
                const evaluatedNote = evaluateTemplateString(exercise.note);
                const evaluatedTempo = evaluateTemplateString(exercise.tempo);
                const evaluatedRest = evaluateTemplateString(exercise.rest);


                html += `
                    <div class="exercise-block">
                        <div class="exercise-header">
                            <span class="exercise-category category-${exercise.type}">${exercise.type.toUpperCase()}</span>
                            ${exerciseData?.variations ? `<button class="variation-btn" onclick="showVariations('${exerciseId}', this)">Variations</button>` : ''}
                        </div>
                        <div class="exercise-name" id="exercise-${exerciseId}-name">${exerciseName}</div>
                        <div class="exercise-details">Sets/Reps: ${evaluatedSets}</div>
                        ${evaluatedIntensity ? `<div class="exercise-details">Intensity: ${evaluatedIntensity}</div>` : ''}
                        ${evaluatedTempo ? `<div class="exercise-details">Tempo: ${evaluatedTempo}</div>` : ''}
                        ${evaluatedRest ? `<div class="exercise-details">Rest: ${evaluatedRest}</div>` : ''}
                        ${evaluatedNote ? `<div class="exercise-details">Note: ${evaluatedNote}</div>` : ''}
                        ${isSubstituted && userData.equipment !== 'full' ? `<div class="substitution-notice">Equipment adaptation: ${userData.equipment}</div>` : ''}
                        
                        ${exerciseData?.variations ? `
                            <div class="variations-dropdown hidden" id="variations-${exerciseId}">
                                <div class="variations-header">Choose Variation:</div>
                                ${exerciseData.variations.map(variation => 
                                    `<div class="variation-option" onclick="selectVariation('${exercise.exercise}', '${variation}', '${exerciseId}')">${variation}</div>`
                                ).join('')}
                                <div class="variation-option default-option" onclick="selectVariation('${exercise.exercise}', '${exerciseData.name}', '${exerciseId}')">← Back to ${exerciseData.name}</div>
                            </div>
                        ` : ''}
                    </div>
                `;
            });
        }
        html += `</div>`;
    });
    
    container.innerHTML = html;
}

// ==================== VARIATIONS FUNCTIONALITY ====================
function showVariations(exerciseId, buttonElement) {
    const dropdown = document.getElementById(`variations-${exerciseId}`);
    const allDropdowns = document.querySelectorAll('.variations-dropdown');
    
    // Close all other dropdowns
    allDropdowns.forEach(dd => {
        if (dd.id !== `variations-${exerciseId}`) {
            dd.classList.add('hidden');
        }
    });
    
    // Reset all other buttons
    document.querySelectorAll('.variation-btn').forEach(btn => {
        if (btn !== buttonElement) {
            btn.textContent = 'Variations';
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('hidden');
    
    // Update button text
    if (dropdown.classList.contains('hidden')) {
        buttonElement.textContent = 'Variations';
    } else {
        buttonElement.textContent = 'Close';
    }
}

function selectVariation(exerciseKey, variationName, exerciseId) {
    const nameElement = document.getElementById(`exercise-${exerciseId}-name`);
    const dropdown = document.getElementById(`variations-${exerciseId}`);
    
    // Update the displayed exercise name
    nameElement.textContent = variationName;
    
    // Close the dropdown
    dropdown.classList.add('hidden');
    
    // Reset button text
    const button = dropdown.parentElement.querySelector('.variation-btn');
    if (button) button.textContent = 'Variations';
    
    // Store user's selection
    if (!userData.exerciseVariations) userData.exerciseVariations = {};
    userData.exerciseVariations[exerciseKey] = variationName;
}

// ==================== WEEK NAVIGATION ====================
function previousWeek() {
    if (userData.currentWeek > 1) {
        userData.currentWeek--;
        updateWeekDisplay();
        renderCurrentView();
    }
}

function nextWeek() {
    if (userData.currentWeek < 4) {  // Changed from 6 to 4 for 4-week blocks
        userData.currentWeek++;
        updateWeekDisplay();
        renderCurrentView();
    }
}

function renderCurrentView() {
    switch(userData.currentView) {
        case 'conditioning':
            renderConditioning();
            break;
        case 'schedule':
            renderWeeklySchedule();
            break;
        default:
            renderWorkouts();
    }
}

// ==================== RESET ====================
function resetApp() {
    if (!confirm('Start over with a new program setup?')) return;
    userData = { 
        tier: null,
        phase: 'early-offseason',
        equipment: null, 
        currentWeek: 1, 
        currentTemplate: '2day',
        currentView: 'lifting',
        daysPerWeek: 2,
        exerciseVariations: {},
        maxWeeks: 4,
        sessionDuration: 45
    };
    hideAllScreens();
    document.getElementById('welcomeScreen').classList.remove('hidden');
    document.getElementById('progressTracker').classList.add('hidden');
    document.getElementById('programOverview').innerHTML = '';
    document.getElementById('workoutDays').innerHTML = '';
    const errorBox = document.getElementById('errorBox');
    if (errorBox) {
        errorBox.innerHTML = '';
        errorBox.classList.add('hidden');
    }
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Athletic Development System v2.1.0 Loaded');
    console.log('Exercise Database:', typeof exerciseDatabase !== 'undefined' ? 'Loaded' : 'Not Found');
    console.log('Workout Templates:', typeof window.workoutTemplates !== 'undefined' ? 'Loaded' : 'Not Found');
    console.log('Block Periodization:', typeof window.BlockPeriodization !== 'undefined' ? 'Loaded' : 'Not Found');
    
    // Test tier system
    console.log('✅ Tier System Loaded:', TIER_SYSTEM);
    console.log('✅ Tier Mapping:', TIER_TO_EXPERIENCE_MAP);
    
    // Debug: Show actual template structure
    if (window.workoutTemplates) {
        console.log('📦 Template Structure:', Object.keys(window.workoutTemplates));
        Object.keys(window.workoutTemplates).forEach(tier => {
            console.log(`  - ${tier}:`, Object.keys(window.workoutTemplates[tier] || {}));
        });
    }
    
    // Test block periodization integration
    if (window.BlockPeriodization) {
        console.log('✅ Testing Block Periodization functions:');
        console.log('  - getPhaseRM(beginner, early-offseason, 1):', window.BlockPeriodization.getPhaseRM('beginner', 'early-offseason', 1));
    }
});
