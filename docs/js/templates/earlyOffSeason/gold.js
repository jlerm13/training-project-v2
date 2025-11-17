(function() {
    const advancedTemplates = {
        advanced: {
            'early-offseason': {
                '4day': {
                    week1: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", features: ["bands", "chains"], note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "dbBenchPress", sets: "2 × max reps", note: "50+ reps total" },
                                { type: "assistance", exercise: "barbellRows", sets: "5 × 5" },
                                { type: "assistance", exercise: "rearDeltFlyes", sets: "4 × 15" },
                                { type: "assistance", exercise: "shrugs", sets: "4 × 8" },
                                { type: "assistance", exercise: "barbellCurls", sets: "4 × 8" }
                            ]
                        },
                        tuesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "8 × 2", note: "Focus on quality" },
                                { type: "dynamic", exercise: "verticalJump", sets: "5 × 3" },
                                { type: "assistance", exercise: "bulgarianSplitSquat", sets: "3 × 6 each" },
                                { type: "assistance", exercise: "romanianDeadlift", sets: "3 × 8" },
                                { type: "assistance", exercise: "sledDrags", sets: "3 × 40 yards" },
                                { type: "assistance", exercise: "weightedAbs", sets: "4 × 10" }
                            ]
                        },
                        thursday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbInclinePress", sets: "3 × max reps", note: "3 min rest" },
                                { type: "assistance", exercise: "weightedChins", sets: "4 × 5" },
                                { type: "assistance", exercise: "facePulls", sets: "4 × 20" },
                                { type: "assistance", exercise: "lateralRaises", sets: "4 × 12" },
                                { type: "assistance", exercise: "dbCurls", sets: "4 × 10" }
                            ]
                        },
                        friday: {
                            title: "Max-Effort Lower Body",
                            exercises: [
                                { type: "max-effort", exercise: "boxSquat", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", features: ["bands", "chains"], note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "walkingLunges", sets: "3 × 8 each" },
                                { type: "assistance", exercise: "gluteHamRaise", sets: "3 × 8" },
                                { type: "core", exercise: "hangingLegRaises", sets: "4 × 10" }
                            ]
                        }
                    },
                    week2: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "floorPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", features: ["bands", "chains"], note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "closeGripBench", sets: "3 × 8-10" },
                                { type: "assistance", exercise: "dbRows", sets: "5 × 6" },
                                { type: "assistance", exercise: "bandPullAparts", sets: "100 reps" },
                                { type: "assistance", exercise: "shrugs", sets: "4 × 10" },
                                { type: "assistance", exercise: "barbellCurls", sets: "4 × 10" }
                            ]
                        },
                        tuesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "10 × 2", note: "Increase height" },
                                { type: "dynamic", exercise: "broadJump", sets: "5 × 2" },
                                { type: "assistance", exercise: "bulgarianSplitSquat", sets: "3 × 8 each" },
                                { type: "assistance", exercise: "gluteHamRaise", sets: "3 × 10" },
                                { type: "assistance", exercise: "prowlerPush", sets: "4 × 30 yards" },
                                { type: "assistance", exercise: "weightedAbs", sets: "4 × 12" }
                            ]
                        },
                        thursday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbBenchPress", sets: "4 × 10-12" },
                                { type: "assistance", exercise: "pullups", sets: "5 × 8" },
                                { type: "assistance", exercise: "cableRows", sets: "4 × 12" },
                                { type: "assistance", exercise: "lateralRaises", sets: "5 × 10" },
                                { type: "assistance", exercise: "dbCurls", sets: "4 × 12" }
                            ]
                        },
                        friday: {
                            title: "Max-Effort Lower Body",
                            exercises: [
                                { type: "max-effort", exercise: "deadlift", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", features: ["bands", "chains"], note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "stepUps", sets: "3 × 6 each" },
                                { type: "assistance", exercise: "hyperextensions", sets: "3 × 12" },
                                { type: "core", exercise: "weightedAbs", sets: "4 × 15" }
                            ]
                        }
                    }
                }
            },
