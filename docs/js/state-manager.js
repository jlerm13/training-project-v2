// ==================== STATE MANAGEMENT ====================
// Central source of truth for app state
// All state mutations happen through functions in this file

let userData = {
    tier: null,  // 'white', 'red', 'blue', 'gold' - COACH ASSIGNED
    phase: 'early-offseason',  // Start here, expand later
    equipment: null,
    currentWeek: 1,
    currentTemplate: '2day',
    currentView: 'lifting',  // 'lifting', 'conditioning', 'schedule'
    daysPerWeek: 2,
    exerciseVariations: {},
    maxWeeks: 4,
    sessionDuration: 45
};

// ==================== TIER SYSTEM DEFINITIONS ====================
const TIER_SYSTEM = {
    white: {
        name: 'White',
        stage: 'Learning Phase',
        focus: 'Learn the Movements',
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

// Maps tier system to existing template structure for backwards compatibility
const TIER_TO_EXPERIENCE_MAP = {
    white: 'beginner',
    red: 'intermediate',
    blue: 'advanced',
    gold: 'advanced'
};

// ==================== STATE MUTATION FUNCTIONS ====================

function selectTier(tier) {
    userData.tier = tier;
    selectCard('#experienceScreen', 'experienceContinue');
}

function selectPhase(phase) {
    userData.phase = phase;
    selectCard('#phaseScreen', 'phaseContinue');
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

// ==================== EXPORTS ====================
// Make state and functions available globally
window.userData = userData;
window.TIER_SYSTEM = TIER_SYSTEM;
window.TIER_TO_EXPERIENCE_MAP = TIER_TO_EXPERIENCE_MAP;
window.selectTier = selectTier;
window.selectPhase = selectPhase;
window.selectEquipment = selectEquipment;
window.resetApp = resetApp;

console.log('✅ State Manager loaded');
