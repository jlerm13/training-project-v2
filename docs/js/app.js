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
    context: null,
    equipment: null,
    currentWeek: 1,
    currentTemplate: '3day',
    daysPerWeek: 4,  // NEW: 3, 4, or 5 based on tier
    exerciseVariations: {},
    maxWeeks: 4,  // 4-week blocks for early off-season
    sessionDuration: 45  // NEW: varies by tier
};

// ==================== TIER DEFINITIONS ====================
const TIER_SYSTEM = {
    white: {
        name: 'White',
        stage: 'Stage 1 - Unconscious Incompetence',
        focus: 'Learn the Shapes',
        intensity: '<60% effort',
        density: 'Low-moderate',
        tempo: '2-1-2 or 3-0-3',
        frequency: '3-4 days/week',
        sessionLength: '30-45 min',
        repRanges: '6-10 reps + isometric holds',
        color: '#10b981'
    },
    red: {
        name: 'Red',
        stage: 'Stage 2 - Conscious Incompetence',
        focus: 'Stabilize the Shapes',
        intensity: '55-70% effort',
        density: 'Moderate',
        tempo: '2-0-2 with pauses',
        frequency: '3-4 days/week',
        sessionLength: '40-55 min',
        repRanges: '6-10 reps',
        color: '#ef4444'
    },
    blue: {
        name: 'Blue',
        stage: 'Stage 3 - Conscious Competence',
        focus: 'Regulate the Shapes',
        intensity: '65-80%',
        density: 'Moderate-High (AREG)',
        tempo: 'Self-selected',
        frequency: '4 days/week',
        sessionLength: '45-70 min',
        repRanges: '4-6 reps @ RPE 7-8',
        color: '#3b82f6'
    },
    gold: {
        name: 'Gold',
        stage: 'Stage 4 - Unconscious Competence',
        focus: 'Own the Shapes',
        intensity: '70-85%',
        density: 'High, self-managed',
        tempo: 'Autoregulated',
        frequency: '4-5 days/week',
        sessionLength: '50-75 min',
        repRanges: '3-6 reps @ RPE 8',
        color: '#f59e0b'
    }
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

    // Default context values
    const evalContext = {
        experience: userData.experience || 'beginner',
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

// ==================== UI FLOW ====================
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
            <h2>What's your training experience?</h2>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">
                This determines rep ranges, intensity, and exercise complexity. 
                <strong>For demos: Pick "Intermediate" to see typical programming.</strong>
            </p>
            <div class="options-grid">
                <div class="option-card" onclick="selectExperience('beginner')">
                    <div class="option-title">Beginner</div>
                    <div class="option-desc">0-6 months to 1 year of structured training</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        Focus: Learning Technique, higher reps (8-12RM)
                    </div>
                </div>
                <div class="option-card" onclick="selectExperience('intermediate')">
                    <div class="option-title">Intermediate</div>
                    <div class="option-desc">1-3 years of consistent training</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        Focus: Solid Technique, Strength building (3-8RM)
                    </div>
                </div>
                <div class="option-card" onclick="selectExperience('advanced')">
                    <div class="option-title">Advanced</div>
                    <div class="option-desc">3+ years consistent training </div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        Focus: Highly Refined Technique, Max strength (1-5RM)
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
            <div class="options-grid">
                <div class="option-card" onclick="selectPhase('early-offseason')">
                    <div class="option-title">Early Off-Season</div>
                    <div class="option-desc">Recovery & base building</div>
                </div>
                <div class="option-card" onclick="selectPhase('mid-offseason')">
                    <div class="option-title">Mid Off-Season</div>
                    <div class="option-desc">Maximum strength & muscle building</div>
                </div>
                <div class="option-card" onclick="selectPhase('preseason')">
                    <div class="option-title">Pre-Season</div>
                    <div class="option-desc">Convert strength to power</div>
                </div>
                <div class="option-card" onclick="selectPhase('inseason')">
                    <div class="option-title">In-Season</div>
                    <div class="option-desc">Maintain & perform</div>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="goBack('experience')">Back</button>
                <button class="btn hidden" id="phaseContinue" onclick="showContextScreen()">Continue</button>
            </div>
        </div>
    `;
    screen.classList.remove('hidden');
    updateProgressTracker(2);
}

function showContextScreen() {
    hideAllScreens();
    const screen = document.getElementById('contextScreen');
    screen.innerHTML = `
        <div class="card">
            <h2>What's your training context?</h2>
            <div class="options-grid">
                <div class="option-card" onclick="selectContext('franchise')">
                    <div class="option-title">Franchise Gym</div>
                    <div class="option-desc">Commercial gym with group training</div>
                </div>
                <div class="option-card" onclick="selectContext('remote')">
                    <div class="option-title">Remote/Traveling</div>
                    <div class="option-desc">Variable equipment access</div>
                </div>
                <div class="option-card" onclick="selectContext('team')">
                    <div class="option-title">Team Setting</div>
                    <div class="option-desc">Coaching athletes with mixed abilities</div>
                </div>
                <div class="option-card" onclick="selectContext('retired veteran')">
                    <div class="option-title">Retired Veteran</div>
                    <div class="option-desc"> Strength-focused former athlete with health consideration</div>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="goBack('phase')">Back</button>
                <button class="btn hidden" id="contextContinue" onclick="showEquipmentScreen()">Continue</button>
            </div>
        </div>
    `;
    screen.classList.remove('hidden');
    updateProgressTracker(3);
}

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
                <button class="btn btn-secondary" onclick="goBack('context')">Back</button>
                <button class="btn hidden" id="equipmentContinue" onclick="generateProgram()">Generate Program</button>
            </div>
        </div>
    `;
    screen.classList.remove('hidden');
    updateProgressTracker(4);
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
    const screens = ['welcomeScreen', 'experienceScreen', 'phaseScreen', 'contextScreen', 'equipmentScreen', 'programScreen'];
    screens.forEach(screenId => {
        document.getElementById(screenId).classList.add('hidden');
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
        case 'context':
            showContextScreen();
            updateProgressTracker(3);
            break;
    }
}

// ==================== SELECTORS ====================
function selectExperience(level) {
    userData.experience = level;
    selectCard('#experienceScreen', 'experienceContinue');
}

function selectPhase(phase) {
    userData.phase = phase;
    selectCard('#phaseScreen', 'phaseContinue');
}

function selectContext(context) {
    userData.context = context;
    selectCard('#contextScreen', 'contextContinue');
}

function selectEquipment(equipment) {
    userData.equipment = equipment;
    selectCard('#equipmentScreen', 'equipmentContinue');
}

function selectCard(screenSelector, continueBtnId) {
    document.querySelectorAll(`${screenSelector} .option-card`).forEach(opt => opt.classList.remove('selected'));
    event.target.closest('.option-card').classList.add('selected');
    document.getElementById(continueBtnId).classList.remove('hidden');
}

// ==================== PROGRAM GENERATION ====================
function generateProgram() {
    hideAllScreens();
    document.getElementById('programScreen').classList.remove('hidden');
    updateProgressTracker(5);

    const phaseNames = {
        'early-offseason': 'Early Off-Season',
        'mid-offseason': 'Mid Off-Season',
        'preseason': 'Pre-Season',
        'inseason': 'In-Season'
    };
    const experienceNames = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced'
    };

    document.getElementById('programTitle').textContent =
        `${experienceNames[userData.experience] || 'Unknown'} - ${phaseNames[userData.phase] || 'Phase'} Program`;

    generateProgramOverview();

    // Set default template based on phase and context
    if (userData.phase === 'inseason') {
        userData.currentTemplate = '2day';
    } else if (userData.context === 'retired veteran') {
        userData.currentTemplate = '3day';
    } else {
        userData.currentTemplate = '4day';
    }

    // Generate appropriate template tabs
    generateTemplateTabs();
    
    // Update week display with block periodization info
    updateWeekDisplay();
    
    renderWorkouts();
}

function generateTemplateTabs() {
    const container = document.querySelector('.template-tabs');
    const availableTemplates = getAvailableTemplatesForPhase(userData.phase);
    
    let tabsHTML = '';
    availableTemplates.forEach((template, index) => {
        const isActive = template.key === userData.currentTemplate ? 'active' : '';
        tabsHTML += `<div class="template-tab ${isActive}" onclick="selectTemplate('${template.key}')">${template.name}</div>`;
    });
    
    container.innerHTML = tabsHTML;
}

function getAvailableTemplatesForPhase(phase) {
    // Special case for retired veteran
    if (userData.context === 'retired veteran') {
        return [{ key: '3day', name: 'Retired Veteran 3-Day' }];
    }
    
    const templateOptions = {
        'early-offseason': [
            { key: '4day', name: '4-Day' },
            { key: '3day', name: '3-Day' }
        ],
        'mid-offseason': [
            { key: '4day', name: '4-Day' },
            { key: '3day', name: '3-Day' },
            { key: 'speed', name: 'With Speed' }
        ],
        'preseason': [
            { key: '4day', name: '4-Day' },
            { key: '3day', name: '3-Day' },
            { key: 'speed', name: 'With Speed' }
        ],
        'inseason': [
            { key: '2day', name: 'In-Season (2-Day)' }
        ]
    };
    
    return templateOptions[phase] || templateOptions['early-offseason'];
}

function generateProgramOverview() {
    const overview = document.getElementById('programOverview');
    const phaseGuidelines = {
        'early-offseason': {
            focus: 'Recovery & Base Building',
            goals: ['Build work capacity', 'Movement quality', 'Aerobic base'],
            emphasis: 'Volume accumulation with moderate intensity (75-85%)',
            weeks: '4-6 week block'
        },
        'mid-offseason': {
            focus: 'Maximum Strength Development',
            goals: ['Peak strength gains', 'Muscle mass', 'Neural efficiency'],
            emphasis: 'Intensity progression (85-95%), reduced volume',
            weeks: '4-6 week block'
        },
        'preseason': {
            focus: 'Power & Sport-Specific Preparation',
            goals: ['Convert strength to power', 'Speed development', 'Competition readiness'],
            emphasis: 'Lower volume, max velocity work, plyometrics',
            weeks: '3-4 week block'
        },
        'inseason': {
            focus: 'Maintenance & Performance',
            goals: ['Maintain strength', 'Manage fatigue', 'Stay game-ready'],
            emphasis: 'Minimal effective dose, 2 days/week',
            weeks: 'Duration of season'
        }      
    };
    const contextNotes = {
        'franchise': 'Adapted for group training with mixed abilities',
        'remote': 'Flexible for variable equipment access during travel',
        'team': 'Designed for team settings with shared facilities',
        'retired veteran': 'Strength-focused with joint health considerations'
    };

    const phase = phaseGuidelines[userData.phase];
    
    overview.innerHTML = `
        <h4>Your Training Plan</h4>
        <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                <div>
                    <h3 style="margin: 0; color: var(--primary-color);">${phase.focus}</h3>
                    <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">
                        ${userData.experience.charAt(0).toUpperCase() + userData.experience.slice(1)} Level | ${phase.weeks}
                    </p>
                </div>
                <div style="background: var(--primary-color); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                    ${userData.currentTemplate.toUpperCase()}
                </div>
            </div>
            
            <p style="margin: 0; font-weight: 500;">${phase.emphasis}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px;">
                <h5 style="margin: 0 0 8px 0; font-size: 0.9rem; color: var(--text-secondary);">Primary Goals</h5>
                ${phase.goals.map(goal => `<div style="margin: 4px 0;">• ${goal}</div>`).join('')}
            </div>
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px;">
                <h5 style="margin: 0 0 8px 0; font-size: 0.9rem; color: var(--text-secondary);">Your Context</h5>
                <div style="margin: 4px 0;"><strong>Setup:</strong> ${contextNotes[userData.context]}</div>
                <div style="margin: 4px 0;"><strong>Equipment:</strong> ${userData.equipment}</div>
            </div>
        </div>
        
        <div style="background: rgba(37, 99, 235, 0.1); border-left: 4px solid var(--primary-color); padding: 12px; border-radius: 4px;">
            <p style="margin: 0; font-size: 0.9rem;">
                <strong>🎯 Demo Note:</strong> This shows how the periodization engine adapts to your profile. 
                Navigate through weeks to see progression. Click "Variations" on exercises to see equipment adaptations.
            </p>
        </div>
    `;
}

function selectTemplate(template) {
    userData.currentTemplate = template;
    generateTemplateTabs(); // Regenerate tabs to update active state
    updateWeekDisplay(); // Update week display
    renderWorkouts();
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
    let templates;

    if (userData.context === 'retired veteran') {
        templates = window.workoutTemplates?.['Retired Veteran']?.['3day'];
    } else {
        templates = window.workoutTemplates?.[userData.experience]?.[userData.phase]?.[userData.currentTemplate];
    }

    if (!templates) {
        showError(`No templates found for ${userData.experience} ${userData.phase} ${userData.currentTemplate}`);
        container.innerHTML = `<div class="workout-day"><p>No templates found. Please try a different combination.</p></div>`;
        return;
    }

    const currentWeek = templates?.[weekKey];
    if (!currentWeek) {
        showError(`No workouts found for ${weekKey} in ${userData.currentTemplate} template.`);
        container.innerHTML = `<div class="workout-day"><p>No workouts found for ${weekKey}. Try Week 1 or a different template.</p></div>`;
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
            return; // Exit early for conditioning guidelines
        }
        
        // Regular workout day rendering continues here...
        html += `
            <div class="workout-day">
                <div class="workout-header">
                    <div class="workout-title">${dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}: ${workoutDay.title || ''}</div>
                    <div class="workout-badge">${dayKey}</div>
                </div>
        `;
        
        if (workoutDay.exercises) {
            workoutDay.exercises.forEach((exercise, index) => {
                const exerciseData = exerciseDatabase?.[exercise.exercise];
                let exerciseName = exercise.exercise;
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
                    } else if (exerciseData) {
                        exerciseName = exerciseData.name;
                    }
                }

                if (!exerciseData) {
                    showError(`Missing exercise data: ${exercise.exercise}`);
                    exerciseName = exercise.exercise;
                }

                const exerciseId = `${exercise.exercise}-${dayKey}-${index}`;

                // **KEY ENHANCEMENT: Dynamic evaluation of template strings**
                const evaluatedSets = evaluateTemplateString(exercise.sets);
                const evaluatedIntensity = evaluateTemplateString(exercise.intensity);
                const evaluatedNote = evaluateTemplateString(exercise.note);

                html += `
                    <div class="exercise-block">
                        <div class="exercise-header">
                            <span class="exercise-category category-${exercise.type}">${exercise.type.toUpperCase()}</span>
                            ${exerciseData?.variations ? `<button class="variation-btn" onclick="showVariations('${exerciseId}', this)">Variations</button>` : ''}
                        </div>
                        <div class="exercise-name" id="exercise-${exerciseId}-name">${exerciseName}</div>
                        <div class="exercise-details">Sets/Reps: ${evaluatedSets}</div>
                        ${evaluatedIntensity ? `<div class="exercise-details">Intensity: ${evaluatedIntensity}</div>` : ''}
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
        renderWorkouts();
    }
}

function nextWeek() {
    if (userData.currentWeek < 6) {
        userData.currentWeek++;
        updateWeekDisplay();
        renderWorkouts();
    }
}

// ==================== RESET ====================
function resetApp() {
    if (!confirm('Start over with a new program setup?')) return;
    userData = { 
        experience: null, 
        phase: null, 
        context: null, 
        equipment: null, 
        currentWeek: 1, 
        currentTemplate: '4day',
        exerciseVariations: {}
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
    console.log('Athletic Development System Loaded');
    console.log('Exercise Database:', typeof exerciseDatabase !== 'undefined' ? 'Loaded' : 'Not Found');
    console.log('Workout Templates:', typeof window.workoutTemplates !== 'undefined' ? 'Loaded' : 'Not Found');
    console.log('Block Periodization:', typeof window.BlockPeriodization !== 'undefined' ? 'Loaded' : 'Not Found');
    
    // Test block periodization integration
    if (window.BlockPeriodization) {
        console.log('✅ Testing Block Periodization functions:');
        console.log('  - getPhaseRM(beginner, early-offseason, 1):', window.BlockPeriodization.getPhaseRM('beginner', 'early-offseason', 1));
        console.log('  - getPhaseIntensity(intermediate, mid-offseason, 2):', window.BlockPeriodization.getPhaseIntensity('intermediate', 'mid-offseason', 2));
        console.log('  - getWeeklyFocus(preseason, 3):', window.BlockPeriodization.getWeeklyFocus('preseason', 3));
    }
});
