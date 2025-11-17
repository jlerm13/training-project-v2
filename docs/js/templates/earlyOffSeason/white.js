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
            'mid-offseason': {
                '4day': {
                    week1: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "dbBenchPress", sets: "2 × max reps", note: "15-20 rep range" },
                                { type: "supplemental", exercise: "barbellRows", sets: "4 × 8-10" },
                                { type: "assistance", exercise: "rearDeltFlyes", sets: "4 × 12-15" },
                                { type: "assistance", exercise: "shrugs", sets: "4 × 8-12" },
                                { type: "assistance", exercise: "barbellCurls", sets: "4 × 8-12" }
                            ]
                        },
                        tuesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "6 × 3", note: "24-30 inch box" },
                                { type: "dynamic", exercise: "broadJump", sets: "4 × 2", note: "Max distance" },
                                { type: "supplemental", exercise: "bulgarianSplitSquat", sets: "3 × 8-10 each", note: "Hold DBs" },
                                { type: "supplemental", exercise: "romanianDeadlift", sets: "3 × 8-10" },
                                { type: "assistance", exercise: "sledDrags", sets: "3 × 30 yards", note: "Or farmer walks" },
                                { type: "assistance", exercise: "weightedAbs", sets: "4 × 10-15" }
                            ]
                        },
                        thursday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbInclinePress", sets: "3 × max reps", note: "3 min rest between sets" },
                                { type: "supplemental", exercise: "pullups", sets: "4 × 8-12", note: "Add weight if possible" },
                                { type: "assistance", exercise: "facePulls", sets: "4 × 15-20" },
                                { type: "assistance", exercise: "lateralRaises", sets: "3 × 10-12" },
                                { type: "assistance", exercise: "dbCurls", sets: "3 × 10-12" }
                            ]
                        },
                        friday: {
                            title: "Max-Effort Lower Body",
                            exercises: [
                                { type: "max-effort", exercise: "deadlift", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "walkingLunges", sets: "3 × 8-10 each", note: "Hold DBs" },
                                { type: "assistance", exercise: "hyperextensions", sets: "3 × 12-15" },
                                { type: "core", exercise: "hangingLegRaises", sets: "3 × 10-15" }
                            ]
                        }
                    },
                    week2: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "floorPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "dbFloorPress", sets: "2 × max reps" },
                                { type: "supplemental", exercise: "dbRows", sets: "4 × 8-10 each" },
                                { type: "assistance", exercise: "bandPullAparts", sets: "4 × 25-30" },
                                { type: "assistance", exercise: "shrugs", sets: "4 × 10-12" },
                                { type: "assistance", exercise: "barbellCurls", sets: "4 × 10-12" }
                            ]
                        },
                        tuesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "8 × 3", note: "Increase height if possible" },
                                { type: "dynamic", exercise: "verticalJump", sets: "5 × 3", note: "Max effort" },
                                { type: "supplemental", exercise: "bulgarianSplitSquat", sets: "3 × 10 each" },
                                { type: "supplemental", exercise: "gluteHamRaise", sets: "3 × 8-12" },
                                { type: "assistance", exercise: "prowlerPush", sets: "4 × 20 yards", note: "Or sled drag" },
                                { type: "assistance", exercise: "weightedAbs", sets: "4 × 12-15" }
                            ]
                        },
                        thursday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbBenchPress", sets: "4 × 12", note: "Bodybuilding style" },
                                { type: "assistance", exercise: "latPulldowns", sets: "4 × 10-12" },
                                { type: "assistance", exercise: "rearDeltFlyes", sets: "4 × 15-20" },
                                { type: "assistance", exercise: "lateralRaises", sets: "4 × 10-12" },
                                { type: "assistance", exercise: "dbCurls", sets: "4 × 10-15" }
                            ]
                        },
                        friday: {
                            title: "Max-Effort Lower Body",
                            exercises: [
                                { type: "max-effort", exercise: "boxSquat", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "stepUps", sets: "3 × 8 each" },
                                { type: "supplemental", exercise: "romanianDeadlift", sets: "3 × 8-10" },
                                { type: "core", exercise: "weightedAbs", sets: "4 × 15-20" }
                            ]
                        }
                    }
                }
            },
            'preseason': {
                '4day': {
                    week1: {
                        monday: {
                            title: "Max-Effort Upper Body (Reduced)",
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "supplemental", exercise: "dbBenchPress", sets: "2 × 12-15", note: "Moderate weight" },
                                { type: "supplemental", exercise: "rows", sets: "3 × 10-12" },
                                { type: "assistance", exercise: "rearDelts", sets: "3 × 12-15" },
                                { type: "assistance", exercise: "curls", sets: "2 × 10-12" }
                            ]
                        },
                        tuesday: {
                            title: "Speed & Jump Training",
                            exercises: [
                                { type: "sprint", exercise: "sprint10yd", sets: "8 × 10 yards", note: "Full recovery" },
                                { type: "dynamic", exercise: "verticalJump", sets: "5 × 3", note: "Max effort" },
                                { type: "supplemental", exercise: "bulgarianSplitSquat", sets: "2 × 8 each" },
                                { type: "core", exercise: "weightedAbs", sets: "3 × 15" }
                            ]
                        },
                        thursday: {
                            title: "Max-Effort Lower Body & Conditioning",
                            exercises: [
                                { type: "max-effort", exercise: "boxSquat", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "hyperextensions", sets: "3 × 10" },
                                { type: "conditioning", exercise: "prowlerPush", sets: "6 × 20 yards", note: "Or sled drags" }
                            ]
                        },
                        friday: {
                            title: "Repetition Upper Body",
                            exercises: [
                                { type: "repetition", exercise: "dbInclinePress", sets: "3 × 10-12", note: "Not to failure" },
                                { type: "supplemental", exercise: "pullups", sets: "3 × 8-10" },
                                { type: "assistance", exercise: "facePulls", sets: "3 × 15" },
                                { type: "core", exercise: "plank", sets: "3 × 45 seconds" }
                            ]
                        }
                    }
                },
                'speed': {
                    week1: {
                        monday: {
                            title: "Max-Effort Upper (Modified)",
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "dbPress", sets: "3 × 10" },
                                { type: "assistance", exercise: "rows", sets: "3 × 10" },
                                { type: "assistance", exercise: "facePulls", sets: "2 × 15" }
                            ]
                        },
                        tuesday: {
                            title: "Speed Development",
                            exercises: [
                                { type: "warmup", exercise: "Dynamic warm-up", sets: "10 minutes" },
                                { type: "sprint", exercise: "sprint10yd", sets: "10 × 10 yards", note: "Full recovery" },
                                { type: "sprint", exercise: "sprint20yd", sets: "6 × 20 yards", note: "2 min rest" },
                                { type: "sprint", exercise: "sprint40yd", sets: "3 × 40 yards", note: "Full recovery" }
                            ]
                        },
                        wednesday: {
                            title: "Recovery",
                            exercises: [
                                { type: "mobility", exercise: "Foam rolling", sets: "10 minutes" },
                                { type: "mobility", exercise: "Static stretching", sets: "10 minutes" }
                            ]
                        },
                        thursday: {
                            title: "Lower Body Power",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "5 × 3" },
                                { type: "max-effort", exercise: "boxSquat", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "lunges", sets: "2 × 10 each" }
                            ]
                        },
                        friday: {
                            title: "Upper Body Repetition",
                            exercises: [
                                { type: "repetition", exercise: "dbPress", sets: "3 × 12" },
                                { type: "assistance", exercise: "pullups", sets: "3 × 8" },
                                { type: "assistance", exercise: "arms", sets: "2 × 12" }
                            ]
                        },
                        saturday: {
                            title: "Conditioning",
                            exercises: [
                                { type: "conditioning", exercise: "Position-specific drills", sets: "20-30 minutes" },
                                { type: "conditioning", exercise: "Sport skills", sets: "20 minutes" }
                            ]
                        }
                    }
                }
            },
            'inseason': {
                '2day': {
                    week1: {
                        monday: {
                            title: "Max-Effort Upper Body", 
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "facePulls", sets: "2 × 15", note: "Shoulder health - simple version" },
                                { type: "supplemental", exercise: "bulgarianSplitSquat", sets: "2 × 8 each", note: "Bodyweight unilateral work" },
                                { type: "supplemental", exercise: "dbRows", sets: "3 × 10", note: "Single-arm DB rows" },
                                { type: "assistance", exercise: "shrugs", sets: "3 × 10", note: "DB shrugs" },
                                { type: "core", exercise: "plank", sets: "3 × 30 seconds", note: "Basic core stability" }
                            ]
                        },
                        wednesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "3 × 3", note: "20-24 inch box, focus on landing" },
                                { type: "speed", exercise: "boxSquat", sets: "6 × 2 @ 60%", intensity: "60% of 1RM", note: "1-minute rest, learn timing" },
                                { type: "supplemental", exercise: "dbBenchPress", sets: "2 × 10", note: "Moderate DB bench work" },
                                { type: "assistance", exercise: "bandPullAparts", sets: "3 × 20", note: "Simple rear delt work" },
                                { type: "assistance", exercise: "lateralRaises", sets: "2 × 12", note: "Light DB lateral raises" },
                                { type: "core", exercise: "abCircuit", sets: "2 × 15", note: "Basic abs + back extensions" }
                            ]
                        }
                    },
                    week2: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "benchPress", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "facePulls", sets: "3 × 15", note: "Increase volume slightly" },
                                { type: "supplemental", exercise: "walkingLunges", sets: "2 × 8 each", note: "Bodyweight walking lunges" },
                                { type: "supplemental", exercise: "barbellRows", sets: "3 × 8", note: "Bent-over barbell rows" },
                                { type: "assistance", exercise: "shrugs", sets: "3 × 10", note: "Same weight, better form" },
                                { type: "core", exercise: "weightedAbs", sets: "3 × 12", note: "Light weight or medicine ball" }
                            ]
                        },
                        wednesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "3 × 3", note: "Same height, better technique" },
                                { type: "speed", exercise: "boxSquat", sets: "5 × 2 @ 70%", intensity: "70% of 1RM", note: "1-minute rest, increased load" },
                                { type: "supplemental", exercise: "dbInclinePress", sets: "2 × 8", note: "Incline DB press variation" },
                                { type: "assistance", exercise: "rearDeltFlyes", sets: "3 × 12", note: "DB rear delt flies" },
                                { type: "assistance", exercise: "lateralRaises", sets: "3 × 10", note: "Consistent lateral raise work" },
                                { type: "core", exercise: "plankSuperset", sets: "3 × 45 sec + 10 reps", note: "Plank + hyperextensions" }
                            ]
                        }
                    },
                    week3: {
                        monday: {
                            title: "Max-Effort Upper Body",
                            exercises: [
                                { type: "max-effort", exercise: "inclineBench", sets: "Work up to ${getPhaseRM()}", intensity: "${getPhaseIntensity()}", note: "${getPhaseNote()}" },
                                { type: "assistance", exercise: "bandPullAparts", sets: "50 reps total", note: "High-rep band work" },
                                { type: "supplemental", exercise: "stepUps", sets: "2 × 8 each", note: "Knee-high box step-ups" },
                                { type: "supplemental", exercise: "cableRows", sets: "3 × 10", note: "Seated cable rows" },
                                { type: "assistance", exercise: "shrugs", sets: "3 × 8", note: "Focus on quality over quantity" },
                                { type: "core", exercise: "abCircuit", sets: "2 circuits", note: "Mixed ab work, conservative" }
                            ]
                        },
                        wednesday: {
                            title: "Dynamic-Effort Lower Body",
                            exercises: [
                                { type: "dynamic", exercise: "boxJump", sets: "3 × 3", note: "Consistent height, perfect form" },
                                { type: "speed", exercise: "boxSquat", sets: "3 singles @ 75-80%", intensity: "75-80% of 1RM", note: "2-3 min rest, conservative singles" },
                                { type: "supplemental", exercise: "dbBenchPress", sets: "2 × 8", note: "Back to basic DB work" },
                                { type: "assistance", exercise: "facePulls", sets: "2 × 15", note: "Shoulder health maintenance" },
                                { type: "assistance", exercise: "lateralRaises", sets: "2 × 10", note: "Light, consistent work" },
                                { type: "core", exercise: "plank", sets: "2 × 45 seconds", note: "Core stability focus" }
                            ]
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
