(function() {
    const beginnerTemplates = {
        beginner: {
            'early-offseason': {
                '4day': {
                    week1: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "dbBenchPress", sets: "2 x 15-20", note: "Same weight both sets" },
                                { type: "supplemental", exercise: "barbellRows", sets: "3 x 8-12", note: "Focus on form" },
                                { type: "assistance", exercise: "rearDeltFlyes", sets: "3 x 12-15" },
                                { type: "assistance", exercise: "shrugs", sets: "3 x 8-15" },
                                { type: "assistance", exercise: "barbellCurls", sets: "3 x 8-12" }
                            ]
                        },
                        tuesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "5 × 3", note: "20-24 inch box, focus on landing" },
                                { type: "supplemental", exercise: "bulgarianSplitSquat", sets: "2 × 8 each", note: "Bodyweight only" },
                                { type: "supplemental", exercise: "romanianDeadlift", sets: "3 × 10-12", note: "Light weight, feel stretch" },
                                { type: "assistance", exercise: "weightedAbs", sets: "3 × 15-20" }
                            ]
                        },
                        thursday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbInclinePress", sets: "3 × max reps", intensity: "65% effort", note: "90 sec rest" },
                                { type: "supplemental", exercise: "pullups", sets: "3 × 5-8", note: "Use band if needed" },
                                { type: "assistance", exercise: "facePulls", sets: "3 × 15-20" },
                                { type: "assistance", exercise: "lateralRaises", sets: "3 × 12-15" },
                                { type: "assistance", exercise: "dbCurls", sets: "3 × 10-12" }
                            ]
                        },
                        friday: {
                            title: "Max-Effort Lower Body",
                            exercises: [
                                { type: "max-effort", exercise: "boxSquat", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "walkingLunges", sets: "3 × 10 each", note: "Bodyweight" },
                                { type: "assistance", exercise: "hyperextensions", sets: "3 × 10-15" },
                                { type: "core", exercise: "plank", sets: "3 × 30-45 seconds" }
                            ]
                        }
                    },
                    week2: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "dbBenchPress", sets: "2 × max reps", note: "Aim for 18-25 total reps" },
                                { type: "supplemental", exercise: "dbRows", sets: "3 × 10-12 each" },
                                { type: "assistance", exercise: "bandPullAparts", sets: "3 × 20-30" },
                                { type: "assistance", exercise: "shrugs", sets: "3 × 10-12" },
                                { type: "assistance", exercise: "barbellCurls", sets: "3 × 10-12" }
                            ]
                        },
                        tuesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "6 × 3", note: "Same height, better technique" },
                                { type: "supplemental", exercise: "bulgarianSplitSquat", sets: "3 × 8 each", note: "Hold light DBs if able" },
                                { type: "supplemental", exercise: "romanianDeadlift", sets: "3 × 10-12", note: "Increase weight slightly" },
                                { type: "assistance", exercise: "hangingLegRaises", sets: "3 × 8-12" }
                            ]
                        },
                        thursday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbBenchPress", sets: "4 × 12-15", note: "Traditional sets, not max reps" },
                                { type: "supplemental", exercise: "latPulldowns", sets: "3 × 10-12" },
                                { type: "assistance", exercise: "rearDeltFlyes", sets: "3 × 15-20" },
                                { type: "assistance", exercise: "lateralRaises", sets: "3 × 12-15" },
                                { type: "assistance", exercise: "dbCurls", sets: "3 × 10-15" }
                            ]
                        },
                        friday: {
                            title: "Max-Effort Lower Body",
                            exercises: [
                                { type: "max-effort", exercise: "boxSquat", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "stepUps", sets: "3 × 8 each", note: "Knee height box" },
                                { type: "assistance", exercise: "hyperextensions", sets: "3 × 12-15" },
                                { type: "core", exercise: "weightedAbs", sets: "3 × 15-20" }
                            ]
                        }
                    },
                    week3: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "inclineBench", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "dbInclinePress", sets: "2 × 15-20" },
                                { type: "supplemental", exercise: "cableRows", sets: "3 × 10-12" },
                                { type: "assistance", exercise: "facePulls", sets: "3 × 15-20" },
                                { type: "assistance", exercise: "shrugs", sets: "3 × 12-15" },
                                { type: "assistance", exercise: "barbellCurls", sets: "3 × 10-12" }
                            ]
                        },
                        tuesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "verticalJump", sets: "5 × 3", note: "Max effort jumps" },
                                { type: "dynamic", exercise: "broadJump", sets: "3 × 2", note: "Focus on landing" },
                                { type: "supplemental", exercise: "bulgarianSplitSquat", sets: "3 × 10 each" },
                                { type: "supplemental", exercise: "romanianDeadlift", sets: "3 × 8-10", note: "Heavier weight" },
                                { type: "assistance", exercise: "weightedAbs", sets: "4 × 12-15" }
                            ]
                        },
                        thursday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbInclinePress", sets: "3 × max reps", note: "Try to beat week 1" },
                                { type: "assistance", exercise: "pullups", sets: "3 × 6-10" },
                                { type: "assistance", exercise: "bandPullAparts", sets: "4 × 25-30" },
                                { type: "assistance", exercise: "lateralRaises", sets: "4 × 10-12" },
                                { type: "assistance", exercise: "dbCurls", sets: "3 × 12-15" }
                            ]
                        },
                        friday: {
                            title: "Max-Effort Lower Body",
                            exercises: [
                                { type: "max-effort", exercise: "deadlift", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "walkingLunges", sets: "3 × 12 each" },
                                { type: "assistance", exercise: "gluteHamRaise", sets: "3 × 6-10", note: "Or leg curls" },
                                { type: "core", exercise: "plank", sets: "3 × 45-60 seconds" }
                            ]
                        }
                    },
                    week4: {
                        title: "Deload Week",
                        notes: "Reduce volume by 40%, maintain intensity at 70-80% of week 3",
                        monday: {
                            title: "Upper Body - Light",
                            exercises: [
                                { type: "main", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "dbBenchPress", sets: "2 × 10" },
                                { type: "assistance", exercise: "rows", sets: "3 × 10" },
                                { type: "assistance", exercise: "facePulls", sets: "2 × 15" }
                            ]
                        },
                        wednesday: {
                            title: "Lower Body - Light",
                            exercises: [
                                { type: "main", exercise: "boxSquat", sets: "3 × 3 @ 70%", note: "Focus on explosion" },
                                { type: "dynamic", exercise: "boxJump", sets: "3 × 3" },
                                { type: "supplemental", exercise: "lunges", sets: "2 × 8 each" },
                                { type: "core", exercise: "abs", sets: "2 × 15" }
                            ]
                        },
                        friday: {
                            title: "Upper Body - Recovery",
                            exercises: [
                                { type: "repetition", exercise: "dbPress", sets: "3 × 10" },
                                { type: "supplemental", exercise: "pullups", sets: "3 × 5" },
                                { type: "assistance", exercise: "arms", sets: "2 × 12" }
                            ]
                        }
                    }
                },
                '3day': {
                    week1: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "dbBenchPress", sets: "3 × 12-15" },
                                { type: "supplemental", exercise: "barbellRows", sets: "4 × 10-12" },
                                { type: "assistance", exercise: "facePulls", sets: "3 × 15-20" },
                                { type: "assistance", exercise: "barbellCurls", sets: "3 × 10-12" }
                            ]
                        },
                        wednesday: {
                            title: "Max-Effort Lower Body",
                            exercises: [
                                { type: "max-effort", exercise: "boxSquat", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "walkingLunges", sets: "3 × 10 each" },
                                { type: "supplemental", exercise: "romanianDeadlift", sets: "3 × 10-12" },
                                { type: "core", exercise: "weightedAbs", sets: "3 × 15-20" }
                            ]
                        },
                        friday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbInclinePress", sets: "3 × max reps", note: "Leave 1-2 in tank" },
                                { type: "supplemental", exercise: "pullups", sets: "3 × 5-10" },
                                { type: "assistance", exercise: "rearDeltFlyes", sets: "3 × 15" },
                                { type: "assistance", exercise: "shrugs", sets: "3 × 10-12" }
                            ]
                        }
                    }
                }
            },
            
                        }
                    },
                    autoRegulationNotes: [
                        "Miss training if sore or tired from games",
                        "Reduce weights by 10-15% after tough games",
                        "Focus on perfect form over heavy weight",
                        "Get 8+ hours of sleep during the competitive season"
                    ]
                }
            }
        }
    };

    // Properly call the loading function
    if (typeof loadTemplateModule === 'function') {
        loadTemplateModule('beginner', beginnerTemplates);
    } else {
        console.error('loadTemplateModule function not available');
    }
})();
