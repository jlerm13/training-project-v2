// ==================== STATE MANAGER (FIXED: With Persistence) ====================
// Central source of truth for app state
// All state mutations happen through functions in this file

const STATE_KEY = 'ignition_apg_data_v1';

// ==================== PERSISTENCE FUNCTIONS ====================

function saveProgress() {
    // Saves the current userData object to the user's browser storage
    localStorage.setItem(STATE_KEY, JSON.stringify(userData));
    console.log('💾 Progress Saved');
}

function loadProgress() {
    // Loads the saved userData object from the user's browser storage
    const saved = localStorage.getItem(STATE_KEY);
    return saved ? JSON.parse(saved) : null;
}

function highlightCard(screenId, value) {
    const screen = document.getElementById(screenId);
    if (!screen) return;
    
    // Remove 'selected' border from all cards
    const cards = screen.querySelectorAll('.option-card');
    cards.forEach(card => {
        card.style.border = '1px solid var(--border-color)';
        card.style.background = 'var(--bg-secondary)';
    });
    
    // Find the one clicked and give it the 'selected' style
    cards.forEach(card => {
        if (card.outerHTML.includes(`'${value}'`)) {
            card.style.border = '2px solid var(--primary-color)';
            card.style.background = 'var(--bg-tertiary)';
        }
    });
}

// ==================== INITIALIZATION ====================

// 1. Initialize State: Try to load from memory, otherwise start fresh
let userData = loadProgress() || {
    tier: null,  // 'white', 'red', 'blue', 'gold'
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

// ==================== TIER SYSTEM DEFINITIONS (Remains Unchanged) ====================
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

const TIER_TO_EXPERIENCE_MAP = {
    white: 'beginner',
    red: 'intermediate',
    blue: 'advanced',
    gold: 'advanced'
};


// ==================== STATE MUTATION FUNCTIONS (Updated with Save) ====================

function selectTier(tier) {
    userData.tier = tier;
    saveProgress(); // <-- CRITICAL FIX
    highlightCard('experienceScreen', tier);
    document.getElementById('experienceContinue').classList.remove('hidden');
}

function selectPhase(phase) {
    userData.phase = phase;
    saveProgress(); // <-- CRITICAL FIX
    highlightCard('phaseScreen', phase);
    document.getElementById('phaseContinue').classList.remove('hidden');
}

function selectEquipment(equipment) {
    userData.equipment = equipment;
    saveProgress();
    
    // Update the current session with equipment data
    if (typeof getCurrentSession === 'function') {
        const session = getCurrentSession();
        session.tier = userData.tier;
        session.equipment = userData.equipment;
        session.phase = userData.phase;
        localStorage.setItem('ignition_current_session', JSON.stringify(session));
    }
    
    highlightCard('equipmentScreen', equipment);
    document.getElementById('equipmentContinue').classList.remove('hidden');
}

function resetApp() {
    if (!confirm('Are you sure you want to start over? This will clear all your saved settings and you will restart from the Welcome screen.')) return;
    
    // 1. Clear Local Storage
    localStorage.removeItem(STATE_KEY); 
    
    // 2. Reset the current session data
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
    
    // 3. Reload the page to trigger a clean start
    location.reload(); 
}

// ==================== AUTO-STARTUP LOGIC ====================
// Check if the user has completed onboarding and skip straight to the program
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the app.js functions (like generateProgram) to load
    setTimeout(() => {
        // Check for required settings
        if (userData.tier && userData.phase && userData.equipment) {
            console.log("⚡ Resuming user session...");
            
            // Check if functions from app.js are available globally
            if(typeof hideAllScreens === 'function' && typeof generateProgram === 'function') {
                hideAllScreens();
                document.getElementById('progressTracker').classList.remove('hidden');
                generateProgram();
            } else {
                 console.error("Initialization error: 'hideAllScreens' or 'generateProgram' not found.");
            }
        }
    }, 100);
});


// ==================== EXPORTS ====================
// Make state and functions available globally
window.userData = userData;
window.TIER_SYSTEM = TIER_SYSTEM;
window.TIER_TO_EXPERIENCE_MAP = TIER_TO_EXPERIENCE_MAP;
window.selectTier = selectTier;
window.selectPhase = selectPhase;
window.selectEquipment = selectEquipment;
window.resetApp = resetApp; // New reset function handles localStorage clear

console.log('✅ State Manager loaded with Persistence');
