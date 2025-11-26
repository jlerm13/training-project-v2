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
    const required = ['beginner', 'intermediate', 'advanced'];
    const loaded = required.filter(m => window.templateLoadingStatus[m]);
    if (loaded.length === 0) {
        console.error('❌ No templates loaded successfully!');
        window.workoutTemplates = {
            beginner: {},
            intermediate: {},
            advanced: {}
        };
    } else if (loaded.length < required.length) {
        console.warn(`⚠️ Only partially loaded: ${loaded.join(', ')}`);
        required.forEach(level => {
            if (!window.workoutTemplates[level]) {
                window.workoutTemplates[level] = {};
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
            const weekKey = `week${week}`;
            if (experience === 'washed-up-meathead') {
                return window.workoutTemplates['washed-up-meathead']?.['3day']?.[weekKey];
            }
            const experienceTemplates = window.workoutTemplates[experience];
            if (!experienceTemplates) {
                console.warn(`No templates for experience level: ${experience}`);
                return null;
            }
            const phaseTemplates = experienceTemplates[phase];
            if (!phaseTemplates) {
                console.warn(`No templates for phase: ${phase} at ${experience} level`);
                return null;
            }
            const template = phaseTemplates[templateType];
            if (!template) {
                console.warn(`No ${templateType} template for ${experience} ${phase}`);
                const fallback = phaseTemplates['4day'];
                if (fallback) {
                    console.log(`Using 4day template as fallback`);
                    return fallback[weekKey] || fallback['week1'];
                }
                return null;
            }
            return template[weekKey] || template['week1'];
        } catch (error) {
            console.error('Error getting workout template:', error);
            return null;
        }
    },
    getAvailableTemplates: function(phase) {
        const templateAvailability = {
            'early-offseason': ['4day', '3day'],
            'mid-offseason': ['4day', '3day'],
            'preseason': ['4day', '3day', 'speed'],
            'inseason': ['2day']
        };
        return templateAvailability[phase] || ['4day', '3day'];
    }
};

window.initializeTemplates = function() {
    validateTemplateLoading();
    console.log('Template system initialized');
    console.log('Available templates:', Object.keys(window.workoutTemplates));
};
