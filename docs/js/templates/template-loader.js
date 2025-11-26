// Template Loader Module
window.workoutTemplates = {};
window.templateLoadingStatus = {
    white: false,
    red: false,
    blue: false,
    gold: false,
    errors: []
};

function loadTemplateModule(moduleName, moduleData) {
    try {
        if (moduleData && typeof moduleData === 'object') {
            Object.assign(window.workoutTemplates, moduleData);
            window.templateLoadingStatus[moduleName] = true;
            console.log(`✅ Loaded ${moduleName} templates`);
            return true;
        } else {
            throw new Error(`Invalid module data for ${moduleName}`);
        }
    } catch (error) {
        console.error(`❌ Failed to load ${moduleName} templates:`, error);
        window.templateLoadingStatus.errors.push({
            module: moduleName,
            error: error.message
        });
        return false;
    }
}

function validateTemplateLoading() {
    const required = ['white', 'red', 'blue', 'gold'];
    const loaded = required.filter(m => window.templateLoadingStatus[m]);
    if (loaded.length === 0) {
        console.error('❌ No templates loaded successfully!');
        window.workoutTemplates = {
            white: {},
            red: {},
            blue: {},
            gold: {}
        };
    } else if (loaded.length < required.length) {
        console.warn(`⚠️ Only partially loaded: ${loaded.join(', ')}`);
        required.forEach(tier => {
            if (!window.workoutTemplates[tier]) {
                window.workoutTemplates[tier] = {};
            }
        });
    } else {
        console.log('✅ All templates loaded successfully!');
    }
    if (window.templateLoadingStatus.errors.length > 0) {
        console.group('Template Loading Errors:');
        window.templateLoadingStatus.errors.forEach(err => {
            console.error(`${err.module}: ${err.error}`);
        });
        console.groupEnd();
    }
}

window.TemplateHelpers = {
    getWorkoutTemplate: function(tier, phase, templateType, week) {
        try {
            const tierTemplates = window.workoutTemplates[tier];
            if (!tierTemplates) return null;
            
            const phaseTemplates = tierTemplates[phase];
            if (!phaseTemplates) return null;
            
            const template = phaseTemplates[templateType];
            if (!template) {
                console.warn(`No ${templateType} template for ${tier} ${phase}`);
                const fallback = phaseTemplates['2day'];
                if (fallback) {
                    console.log(`Using 2day template as fallback`);
                    const weekKey = `week${week}`;
                    return fallback[weekKey] || fallback['week1'];
                }
                return null;
            }
            
            const weekKey = `week${week}`;
            return template[weekKey] || template['week1'];
        } catch (error) {
            console.error('Error getting workout template:', error);
            return null;
        }
    },
    getAvailableTemplates: function(phase) {
        const templateAvailability = {
            'early-offseason': ['2day', '3day', '4day'],
            'mid-offseason': ['2day', '3day', '4day'],
            'preseason': ['2day', '3day', '4day'],
            'inseason': ['2day']
        };
        return templateAvailability[phase] || ['2day', '3day', '4day'];
    }
};

window.initializeTemplates = function() {
    validateTemplateLoading();
    console.log('Template system initialized');
    console.log('Available templates:', Object.keys(window.workoutTemplates));
};

window.loadTemplateModule = loadTemplateModule;
console.log('Template Loader System Ready');
