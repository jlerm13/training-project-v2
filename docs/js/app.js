// ==================== APP.JS - FLOW ORCHESTRATION ====================
// Main application flow and screen management
// v2.1.0 - Refactored for clean separation of concerns

// ==================== SCREEN FLOW MANAGEMENT ====================

function hideAllScreens() {
    const screens = ['welcomeScreen', 'experienceScreen', 'phaseScreen', 'equipmentScreen', 'confirmationScreen', 'programScreen'];
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
        case 'equipment':
            showEquipmentScreen();
            updateProgressTracker(3);
            break;
    }
}

// ==================== ONBOARDING FLOW ====================

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
            <h2>How independent are you when training alone?</h2>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">
                Your coach isn't there to adjust things on the fly. Be honest—what helps you stay on track?
                <strong>For demos: Pick "I need clear instructions" to see full programming.</strong>
            </p>
            <div class="options-grid">
                <div class="option-card" onclick="selectTier('white')">
                    <div class="option-title">I need clear instructions</div>
                    <div class="option-desc">Tell me exactly what to do, how to do it, and when to do it</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        6-10 reps per set | 30-45 min sessions
                    </div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #10b981; font-weight: 600;">
                        ✓ Templates Available
                    </div>
                </div>
                <div class="option-card" onclick="selectTier('red')" style="opacity: 0.6;">
                    <div class="option-title">I need some guidance</div>
                    <div class="option-desc">Give me structure, but I can adjust based on how I feel</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        6-10 reps per set | 40-55 min sessions
                    </div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b; font-weight: 600;">
                        ⏳ Coming Soon
                    </div>
                </div>
                <div class="option-card" onclick="selectTier('blue')" style="opacity: 0.6;">
                    <div class="option-title">I'm pretty independent</div>
                    <div class="option-desc">I know my body and can modify exercises when needed</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        4-6 reps per set | 45-70 min sessions
                    </div>
                    <div style="margin-top: 4px; font-size: 0.75rem; color: #f59e0b; font-weight: 600;">
                        ⏳ Coming Soon
                    </div>
                </div>
                <div class="option-card" onclick="selectTier('gold')" style="opacity: 0.6;">
                    <div class="option-title">I'm fully self-directed</div>
                    <div class="option-desc">I can modify programming on the fly and know when to push or back off</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-tertiary);">
                        3-6 reps per set | 50-75 min sessions
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
                <button class="btn hidden" id="equipmentContinue" onclick="showConfirmationScreen()">Continue</button>
            </div>
        </div>
    `;
    screen.classList.remove('hidden');
    updateProgressTracker(3);
}

// ==================== PROGRAM GENERATION ====================

function generateProgram() {
    hideAllScreens();
    document.getElementById('programScreen').classList.remove('hidden');
    updateProgressTracker(4);

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
        userData.currentTemplate = '2day';
    }

    generateProgramOverview();
    generateTemplateTabs();
    updateWeekDisplay();
    renderWorkouts();
}

function generateProgramOverview() {
    const overview = document.getElementById('programOverview');
    
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
    
    const equipmentNames = {
        'full': 'Full Gym',
        'commercial': 'Commercial Gym',
        'minimal': 'Minimal Equipment',
        'bodyweight': 'Bodyweight Only'
    };
    
    overview.innerHTML = `
        <h4>Your Training Plan</h4>
        
        <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                <div>
                    <h3 style="margin: 0; color: var(--primary-color);">${phase.focus}</h3>
                    <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">
                        ${phase.subtitle} • ${phase.weeks}
                    </p>
                </div>
                <div style="background: var(--bg-tertiary); color: var(--text-secondary); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; border: 1px solid var(--border-strong);">
                    ${tierInfo.name} Tier
                </div>
            </div>
            
            <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">${phase.emphasis}</p>
        </div>
        
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
        
        <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px; margin-bottom: 12px;">
            <h5 style="margin: 0 0 8px 0; font-size: 0.9rem; color: var(--text-secondary);">How to Train</h5>
            <div style="margin: 4px 0;"><strong>Effort Level:</strong> ${tierInfo.intensity}</div>
            <div style="margin: 4px 0;"><strong>Speed:</strong> ${tierInfo.tempo}</div>
            <div style="margin: 4px 0;"><strong>Reps:</strong> ${tierInfo.repRanges}</div>
        </div>
        
        <div style="background: var(--bg-tertiary); border-left: 4px solid var(--border-strong); padding: 12px; border-radius: 4px;">
            <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">
                <strong style="color: var(--text-primary);">💡 What to Expect:</strong> ${phase.whatToExpect}
            </p>
        </div>
    `;
}

function generateTemplateTabs() {
    const container = document.querySelector('.template-tabs');
    const allTemplates = getAllTemplatesForDisplay(userData.tier, userData.phase);
    
    const templatesToShow = allTemplates.filter(t => t.hasData || t.unavailable);
    
    if (templatesToShow.length === 0) {
        container.innerHTML = `
            <div style="color: #f59e0b; padding: 12px; background: rgba(245, 158, 11, 0.1); border-radius: 8px;">
                ⚠️ No templates available for this combination. Try <strong>White tier</strong> + <strong>Early Off-Season</strong>.
            </div>
        `;
        return;
    }
    
    let tabsHTML = '';
    
    templatesToShow.forEach((template) => {
        const isActive = template.key === userData.currentTemplate && userData.currentView !== 'conditioning' && userData.currentView !== 'schedule' ? 'active' : '';
        const isUnavailable = template.unavailable;
        
        if (isUnavailable) {
            tabsHTML += `<div class="template-tab disabled">${template.name} Lift</div>`;
        } else {
            tabsHTML += `<div class="template-tab ${isActive}" onclick="selectTemplate('${template.key}')">${template.name} Lift</div>`;
        }
    });
    
    const hasConditioning = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.['conditioning'];
    
    if (hasConditioning) {
        tabsHTML += `<div style="width: 1px; background: var(--border-color); margin: 0 4px;"></div>`;
        
        const conditioningActive = userData.currentView === 'conditioning' ? 'active' : '';
        tabsHTML += `<div class="template-tab ${conditioningActive}" onclick="showConditioning()">Conditioning</div>`;
        
        const scheduleActive = userData.currentView === 'schedule' ? 'active' : '';
        tabsHTML += `<div class="template-tab ${scheduleActive}" onclick="showWeeklySchedule()">Weekly Schedule</div>`;
    }
    
    container.innerHTML = tabsHTML;
}

function selectTemplate(template) {
    userData.currentTemplate = template;
    userData.currentView = 'lifting';
    generateTemplateTabs();
    updateWeekDisplay();
    renderWorkouts();
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
    if (userData.currentWeek < 4) {
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

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Athletic Development System v2.1.0 Loaded');
    console.log('Exercise Database:', typeof window.exerciseLibrary !== 'undefined' ? 'Loaded' : 'Not Found');
    console.log('Workout Templates:', typeof window.workoutTemplates !== 'undefined' ? 'Loaded' : 'Not Found');
    console.log('Block Periodization:', typeof window.BlockPeriodization !== 'undefined' ? 'Loaded' : 'Not Found');
    
    console.log('✅ Tier System Loaded:', TIER_SYSTEM);
    console.log('✅ Tier Mapping:', TIER_TO_EXPERIENCE_MAP);
    
    if (window.workoutTemplates) {
        console.log('📦 Template Structure:', Object.keys(window.workoutTemplates));
        Object.keys(window.workoutTemplates).forEach(tier => {
            console.log(`  - ${tier}:`, Object.keys(window.workoutTemplates[tier] || {}));
        });
    }
    
    if (window.BlockPeriodization) {
        console.log('✅ Testing Block Periodization functions:');
        console.log('  - getPhaseRM(beginner, early-offseason, 1):', window.BlockPeriodization.getPhaseRM('beginner', 'early-offseason', 1));
    }
});
