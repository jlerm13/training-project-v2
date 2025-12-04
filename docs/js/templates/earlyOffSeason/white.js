// ============================================================================
// WHITE TIER TEMPLATES - JavaScript Module Format
// ============================================================================
// Tier: WHITE (Unconscious Incompetence)
// Phase: Early Off-Season GPP
// Structure: Circuit-based full body training
// Language: Simplified for beginner athletes
// ============================================================================

(function() {
    const whiteTemplates = {
        white: {
            'early-offseason': {
                // ================================================================
                // 2-DAY FULL BODY SPLIT
                // ================================================================
                '2day': {
                    week1: {
                        monday: {
                            title: "Full Body - Day A",
                            warmup: [
                                { 
                                    type: "warmup", 
                                    exercise: "squatToStands", 
                                    sets: "2 × 5", 
                                    tempo: "Smooth and steady",
                                    note: "Drop hips low, keep chest up, heels on ground",
                                    media: {
                                        photo: "assets/exercises/white/squat-to-stands.jpg",
                                        video: "assets/exercises/white/squat-to-stands.mp4"
                                    }
                                },
                                { 
                                    type: "warmup", 
                                    exercise: "worldsGreatestStretch", 
                                    sets: "2 × 5/side", 
                                    tempo: "Smooth and steady",
                                    note: "Step into deep lunge, twist your chest toward front leg",
                                    media: {
                                        photo: "assets/exercises/white/worlds-greatest-stretch.jpg",
                                        video: "assets/exercises/white/worlds-greatest-stretch.mp4"
                                    }
                                },
                                { 
                                    type: "warmup", 
                                    exercise: "shoulderTaps", 
                                    sets: "2 × 5/side", 
                                    tempo: "Smooth and steady",
                                    note: "Hold strong plank, tap each shoulder without rocking hips",
                                    media: {
                                        photo: "assets/exercises/white/shoulder-taps.jpg",
                                        video: "assets/exercises/white/shoulder-taps.mp4"
                                    }
                                },
                                { 
                                    type: "warmup", 
                                    exercise: "jumpRopeDouble", 
                                    sets: "2 × 60s", 
                                    tempo: "Quick and powerful",
                                    note: "Stay light on your toes, keep a steady rhythm",
                                    media: {
                                        photo: "assets/exercises/white/jump-rope-double.jpg",
                                        video: "assets/exercises/white/jump-rope-double.mp4"
                                    }
                                }
                            ],
                            exercises: [
                                // CIRCUIT A - Lower Body
                                { 
                                    type: "circuit-a", 
                                    order: "A1",
                                    exercise: "dbSlantboardGobletSquat", 
                                    sets: "3 × 8", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "30s",
                                    note: "Heels on slant board, chest up, squat straight down",
                                    media: {
                                        photo: "assets/exercises/white/db-slantboard-goblet-squat.jpg",
                                        video: "assets/exercises/white/db-slantboard-goblet-squat.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-a", 
                                    order: "A2",
                                    exercise: "dbRDL", 
                                    sets: "3 × 8", 
                                    tempo: "3 seconds down, squeeze at top",
                                    rest: "30s",
                                    note: "Push hips back, keep back flat, weights close to legs",
                                    media: {
                                        photo: "assets/exercises/white/db-rdl.jpg",
                                        video: "assets/exercises/white/db-rdl.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-a", 
                                    order: "A3",
                                    exercise: "dbReverseLunge", 
                                    sets: "3 × 8/side", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "30s",
                                    note: "Take a big step back, lower slowly, keep chest up",
                                    media: {
                                        photo: "assets/exercises/white/db-reverse-lunge.jpg",
                                        video: "assets/exercises/white/db-reverse-lunge.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-a", 
                                    order: "A4",
                                    exercise: "dbLateralLunge", 
                                    sets: "3 × 8/side", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "75s",
                                    note: "Slide to the side, push hips back, keep planted foot flat",
                                    media: {
                                        photo: "assets/exercises/white/db-lateral-lunge.jpg",
                                        video: "assets/exercises/white/db-lateral-lunge.mp4"
                                    }
                                },
                                
                                // CIRCUIT B - Upper Body
                                { 
                                    type: "circuit-b", 
                                    order: "B1",
                                    exercise: "dbBenchPress", 
                                    sets: "3 × 8", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "30s",
                                    note: "Lower slowly to chest, press straight up",
                                    media: {
                                        photo: "assets/exercises/white/db-bench-press.jpg",
                                        video: "assets/exercises/white/db-bench-press.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-b", 
                                    order: "B2",
                                    exercise: "dbRows", 
                                    sets: "3 × 8", 
                                    tempo: "3 seconds down, squeeze at top",
                                    rest: "30s",
                                    note: "Place other hand on bench, pull weight to your side",
                                    media: {
                                        photo: "assets/exercises/white/db-rows.jpg",
                                        video: "assets/exercises/white/db-rows.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-b", 
                                    order: "B3",
                                    exercise: "dbZPress", 
                                    sets: "3 × 8", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "30s",
                                    note: "Sit up tall, press weights straight overhead",
                                    media: {
                                        photo: "assets/exercises/white/db-z-press.jpg",
                                        video: "assets/exercises/white/db-z-press.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-b", 
                                    order: "B4",
                                    exercise: "dbShoulderRaiseComplex", 
                                    sets: "2 × 5/variation", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "60s",
                                    note: "Do front raises, side raises, then bent-over raises. Go light",
                                    media: {
                                        photo: "assets/exercises/white/db-shoulder-raise-complex.jpg",
                                        video: "assets/exercises/white/db-shoulder-raise-complex.mp4"
                                    }
                                },
                                
                                // SUPERSET C - Lower Accessories
                                { 
                                    type: "superset-c", 
                                    order: "C1",
                                    exercise: "calfRaisesDouble", 
                                    sets: "2 × 8", 
                                    tempo: "2 seconds down, hold at top",
                                    rest: "20s",
                                    note: "Go all the way up, pause at top, come down slow",
                                    media: {
                                        photo: "assets/exercises/white/calf-raises-double.jpg",
                                        video: "assets/exercises/white/calf-raises-double.mp4"
                                    }
                                },
                                { 
                                    type: "superset-c", 
                                    order: "C2",
                                    exercise: "wallSits", 
                                    sets: "2 × 30s", 
                                    tempo: "Hold steady",
                                    rest: "45s",
                                    note: "Sit like a chair against the wall, hold position",
                                    media: {
                                        photo: "assets/exercises/white/wall-sits.jpg",
                                        video: "assets/exercises/white/wall-sits.mp4"
                                    }
                                },
                                
                                // TRI-SET D - Core
                                { 
                                    type: "tri-set-d", 
                                    order: "D1",
                                    exercise: "plankElbows", 
                                    sets: "2 × 30s", 
                                    tempo: "Hold steady",
                                    rest: "20s",
                                    note: "Elbows under shoulders, squeeze glutes, hold straight line",
                                    media: {
                                        photo: "assets/exercises/white/plank-elbows.jpg",
                                        video: "assets/exercises/white/plank-elbows.mp4"
                                    }
                                },
                                { 
                                    type: "tri-set-d", 
                                    order: "D2",
                                    exercise: "deadbugs", 
                                    sets: "2 × 5/side", 
                                    tempo: "Smooth and steady",
                                    rest: "20s",
                                    note: "Lower arms and legs slowly, keep back flat on ground",
                                    media: {
                                        photo: "assets/exercises/white/deadbugs.jpg",
                                        video: "assets/exercises/white/deadbugs.mp4"
                                    }
                                },
                                { 
                                    type: "tri-set-d", 
                                    order: "D3",
                                    exercise: "dbLowHighChop", 
                                    sets: "2 × 10/side", 
                                    tempo: "Smooth and steady",
                                    rest: "45s",
                                    note: "Start low, twist up and across your body",
                                    media: {
                                        photo: "assets/exercises/white/db-low-high-chop.jpg",
                                        video: "assets/exercises/white/db-low-high-chop.mp4"
                                    }
                                }
                            ]
                        },
                        friday: {
                            title: "Full Body - Day B",
                            warmup: [
                                { 
                                    type: "warmup", 
                                    exercise: "squatForwardFold", 
                                    sets: "2 × 5", 
                                    tempo: "Smooth and steady",
                                    note: "Squat down, then reach for your toes",
                                    media: {
                                        photo: "assets/exercises/white/squat-forward-fold.jpg",
                                        video: "assets/exercises/white/squat-forward-fold.mp4"
                                    }
                                },
                                { 
                                    type: "warmup", 
                                    exercise: "hip9090Reach", 
                                    sets: "2 × 5/side", 
                                    tempo: "Smooth and steady",
                                    note: "Sit in 90/90 position, rotate chest toward front knee",
                                    media: {
                                        photo: "assets/exercises/white/hip-90-90-reach.jpg",
                                        video: "assets/exercises/white/hip-90-90-reach.mp4"
                                    }
                                },
                                { 
                                    type: "warmup", 
                                    exercise: "downwardDogToeTap", 
                                    sets: "2 × 5/side", 
                                    tempo: "Smooth and steady",
                                    note: "Push hips up high, reach hand to opposite foot",
                                    media: {
                                        photo: "assets/exercises/white/downward-dog-toe-tap.jpg",
                                        video: "assets/exercises/white/downward-dog-toe-tap.mp4"
                                    }
                                },
                                { 
                                    type: "warmup", 
                                    exercise: "jumpRopeDouble", 
                                    sets: "2 × 60s", 
                                    tempo: "Quick and powerful",
                                    note: "Stay light on your toes, keep a steady rhythm",
                                    media: {
                                        photo: "assets/exercises/white/jump-rope-double.jpg",
                                        video: "assets/exercises/white/jump-rope-double.mp4"
                                    }
                                }
                            ],
                            exercises: [
                                // CIRCUIT A - Lower Body
                                { 
                                    type: "circuit-a", 
                                    order: "A1",
                                    exercise: "dbWalkingLunges", 
                                    sets: "3 × 8/side", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "30s",
                                    note: "Take big steps forward, back knee almost touches ground",
                                    media: {
                                        photo: "assets/exercises/white/db-walking-lunges.jpg",
                                        video: "assets/exercises/white/db-walking-lunges.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-a", 
                                    order: "A2",
                                    exercise: "dbKbSwings", 
                                    sets: "3 × 8", 
                                    tempo: "Quick and powerful",
                                    rest: "30s",
                                    note: "Push hips back, then snap them forward fast",
                                    media: {
                                        photo: "assets/exercises/white/db-kb-swings.jpg",
                                        video: "assets/exercises/white/db-kb-swings.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-a", 
                                    order: "A3",
                                    exercise: "dbStepDowns", 
                                    sets: "3 × 8/side", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "30s",
                                    note: "Step down slowly, tap heel, then push back up",
                                    media: {
                                        photo: "assets/exercises/white/db-step-downs.jpg",
                                        video: "assets/exercises/white/db-step-downs.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-a", 
                                    order: "A4",
                                    exercise: "dbCurtsyLunge", 
                                    sets: "3 × 8/side", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "75s",
                                    note: "Step back and across, lower down, stay upright",
                                    media: {
                                        photo: "assets/exercises/white/db-curtsy-lunge.jpg",
                                        video: "assets/exercises/white/db-curtsy-lunge.mp4"
                                    }
                                },
                                
                                // CIRCUIT B - Upper Body
                                { 
                                    type: "circuit-b", 
                                    order: "B1",
                                    exercise: "pushUps", 
                                    sets: "3 × 8", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "30s",
                                    note: "Lower all the way down, keep body straight",
                                    media: {
                                        photo: "assets/exercises/white/push-ups.jpg",
                                        video: "assets/exercises/white/push-ups.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-b", 
                                    order: "B2",
                                    exercise: "invertedRows", 
                                    sets: "3 × 8", 
                                    tempo: "3 seconds down, squeeze at top",
                                    rest: "30s",
                                    note: "Keep body straight, pull chest to the bar",
                                    media: {
                                        photo: "assets/exercises/white/inverted-rows.jpg",
                                        video: "assets/exercises/white/inverted-rows.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-b", 
                                    order: "B3",
                                    exercise: "dbKneelingOHPress", 
                                    sets: "3 × 8", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "30s",
                                    note: "One knee down, press weights straight overhead",
                                    media: {
                                        photo: "assets/exercises/white/db-kneeling-oh-press.jpg",
                                        video: "assets/exercises/white/db-kneeling-oh-press.mp4"
                                    }
                                },
                                { 
                                    type: "circuit-b", 
                                    order: "B4",
                                    exercise: "kbGorillaRows", 
                                    sets: "3 × 8/side", 
                                    tempo: "3 seconds down, 1 second up",
                                    rest: "60s",
                                    note: "Bend forward, row one weight at a time",
                                    media: {
                                        photo: "assets/exercises/white/kb-gorilla-rows.jpg",
                                        video: "assets/exercises/white/kb-gorilla-rows.mp4"
                                    }
                                },
                                
                                // SUPERSET C - Lower Accessories
                                { 
                                    type: "superset-c", 
                                    order: "C1",
                                    exercise: "wallTibRaises", 
                                    sets: "2 × 10", 
                                    tempo: "2 seconds down, hold at top",
                                    rest: "20s",
                                    note: "Lean against wall, lift toes up high",
                                    media: {
                                        photo: "assets/exercises/white/wall-tib-raises.jpg",
                                        video: "assets/exercises/white/wall-tib-raises.mp4"
                                    }
                                },
                                { 
                                    type: "superset-c", 
                                    order: "C2",
                                    exercise: "stabilityBallHamstringCurls", 
                                    sets: "2 × 10", 
                                    tempo: "Smooth and steady",
                                    rest: "45s",
                                    note: "Bridge hips up, curl ball toward you",
                                    media: {
                                        photo: "assets/exercises/white/stability-ball-hamstring-curls.jpg",
                                        video: "assets/exercises/white/stability-ball-hamstring-curls.mp4"
                                    }
                                },
                                
                                // TRI-SET D - Core
                                { 
                                    type: "tri-set-d", 
                                    order: "D1",
                                    exercise: "plankElbows", 
                                    sets: "2 × 30s", 
                                    tempo: "Hold steady",
                                    rest: "20s",
                                    note: "Elbows under shoulders, squeeze glutes, hold straight line",
                                    media: {
                                        photo: "assets/exercises/white/plank-elbows.jpg",
                                        video: "assets/exercises/white/plank-elbows.mp4"
                                    }
                                },
                                { 
                                    type: "tri-set-d", 
                                    order: "D2",
                                    exercise: "deadbugs", 
                                    sets: "2 × 5/side", 
                                    tempo: "Smooth and steady",
                                    rest: "20s",
                                    note: "Lower arms and legs slowly, keep back flat on ground",
                                    media: {
                                        photo: "assets/exercises/white/deadbugs.jpg",
                                        video: "assets/exercises/white/deadbugs.mp4"
                                    }
                                },
                                { 
                                    type: "tri-set-d", 
                                    order: "D3",
                                    exercise: "dbLowHighChop", 
                                    sets: "2 × 10/side", 
                                    tempo: "Smooth and steady",
                                    rest: "45s",
                                    note: "Start low, twist up and across your body",
                                    media: {
                                        photo: "assets/exercises/white/db-low-high-chop.jpg",
                                        video: "assets/exercises/white/db-low-high-chop.mp4"
                                    }
                                }
                            ]
                        }
                    },
                    
                    week2: {
                        monday: {
                            title: "Full Body - Day A",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground", media: { photo: "assets/exercises/white/squat-to-stands.jpg", video: "assets/exercises/white/squat-to-stands.mp4" } },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg", media: { photo: "assets/exercises/white/worlds-greatest-stretch.jpg", video: "assets/exercises/white/worlds-greatest-stretch.mp4" } },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips", media: { photo: "assets/exercises/white/shoulder-taps.jpg", video: "assets/exercises/white/shoulder-taps.mp4" } },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm", media: { photo: "assets/exercises/white/jump-rope-double.jpg", video: "assets/exercises/white/jump-rope-double.mp4" } }
                            ],
                            exercises: [
                                // CIRCUIT A - Lower Body (Week 2: 10 reps)
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Same weight as week 1, focus on form", media: { photo: "assets/exercises/white/db-slantboard-goblet-squat.jpg", video: "assets/exercises/white/db-slantboard-goblet-squat.mp4" } },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "3 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs", media: { photo: "assets/exercises/white/db-rdl.jpg", video: "assets/exercises/white/db-rdl.mp4" } },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up", media: { photo: "assets/exercises/white/db-reverse-lunge.jpg", video: "assets/exercises/white/db-reverse-lunge.mp4" } },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat", media: { photo: "assets/exercises/white/db-lateral-lunge.jpg", video: "assets/exercises/white/db-lateral-lunge.mp4" } },
                                
                                // CIRCUIT B - Upper Body (Week 2: 10 reps)
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up", media: { photo: "assets/exercises/white/db-bench-press.jpg", video: "assets/exercises/white/db-bench-press.mp4" } },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "3 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side", media: { photo: "assets/exercises/white/db-rows.jpg", video: "assets/exercises/white/db-rows.mp4" } },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead", media: { photo: "assets/exercises/white/db-z-press.jpg", video: "assets/exercises/white/db-z-press.mp4" } },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "2 × 8/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises. Go light", media: { photo: "assets/exercises/white/db-shoulder-raise-complex.jpg", video: "assets/exercises/white/db-shoulder-raise-complex.mp4" } },
                                
                                // SUPERSET C - Lower Accessories (Week 2: increased reps)
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 10", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow", media: { photo: "assets/exercises/white/calf-raises-double.jpg", video: "assets/exercises/white/calf-raises-double.mp4" } },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 45s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position", media: { photo: "assets/exercises/white/wall-sits.jpg", video: "assets/exercises/white/wall-sits.mp4" } },
                                
                                // TRI-SET D - Core (Week 2: increased time/reps)
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 45s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line", media: { photo: "assets/exercises/white/plank-elbows.jpg", video: "assets/exercises/white/plank-elbows.mp4" } },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 8/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground", media: { photo: "assets/exercises/white/deadbugs.jpg", video: "assets/exercises/white/deadbugs.mp4" } },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body", media: { photo: "assets/exercises/white/db-low-high-chop.jpg", video: "assets/exercises/white/db-low-high-chop.mp4" } }
                            ]
                        },
                        friday: {
                            title: "Full Body - Day B",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes", media: { photo: "assets/exercises/white/squat-forward-fold.jpg", video: "assets/exercises/white/squat-forward-fold.mp4" } },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee", media: { photo: "assets/exercises/white/hip-90-90-reach.jpg", video: "assets/exercises/white/hip-90-90-reach.mp4" } },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot", media: { photo: "assets/exercises/white/downward-dog-toe-tap.jpg", video: "assets/exercises/white/downward-dog-toe-tap.mp4" } },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm", media: { photo: "assets/exercises/white/jump-rope-double.jpg", video: "assets/exercises/white/jump-rope-double.mp4" } }
                            ],
                            exercises: [
                                // CIRCUIT A - Lower Body (Week 2: 10 reps)
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take big steps forward, back knee almost touches ground", media: { photo: "assets/exercises/white/db-walking-lunges.jpg", video: "assets/exercises/white/db-walking-lunges.mp4" } },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "3 × 10", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast", media: { photo: "assets/exercises/white/db-kb-swings.jpg", video: "assets/exercises/white/db-kb-swings.mp4" } },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up", media: { photo: "assets/exercises/white/db-step-downs.jpg", video: "assets/exercises/white/db-step-downs.mp4" } },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright", media: { photo: "assets/exercises/white/db-curtsy-lunge.jpg", video: "assets/exercises/white/db-curtsy-lunge.mp4" } },
                                
                                // CIRCUIT B - Upper Body (Week 2: 10 reps)
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight", media: { photo: "assets/exercises/white/push-ups.jpg", video: "assets/exercises/white/push-ups.mp4" } },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "3 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar", media: { photo: "assets/exercises/white/inverted-rows.jpg", video: "assets/exercises/white/inverted-rows.mp4" } },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead", media: { photo: "assets/exercises/white/db-kneeling-oh-press.jpg", video: "assets/exercises/white/db-kneeling-oh-press.mp4" } },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time", media: { photo: "assets/exercises/white/kb-gorilla-rows.jpg", video: "assets/exercises/white/kb-gorilla-rows.mp4" } },
                                
                                // SUPERSET C - Lower Accessories (Week 2: increased reps)
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 12", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high", media: { photo: "assets/exercises/white/wall-tib-raises.jpg", video: "assets/exercises/white/wall-tib-raises.mp4" } },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 12", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you", media: { photo: "assets/exercises/white/stability-ball-hamstring-curls.jpg", video: "assets/exercises/white/stability-ball-hamstring-curls.mp4" } },
                                
                                // TRI-SET D - Core (Week 2: increased time/reps)
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 45s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line", media: { photo: "assets/exercises/white/plank-elbows.jpg", video: "assets/exercises/white/plank-elbows.mp4" } },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 8/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground", media: { photo: "assets/exercises/white/deadbugs.jpg", video: "assets/exercises/white/deadbugs.mp4" } },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body", media: { photo: "assets/exercises/white/db-low-high-chop.jpg", video: "assets/exercises/white/db-low-high-chop.mp4" } }
                            ]
                        }
                    },
                    
                    week3: {
                        monday: {
                            title: "Full Body - Day A (Build Phase)",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground", media: { photo: "assets/exercises/white/squat-to-stands.jpg", video: "assets/exercises/white/squat-to-stands.mp4" } },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg", media: { photo: "assets/exercises/white/worlds-greatest-stretch.jpg", video: "assets/exercises/white/worlds-greatest-stretch.mp4" } },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips", media: { photo: "assets/exercises/white/shoulder-taps.jpg", video: "assets/exercises/white/shoulder-taps.mp4" } },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm", media: { photo: "assets/exercises/white/jump-rope-double.jpg", video: "assets/exercises/white/jump-rope-double.mp4" } }
                            ],
                            exercises: [
                                // CIRCUIT A - Lower Body (Week 3: 4 sets x 10 reps)
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Keep week 2 weight, adding 1 more set", media: { photo: "assets/exercises/white/db-slantboard-goblet-squat.jpg", video: "assets/exercises/white/db-slantboard-goblet-squat.mp4" } },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs", media: { photo: "assets/exercises/white/db-rdl.jpg", video: "assets/exercises/white/db-rdl.mp4" } },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up", media: { photo: "assets/exercises/white/db-reverse-lunge.jpg", video: "assets/exercises/white/db-reverse-lunge.mp4" } },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat", media: { photo: "assets/exercises/white/db-lateral-lunge.jpg", video: "assets/exercises/white/db-lateral-lunge.mp4" } },
                                
                                // CIRCUIT B - Upper Body (Week 3: 4 sets x 10 reps)
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up", media: { photo: "assets/exercises/white/db-bench-press.jpg", video: "assets/exercises/white/db-bench-press.mp4" } },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side", media: { photo: "assets/exercises/white/db-rows.jpg", video: "assets/exercises/white/db-rows.mp4" } },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead", media: { photo: "assets/exercises/white/db-z-press.jpg", video: "assets/exercises/white/db-z-press.mp4" } },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "3 × 8/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises. Go light", media: { photo: "assets/exercises/white/db-shoulder-raise-complex.jpg", video: "assets/exercises/white/db-shoulder-raise-complex.mp4" } },
                                
                                // SUPERSET C - Lower Accessories (Week 3: increased reps)
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 12", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow", media: { photo: "assets/exercises/white/calf-raises-double.jpg", video: "assets/exercises/white/calf-raises-double.mp4" } },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 60s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position", media: { photo: "assets/exercises/white/wall-sits.jpg", video: "assets/exercises/white/wall-sits.mp4" } },
                                
                                // TRI-SET D - Core (Week 3: increased time/reps)
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line", media: { photo: "assets/exercises/white/plank-elbows.jpg", video: "assets/exercises/white/plank-elbows.mp4" } },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground", media: { photo: "assets/exercises/white/deadbugs.jpg", video: "assets/exercises/white/deadbugs.mp4" } },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body", media: { photo: "assets/exercises/white/db-low-high-chop.jpg", video: "assets/exercises/white/db-low-high-chop.mp4" } }
                            ]
                        },
                        friday: {
                            title: "Full Body - Day B (Build Phase)",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes", media: { photo: "assets/exercises/white/squat-forward-fold.jpg", video: "assets/exercises/white/squat-forward-fold.mp4" } },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee", media: { photo: "assets/exercises/white/hip-90-90-reach.jpg", video: "assets/exercises/white/hip-90-90-reach.mp4" } },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot", media: { photo: "assets/exercises/white/downward-dog-toe-tap.jpg", video: "assets/exercises/white/downward-dog-toe-tap.mp4" } },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm", media: { photo: "assets/exercises/white/jump-rope-double.jpg", video: "assets/exercises/white/jump-rope-double.mp4" } }
                            ],
                            exercises: [
                                // CIRCUIT A - Lower Body (Week 3: 4 sets x 10 reps)
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take big steps forward, back knee almost touches ground", media: { photo: "assets/exercises/white/db-walking-lunges.jpg", video: "assets/exercises/white/db-walking-lunges.mp4" } },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "4 × 10", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast", media: { photo: "assets/exercises/white/db-kb-swings.jpg", video: "assets/exercises/white/db-kb-swings.mp4" } },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up", media: { photo: "assets/exercises/white/db-step-downs.jpg", video: "assets/exercises/white/db-step-downs.mp4" } },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright", media: { photo: "assets/exercises/white/db-curtsy-lunge.jpg", video: "assets/exercises/white/db-curtsy-lunge.mp4" } },
                                
                                // CIRCUIT B - Upper Body (Week 3: 4 sets x 10 reps)
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight", media: { photo: "assets/exercises/white/push-ups.jpg", video: "assets/exercises/white/push-ups.mp4" } },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar", media: { photo: "assets/exercises/white/inverted-rows.jpg", video: "assets/exercises/white/inverted-rows.mp4" } },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead", media: { photo: "assets/exercises/white/db-kneeling-oh-press.jpg", video: "assets/exercises/white/db-kneeling-oh-press.mp4" } },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time", media: { photo: "assets/exercises/white/kb-gorilla-rows.jpg", video: "assets/exercises/white/kb-gorilla-rows.mp4" } },
                                
                                // SUPERSET C - Lower Accessories (Week 3: increased reps)
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 15", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high", media: { photo: "assets/exercises/white/wall-tib-raises.jpg", video: "assets/exercises/white/wall-tib-raises.mp4" } },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 15", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you", media: { photo: "assets/exercises/white/stability-ball-hamstring-curls.jpg", video: "assets/exercises/white/stability-ball-hamstring-curls.mp4" } },
                                
                                // TRI-SET D - Core (Week 3: increased time/reps)
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line", media: { photo: "assets/exercises/white/plank-elbows.jpg", video: "assets/exercises/white/plank-elbows.mp4" } },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground", media: { photo: "assets/exercises/white/deadbugs.jpg", video: "assets/exercises/white/deadbugs.mp4" } },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body", media: { photo: "assets/exercises/white/db-low-high-chop.jpg", video: "assets/exercises/white/db-low-high-chop.mp4" } }
                            ]
                        }
                    },
                    
                    week4: {
                        monday: {
                            title: "Full Body - Day A (Final Week)",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground", media: { photo: "assets/exercises/white/squat-to-stands.jpg", video: "assets/exercises/white/squat-to-stands.mp4" } },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg", media: { photo: "assets/exercises/white/worlds-greatest-stretch.jpg", video: "assets/exercises/white/worlds-greatest-stretch.mp4" } },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips", media: { photo: "assets/exercises/white/shoulder-taps.jpg", video: "assets/exercises/white/shoulder-taps.mp4" } },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm", media: { photo: "assets/exercises/white/jump-rope-double.jpg", video: "assets/exercises/white/jump-rope-double.mp4" } }
                            ],
                            exercises: [
                                // CIRCUIT A - Lower Body (Week 4: same as week 3, option to add 2.5-5 lbs)
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Same as week 3, or add 2.5-5 lbs if feeling strong", media: { photo: "assets/exercises/white/db-slantboard-goblet-squat.jpg", video: "assets/exercises/white/db-slantboard-goblet-squat.mp4" } },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs", media: { photo: "assets/exercises/white/db-rdl.jpg", video: "assets/exercises/white/db-rdl.mp4" } },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up", media: { photo: "assets/exercises/white/db-reverse-lunge.jpg", video: "assets/exercises/white/db-reverse-lunge.mp4" } },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat", media: { photo: "assets/exercises/white/db-lateral-lunge.jpg", video: "assets/exercises/white/db-lateral-lunge.mp4" } },
                                
                                // CIRCUIT B - Upper Body (Week 4: same as week 3)
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up", media: { photo: "assets/exercises/white/db-bench-press.jpg", video: "assets/exercises/white/db-bench-press.mp4" } },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side", media: { photo: "assets/exercises/white/db-rows.jpg", video: "assets/exercises/white/db-rows.mp4" } },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead", media: { photo: "assets/exercises/white/db-z-press.jpg", video: "assets/exercises/white/db-z-press.mp4" } },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "3 × 8/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises. Go light", media: { photo: "assets/exercises/white/db-shoulder-raise-complex.jpg", video: "assets/exercises/white/db-shoulder-raise-complex.mp4" } },
                                
                                // SUPERSET C - Lower Accessories (Week 4: maintain week 3)
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 12", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow", media: { photo: "assets/exercises/white/calf-raises-double.jpg", video: "assets/exercises/white/calf-raises-double.mp4" } },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 60s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position", media: { photo: "assets/exercises/white/wall-sits.jpg", video: "assets/exercises/white/wall-sits.mp4" } },
                                
                                // TRI-SET D - Core (Week 4: maintain week 3)
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line", media: { photo: "assets/exercises/white/plank-elbows.jpg", video: "assets/exercises/white/plank-elbows.mp4" } },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground", media: { photo: "assets/exercises/white/deadbugs.jpg", video: "assets/exercises/white/deadbugs.mp4" } },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body", media: { photo: "assets/exercises/white/db-low-high-chop.jpg", video: "assets/exercises/white/db-low-high-chop.mp4" } }
                            ]
                        },
                        friday: {
                            title: "Full Body - Day B (Final Week)",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes", media: { photo: "assets/exercises/white/squat-forward-fold.jpg", video: "assets/exercises/white/squat-forward-fold.mp4" } },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee", media: { photo: "assets/exercises/white/hip-90-90-reach.jpg", video: "assets/exercises/white/hip-90-90-reach.mp4" } },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot", media: { photo: "assets/exercises/white/downward-dog-toe-tap.jpg", video: "assets/exercises/white/downward-dog-toe-tap.mp4" } },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm", media: { photo: "assets/exercises/white/jump-rope-double.jpg", video: "assets/exercises/white/jump-rope-double.mp4" } }
                            ],
                            exercises: [
                                // CIRCUIT A - Lower Body (Week 4: same as week 3, option to add 2.5-5 lbs)
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Same as week 3, or add 2.5-5 lbs if feeling strong", media: { photo: "assets/exercises/white/db-walking-lunges.jpg", video: "assets/exercises/white/db-walking-lunges.mp4" } },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "4 × 10", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast", media: { photo: "assets/exercises/white/db-kb-swings.jpg", video: "assets/exercises/white/db-kb-swings.mp4" } },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up", media: { photo: "assets/exercises/white/db-step-downs.jpg", video: "assets/exercises/white/db-step-downs.mp4" } },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright", media: { photo: "assets/exercises/white/db-curtsy-lunge.jpg", video: "assets/exercises/white/db-curtsy-lunge.mp4" } },
                                
                                // CIRCUIT B - Upper Body (Week 4: same as week 3)
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight", media: { photo: "assets/exercises/white/push-ups.jpg", video: "assets/exercises/white/push-ups.mp4" } },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar", media: { photo: "assets/exercises/white/inverted-rows.jpg", video: "assets/exercises/white/inverted-rows.mp4" } },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead", media: { photo: "assets/exercises/white/db-kneeling-oh-press.jpg", video: "assets/exercises/white/db-kneeling-oh-press.mp4" } },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time", media: { photo: "assets/exercises/white/kb-gorilla-rows.jpg", video: "assets/exercises/white/kb-gorilla-rows.mp4" } },
                                
                                // SUPERSET C - Lower Accessories (Week 4: maintain week 3)
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 15", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high", media: { photo: "assets/exercises/white/wall-tib-raises.jpg", video: "assets/exercises/white/wall-tib-raises.mp4" } },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 15", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you", media: { photo: "assets/exercises/white/stability-ball-hamstring-curls.jpg", video: "assets/exercises/white/stability-ball-hamstring-curls.mp4" } },
                                
                                // TRI-SET D - Core (Week 4: maintain week 3)
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line", media: { photo: "assets/exercises/white/plank-elbows.jpg", video: "assets/exercises/white/plank-elbows.mp4" } },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground", media: { photo: "assets/exercises/white/deadbugs.jpg", video: "assets/exercises/white/deadbugs.mp4" } },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body", media: { photo: "assets/exercises/white/db-low-high-chop.jpg", video: "assets/exercises/white/db-low-high-chop.mp4" } }
                            ]
                        }
                    }
                },
                
                // ================================================================
                // 3-DAY FULL BODY SPLIT (ABA/BAB ROTATION)
                // Week 1 & 3: A-B-A pattern | Week 2 & 4: B-A-B pattern
                // ================================================================
                '3day': {
                    week1: {
                        monday: {
                            title: "Full Body - Day A",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground" },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg" },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "3 × 8", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Heels on slant board, chest up, squat straight down" },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "3 × 8", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs" },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "3 × 8/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up" },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "3 × 8/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat" },
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "3 × 8", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up" },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "3 × 8", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side" },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "3 × 8", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "2 × 5/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises" },
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 8", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow" },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 30s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 30s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 5/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        },
                        wednesday: {
                            title: "Full Body - Day B",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes" },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee" },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "3 × 8/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take big steps forward, back knee almost touches ground" },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "3 × 8", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast" },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "3 × 8/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up" },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "3 × 8/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright" },
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "3 × 8", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight" },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "3 × 8", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar" },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "3 × 8", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "3 × 8/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time" },
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 10", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high" },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 10", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 30s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 5/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        },
                        friday: {
                            title: "Full Body - Day A",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground" },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg" },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "3 × 8", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Heels on slant board, chest up, squat straight down" },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "3 × 8", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs" },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "3 × 8/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up" },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "3 × 8/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat" },
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "3 × 8", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up" },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "3 × 8", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side" },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "3 × 8", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "2 × 5/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises" },
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 8", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow" },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 30s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 30s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 5/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        }
                    },
                    week2: {
                        monday: {
                            title: "Full Body - Day B",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes" },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee" },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take big steps forward, back knee almost touches ground" },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "3 × 10", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast" },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up" },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright" },
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight" },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "3 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar" },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time" },
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 12", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high" },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 12", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 45s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 8/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        },
                        wednesday: {
                            title: "Full Body - Day A",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground" },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg" },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Heels on slant board, chest up, squat straight down" },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "3 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs" },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up" },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat" },
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up" },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "3 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side" },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "2 × 8/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises" },
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 10", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow" },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 45s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 45s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 8/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        },
                        friday: {
                            title: "Full Body - Day B",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes" },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee" },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take big steps forward, back knee almost touches ground" },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "3 × 10", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast" },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up" },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright" },
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight" },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "3 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar" },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "3 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "3 × 10/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time" },
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 12", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high" },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 12", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 45s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 8/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        }
                    },
                    week3: {
                        monday: {
                            title: "Full Body - Day A (Build Phase)",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground" },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg" },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Heels on slant board, chest up, squat straight down" },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs" },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up" },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat" },
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up" },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side" },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "3 × 8/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises" },
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 12", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow" },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 60s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        },
                        wednesday: {
                            title: "Full Body - Day B (Build Phase)",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes" },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee" },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take big steps forward, back knee almost touches ground" },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "4 × 10", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast" },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up" },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright" },
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight" },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar" },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time" },
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 15", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high" },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 15", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        },
                        friday: {
                            title: "Full Body - Day A (Build Phase)",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground" },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg" },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Heels on slant board, chest up, squat straight down" },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs" },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up" },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat" },
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up" },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side" },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "3 × 8/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises" },
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 12", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow" },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 60s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        }
                    },
                    week4: {
                        monday: {
                            title: "Full Body - Day B (Maintain Phase)",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes" },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee" },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take big steps forward, back knee almost touches ground" },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "4 × 10", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast" },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up" },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright" },
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight" },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar" },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time" },
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 15", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high" },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 15", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        },
                        wednesday: {
                            title: "Full Body - Day A (Maintain Phase)",
                            warmup: [
                                { type: "warmup", exercise: "squatToStands", sets: "2 × 5", tempo: "Smooth and steady", note: "Drop hips low, keep chest up, heels on ground" },
                                { type: "warmup", exercise: "worldsGreatestStretch", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Step into deep lunge, twist your chest toward front leg" },
                                { type: "warmup", exercise: "shoulderTaps", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Hold strong plank, tap each shoulder without rocking hips" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbSlantboardGobletSquat", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Heels on slant board, chest up, squat straight down" },
                                { type: "circuit-a", order: "A2", exercise: "dbRDL", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Push hips back, keep back flat, weights close to legs" },
                                { type: "circuit-a", order: "A3", exercise: "dbReverseLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take a big step back, lower slowly, keep chest up" },
                                { type: "circuit-a", order: "A4", exercise: "dbLateralLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Slide to the side, push hips back, keep planted foot flat" },
                                { type: "circuit-b", order: "B1", exercise: "dbBenchPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower slowly to chest, press straight up" },
                                { type: "circuit-b", order: "B2", exercise: "dbRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Place other hand on bench, pull weight to your side" },
                                { type: "circuit-b", order: "B3", exercise: "dbZPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Sit up tall, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "dbShoulderRaiseComplex", sets: "3 × 8/variation", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Do front raises, side raises, then bent-over raises" },
                                { type: "superset-c", order: "C1", exercise: "calfRaisesDouble", sets: "2 × 12", tempo: "2 seconds down, hold at top", rest: "20s", note: "Go all the way up, pause at top, come down slow" },
                                { type: "superset-c", order: "C2", exercise: "wallSits", sets: "2 × 60s", tempo: "Hold steady", rest: "45s", note: "Sit like a chair against the wall, hold position" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        },
                        friday: {
                            title: "Full Body - Day B (Maintain Phase)",
                            warmup: [
                                { type: "warmup", exercise: "squatForwardFold", sets: "2 × 5", tempo: "Smooth and steady", note: "Squat down, then reach for your toes" },
                                { type: "warmup", exercise: "hip9090Reach", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Sit in 90/90 position, rotate chest toward front knee" },
                                { type: "warmup", exercise: "downwardDogToeTap", sets: "2 × 5/side", tempo: "Smooth and steady", note: "Push hips up high, reach hand to opposite foot" },
                                { type: "warmup", exercise: "jumpRopeDouble", sets: "2 × 60s", tempo: "Quick and powerful", note: "Stay light on your toes, keep a steady rhythm" }
                            ],
                            exercises: [
                                { type: "circuit-a", order: "A1", exercise: "dbWalkingLunges", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Take big steps forward, back knee almost touches ground" },
                                { type: "circuit-a", order: "A2", exercise: "dbKbSwings", sets: "4 × 10", tempo: "Quick and powerful", rest: "30s", note: "Push hips back, then snap them forward fast" },
                                { type: "circuit-a", order: "A3", exercise: "dbStepDowns", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Step down slowly, tap heel, then push back up" },
                                { type: "circuit-a", order: "A4", exercise: "dbCurtsyLunge", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "75s", note: "Step back and across, lower down, stay upright" },
                                { type: "circuit-b", order: "B1", exercise: "pushUps", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "Lower all the way down, keep body straight" },
                                { type: "circuit-b", order: "B2", exercise: "invertedRows", sets: "4 × 10", tempo: "3 seconds down, squeeze at top", rest: "30s", note: "Keep body straight, pull chest to the bar" },
                                { type: "circuit-b", order: "B3", exercise: "dbKneelingOHPress", sets: "4 × 10", tempo: "3 seconds down, 1 second up", rest: "30s", note: "One knee down, press weights straight overhead" },
                                { type: "circuit-b", order: "B4", exercise: "kbGorillaRows", sets: "4 × 10/side", tempo: "3 seconds down, 1 second up", rest: "60s", note: "Bend forward, row one weight at a time" },
                                { type: "superset-c", order: "C1", exercise: "wallTibRaises", sets: "2 × 15", tempo: "2 seconds down, hold at top", rest: "20s", note: "Lean against wall, lift toes up high" },
                                { type: "superset-c", order: "C2", exercise: "stabilityBallHamstringCurls", sets: "2 × 15", tempo: "Smooth and steady", rest: "45s", note: "Bridge hips up, curl ball toward you" },
                                { type: "tri-set-d", order: "D1", exercise: "plankElbows", sets: "2 × 60s", tempo: "Hold steady", rest: "20s", note: "Elbows under shoulders, squeeze glutes, hold straight line" },
                                { type: "tri-set-d", order: "D2", exercise: "deadbugs", sets: "2 × 10/side", tempo: "Smooth and steady", rest: "20s", note: "Lower arms and legs slowly, keep back flat on ground" },
                                { type: "tri-set-d", order: "D3", exercise: "dbLowHighChop", sets: "2 × 12/side", tempo: "Smooth and steady", rest: "45s", note: "Start low, twist up and across your body" }
                            ]
                        }
                    }
                },
                
                // ================================================================
                // 4-DAY FULL BODY SPLIT (ABAB PATTERN) - Placeholder
                // ================================================================
                '4day': {
                    description: "4-day program alternating Day A and Day B every week. Pattern: Mon=A, Tue=B, Thu=A, Fri=B",
                    note: "Coming soon - uses identical exercises and progressions as 2-day template.",
                    weeklyPattern: {
                        allWeeks: "Monday: Day A, Tuesday: Day B, Thursday: Day A, Friday: Day B"
                    }
                },
                
                // ================================================================
                // CONDITIONING PLAN - 4-Week GPP (3 sessions/week)
                // ================================================================
                'conditioning': {
                    overview: {
                        frequency: "3 sessions per week",
                        goal: "Build your aerobic base — get in shape to train hard",
                        equipment: ["Treadmill", "Bike", "Elliptical", "Stairmaster", "Track", "Turf"],
                        keyRules: [
                            "Keep all running EASY — you should be able to hold a conversation",
                            "Walk recoveries are mandatory, not optional",
                            "Prefer turf, track, or treadmill over concrete"
                        ]
                    },
                    week1: {
                        sessionA: {
                            title: "Conditioning A",
                            totalTime: "30 min",
                            runningTime: "10 min",
                            structure: [
                                { type: "warmup", description: "5-min easy walk" },
                                { type: "work", description: "10 rounds: 1 min run + 1 min walk", detail: "10 × (1 min easy run → 1 min walk)" },
                                { type: "cooldown", description: "5-min easy walk" }
                            ],
                            coachNote: "This should feel easy. If you're breathing hard, slow down."
                        },
                        sessionB: {
                            title: "Conditioning B",
                            totalTime: "30 min",
                            runningTime: "14 min",
                            structure: [
                                { type: "warmup", description: "5-min easy walk" },
                                { type: "work", description: "7 rounds: 2 min run + 1 min walk", detail: "7 × (2 min easy run → 1 min walk)" },
                                { type: "cooldown", description: "5-min easy walk" }
                            ],
                            coachNote: "Slightly longer runs, same easy effort."
                        },
                        sessionC: {
                            title: "Conditioning C",
                            totalTime: "30 min",
                            runningTime: "10 min",
                            structure: [
                                { type: "warmup", description: "5-min easy walk" },
                                { type: "work", description: "6 rounds: 1 min run + 30 sec walk", detail: "6 × (1 min easy run → 30 sec walk)" },
                                { type: "work", description: "8 rounds: 30 sec run + 1 min walk", detail: "8 × (30 sec easy run → 1 min walk)" },
                                { type: "cooldown", description: "4-min easy walk" }
                            ],
                            coachNote: "Two different interval patterns — keeps things interesting."
                        }
                    },
                    week2: {
                        repeatWeek: 1,
                        note: "Same as Week 1 — focus on consistency"
                    },
                    week3: {
                        sessionA: {
                            title: "Conditioning A",
                            totalTime: "40 min",
                            runningTime: "23 min",
                            structure: [
                                { type: "warmup", description: "3-min easy run + 3-min walk" },
                                { type: "work", description: "10 rounds: 2 min run + 1 min walk", detail: "10 × (2 min easy run → 1 min walk)" },
                                { type: "cooldown", description: "4-min easy walk" }
                            ],
                            coachNote: "Longer session, longer runs. Your base is building."
                        },
                        sessionB: {
                            title: "Conditioning B",
                            totalTime: "40 min",
                            runningTime: "18 min",
                            structure: [
                                { type: "warmup", description: "3-min easy run + 3-min walk" },
                                { type: "work", description: "6 rounds: 3 min run + 2 min walk", detail: "6 × (3 min easy run → 2 min walk)" },
                                { type: "cooldown", description: "4-min easy walk" }
                            ],
                            coachNote: "3-minute runs are a step up — stay conversational."
                        },
                        sessionC: {
                            title: "Conditioning C",
                            totalTime: "40 min",
                            runningTime: "20 min",
                            structure: [
                                { type: "warmup", description: "3-min easy run + 3-min walk" },
                                { type: "work", description: "20 rounds: 1 min run + 30 sec walk", detail: "20 × (1 min easy run → 30 sec walk)" },
                                { type: "cooldown", description: "4-min easy walk" }
                            ],
                            coachNote: "More intervals, but short rests. Great for building work capacity."
                        }
                    },
                    week4: {
                        repeatWeek: 3,
                        note: "Same as Week 3 — solidify the gains"
                    }
                },
                
                // ================================================================
                // WEEKLY SCHEDULE OPTIONS
                // ================================================================
                'weeklySchedule': {
                    '2day': {
                        name: "2-Day Lift + Conditioning",
                        schedule: [
                            { day: "Monday", activity: "Full Body Lift A", type: "lift" },
                            { day: "Tuesday", activity: "Conditioning A", type: "conditioning" },
                            { day: "Wednesday", activity: "Off / Mobility", type: "rest" },
                            { day: "Thursday", activity: "Conditioning B", type: "conditioning" },
                            { day: "Friday", activity: "Full Body Lift B", type: "lift" },
                            { day: "Saturday", activity: "Conditioning C", type: "conditioning" },
                            { day: "Sunday", activity: "Off", type: "rest" }
                        ]
                    },
                    '3day': {
                        name: "3-Day Lift + Conditioning",
                        note: "Choose based on your schedule. Separate days = more recovery. Same day = more days off.",
                        options: [
                            {
                                name: "Separate Days (6 training days)",
                                schedule: [
                                    { day: "Monday", activity: "Lift", type: "lift" },
                                    { day: "Tuesday", activity: "Conditioning A", type: "conditioning" },
                                    { day: "Wednesday", activity: "Lift", type: "lift" },
                                    { day: "Thursday", activity: "Conditioning B", type: "conditioning" },
                                    { day: "Friday", activity: "Lift", type: "lift" },
                                    { day: "Saturday", activity: "Conditioning C", type: "conditioning" },
                                    { day: "Sunday", activity: "Off", type: "rest" }
                                ]
                            },
                            {
                                name: "Same Day (3 training days)",
                                schedule: [
                                    { day: "Monday", activity: "Lift + Conditioning A", type: "both" },
                                    { day: "Tuesday", activity: "Off / Mobility", type: "rest" },
                                    { day: "Wednesday", activity: "Lift + Conditioning B", type: "both" },
                                    { day: "Thursday", activity: "Off / Mobility", type: "rest" },
                                    { day: "Friday", activity: "Lift + Conditioning C", type: "both" },
                                    { day: "Saturday", activity: "Off", type: "rest" },
                                    { day: "Sunday", activity: "Off", type: "rest" }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    };

    // Properly call the loading function
    if (typeof loadTemplateModule === 'function') {
        loadTemplateModule('white', whiteTemplates);
    } else {
        console.error('loadTemplateModule function not available');
    }
})();
