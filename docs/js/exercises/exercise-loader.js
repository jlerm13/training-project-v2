// Exercise Loader Module
// Manages exercise library loading and lookup

window.exerciseLibrary = {};
window.exerciseLoadingStatus = {
    loaded: [],
    errors: []
};

/**
 * Load an exercise module into the global library
 */
function loadExerciseModule(moduleName, moduleData) {
    try {
        if (moduleData && typeof moduleData === 'object') {
            // Merge exercises into the global library
            Object.assign(window.exerciseLibrary, moduleData);
            window.exerciseLoadingStatus.loaded.push(moduleName);
            console.log(`✅ Loaded ${moduleName} exercises (${Object.keys(moduleData).length} exercises)`);
            return true;
        } else {
            throw new Error(`Invalid module data for ${moduleName}`);
        }
    } catch (error) {
        console.error(`❌ Failed to load ${moduleName} exercises:`, error);
        window.exerciseLoadingStatus.errors.push({
            module: moduleName,
            error: error.message
        });
        return false;
    }
}

/**
 * Get exercise info from library
 * Returns the full exercise object or null if not found
 */
function getExercise(exerciseKey) {
    return window.exerciseLibrary[exerciseKey] || null;
}

/**
 * Get exercise display name
 * Falls back to formatting the key if not in library
 */
function getExerciseName(exerciseKey) {
    const exercise = window.exerciseLibrary[exerciseKey];
    if (exercise && exercise.name) {
        return exercise.name;
    }
    // Fallback: convert camelCase to Title Case
    return exerciseKey
        .replace(/([A-Z])/g, ' $1')  // Add space before capitals
        .replace(/^./, str => str.toUpperCase())  // Capitalize first letter
        .replace(/Db /g, 'DB ')  // Fix common abbreviations
        .replace(/Kb /g, 'KB ')
        .replace(/Bb /g, 'BB ')
        .replace(/Oh /g, 'OH ')
        .replace(/Rdl/g, 'RDL')
        .trim();
}

/**
 * Get equipment-adapted exercise name based on user's equipment level
 */
function getEquipmentAdaptedExercise(exerciseKey, equipmentLevel) {
    const exercise = window.exerciseLibrary[exerciseKey];
    if (!exercise) {
        return { name: getExerciseName(exerciseKey), adapted: false };
    }
    
    // Check if there's an equipment map with an adaptation
    if (exercise.equipmentMap && exercise.equipmentMap[equipmentLevel]) {
        return { 
            name: exercise.equipmentMap[equipmentLevel], 
            adapted: exercise.equipmentMap[equipmentLevel] !== exercise.name,
            original: exercise.name
        };
    }
    
    return { name: exercise.name, adapted: false };
}

/**
 * Get coaching cues for an exercise
 */
function getExerciseCues(exerciseKey) {
    const exercise = window.exerciseLibrary[exerciseKey];
    if (exercise && exercise.coachingCues) {
        return exercise.coachingCues;
    }
    return [];
}

/**
 * Get tool variations for an exercise
 */
function getExerciseVariations(exerciseKey) {
    const exercise = window.exerciseLibrary[exerciseKey];
    if (exercise && exercise.toolVariations) {
        return exercise.toolVariations;
    }
    if (exercise && exercise.equipmentMap) {
        return exercise.equipmentMap;
    }
    return null;
}

/**
 * Validate that all exercises in a template exist in the library
 */
function validateTemplateExercises(templateData) {
    const missing = [];
    const found = [];
    
    function scanForExercises(obj) {
        if (Array.isArray(obj)) {
            obj.forEach(item => scanForExercises(item));
        } else if (obj && typeof obj === 'object') {
            if (obj.exercise && typeof obj.exercise === 'string') {
                if (window.exerciseLibrary[obj.exercise]) {
                    found.push(obj.exercise);
                } else {
                    missing.push(obj.exercise);
                }
            }
            Object.values(obj).forEach(val => scanForExercises(val));
        }
    }
    
    scanForExercises(templateData);
    
    return {
        found: [...new Set(found)],
        missing: [...new Set(missing)],
        coverage: found.length / (found.length + missing.length) * 100
    };
}

/**
 * Initialize the exercise system
 */
function initializeExercises() {
    const loadedCount = Object.keys(window.exerciseLibrary).length;
    
    if (loadedCount === 0) {
        console.warn('⚠️ No exercises loaded into library');
    } else {
        console.log(`✅ Exercise library initialized with ${loadedCount} exercises`);
    }
    
    if (window.exerciseLoadingStatus.errors.length > 0) {
        console.group('Exercise Loading Errors:');
        window.exerciseLoadingStatus.errors.forEach(err => {
            console.error(`${err.module}: ${err.error}`);
        });
        console.groupEnd();
    }
}

// Export functions to global scope
window.loadExerciseModule = loadExerciseModule;
window.getExercise = getExercise;
window.getExerciseName = getExerciseName;
window.getEquipmentAdaptedExercise = getEquipmentAdaptedExercise;
window.getExerciseCues = getExerciseCues;
window.getExerciseVariations = getExerciseVariations;
window.validateTemplateExercises = validateTemplateExercises;
window.initializeExercises = initializeExercises;

console.log('Exercise Loader System Ready');

