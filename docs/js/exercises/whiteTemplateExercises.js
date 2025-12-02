// exercises/whiteTemplateExercises.js - White Tier Template Exercises
// Architecture: Movement-first with tool variations where applicable
// This eliminates the need for dbLunge, kbLunge, bbLunge as separate entries

(function() {
    const whiteTemplateExercises = {
        
        // ============================================================================
        // WARMUP & MOBILITY EXERCISES
        // ============================================================================
        
        squatToStands: {
            name: "Squat to Stands",
            category: "warmup",
            movementPattern: "mobility-squat",
            defaultTool: "bodyweight",
            coachingCues: [
                "Start standing, fold forward and grab toes",
                "Drop hips into deep squat while holding toes",
                "Keep chest up, heels on ground",
                "Stand by straightening legs first, then release toes"
            ],
            athleticCarryover: "Improves hip mobility and squat depth",
            indicator: { isIndicator: false }
        },
        
        worldsGreatestStretch: {
            name: "World's Greatest Stretch",
            category: "warmup",
            movementPattern: "mobility-lunge",
            defaultTool: "bodyweight",
            coachingCues: [
                "Step into deep lunge position",
                "Place same-side elbow toward the ground",
                "Rotate chest toward front leg, reach arm to sky",
                "Feel stretch in hip, groin, and thoracic spine"
            ],
            athleticCarryover: "Full-body mobility for athletes",
            indicator: { isIndicator: false }
        },
        
        shoulderTaps: {
            name: "Shoulder Taps",
            category: "warmup",
            movementPattern: "core-stability",
            defaultTool: "bodyweight",
            coachingCues: [
                "Start in strong push-up position",
                "Lift one hand to tap opposite shoulder",
                "Keep hips completely still - no rocking",
                "Alternate sides with control"
            ],
            athleticCarryover: "Core stability and anti-rotation strength",
            indicator: { isIndicator: false }
        },
        
        jumpRopeDouble: {
            name: "Jump Rope (Double Foot)",
            category: "warmup",
            movementPattern: "cardio-coordination",
            defaultTool: "jumprope",
            toolVariations: {
                jumprope: "Jump Rope",
                bodyweight: "Jumping Jacks"
            },
            coachingCues: [
                "Stay light on your toes",
                "Keep elbows close to body",
                "Use wrists to turn the rope, not arms",
                "Maintain a steady rhythm"
            ],
            athleticCarryover: "Coordination, conditioning, and foot quickness",
            indicator: { isIndicator: false }
        },
        
        squatForwardFold: {
            name: "Squat to Forward Fold",
            category: "warmup",
            movementPattern: "mobility-squat",
            defaultTool: "bodyweight",
            coachingCues: [
                "Drop into deep squat position",
                "Grab under your toes",
                "Straighten legs while keeping grip",
                "Feel hamstring stretch, then return to squat"
            ],
            athleticCarryover: "Hamstring flexibility and squat mobility",
            indicator: { isIndicator: false }
        },
        
        hip9090Reach: {
            name: "Hip 90/90 with Reach",
            category: "warmup",
            movementPattern: "mobility-hip",
            defaultTool: "bodyweight",
            coachingCues: [
                "Sit with both legs at 90-degree angles",
                "Front shin parallel, back shin perpendicular",
                "Rotate chest toward front knee",
                "Reach forward to increase stretch"
            ],
            athleticCarryover: "Hip internal and external rotation mobility",
            indicator: { isIndicator: false }
        },
        
        downwardDogToeTap: {
            name: "Downward Dog Toe Tap",
            category: "warmup",
            movementPattern: "mobility-full-body",
            defaultTool: "bodyweight",
            coachingCues: [
                "Start in downward dog - hips high, heels pressing down",
                "Reach one hand to opposite foot",
                "Keep hips high throughout",
                "Alternate sides with control"
            ],
            athleticCarryover: "Hamstring flexibility and cross-body coordination",
            indicator: { isIndicator: false }
        },
        
        // ============================================================================
        // LOWER BODY - MOVEMENT-FIRST WITH TOOL VARIATIONS
        // ============================================================================
        
        // GOBLET SQUAT VARIATIONS
        dbSlantboardGobletSquat: {
            name: "DB Slantboard Goblet Squat",
            category: "lower-body",
            movementPattern: "squat",
            baseMovement: "gobletSquat",
            defaultTool: "db",
            toolVariations: {
                db: "DB Slantboard Goblet Squat",
                kb: "KB Slantboard Goblet Squat",
                bodyweight: "Slantboard Squat"
            },
            equipmentMap: {
                full: "DB Slantboard Goblet Squat",
                commercial: "DB Goblet Squat (heels elevated)",
                minimal: "Goblet Squat (plates under heels)",
                bodyweight: "Bodyweight Squat (heels elevated)"
            },
            coachingCues: [
                "Heels on slant board or elevated surface",
                "Hold weight at chest level",
                "Squat straight down, not back",
                "Keep chest up and core tight"
            ],
            athleticCarryover: "Builds quad strength and squat depth",
            indicator: { isIndicator: false }
        },
        
        // RDL - Romanian Deadlift
        dbRDL: {
            name: "DB Romanian Deadlift",
            category: "lower-body",
            movementPattern: "hip-hinge",
            baseMovement: "romanianDeadlift",
            defaultTool: "db",
            toolVariations: {
                db: "DB Romanian Deadlift",
                kb: "KB Romanian Deadlift",
                bb: "Barbell Romanian Deadlift",
                bodyweight: "Single-Leg RDL (bodyweight)"
            },
            equipmentMap: {
                full: "Barbell Romanian Deadlift",
                commercial: "DB Romanian Deadlift",
                minimal: "DB Romanian Deadlift",
                bodyweight: "Single-Leg RDL"
            },
            coachingCues: [
                "Push hips back, not down",
                "Keep back flat throughout",
                "Weights stay close to legs",
                "Feel stretch in hamstrings"
            ],
            athleticCarryover: "Posterior chain strength and hip hinge pattern",
            indicator: { isIndicator: false }
        },
        
        // REVERSE LUNGE
        dbReverseLunge: {
            name: "DB Reverse Lunge",
            category: "lower-body",
            movementPattern: "lunge",
            baseMovement: "reverseLunge",
            defaultTool: "db",
            toolVariations: {
                db: "DB Reverse Lunge",
                kb: "KB Reverse Lunge",
                bb: "Barbell Reverse Lunge",
                bodyweight: "Bodyweight Reverse Lunge"
            },
            equipmentMap: {
                full: "Barbell Reverse Lunge",
                commercial: "DB Reverse Lunge",
                minimal: "DB Reverse Lunge",
                bodyweight: "Bodyweight Reverse Lunge"
            },
            coachingCues: [
                "Step back into lunge (easier on knees than forward)",
                "Lower until back knee nearly touches ground",
                "Keep chest up, core tight",
                "Push through front heel to return"
            ],
            athleticCarryover: "Unilateral leg strength and deceleration",
            indicator: { isIndicator: false }
        },
        
        // LATERAL LUNGE
        dbLateralLunge: {
            name: "DB Lateral Lunge",
            category: "lower-body",
            movementPattern: "lateral-lunge",
            baseMovement: "lateralLunge",
            defaultTool: "db",
            toolVariations: {
                db: "DB Lateral Lunge",
                kb: "KB Lateral Lunge",
                bb: "Barbell Lateral Lunge",
                bodyweight: "Bodyweight Lateral Lunge"
            },
            equipmentMap: {
                full: "Barbell Lateral Lunge",
                commercial: "DB Lateral Lunge",
                minimal: "DB Lateral Lunge",
                bodyweight: "Bodyweight Lateral Lunge"
            },
            coachingCues: [
                "Step wide to the side",
                "Push hips back, sit into working leg",
                "Keep other leg straight",
                "Push off to return to center"
            ],
            athleticCarryover: "Lateral movement strength for sports",
            indicator: { isIndicator: false }
        },
        
        // WALKING LUNGES
        dbWalkingLunges: {
            name: "DB Walking Lunges",
            category: "lower-body",
            movementPattern: "lunge",
            baseMovement: "walkingLunge",
            defaultTool: "db",
            toolVariations: {
                db: "DB Walking Lunges",
                kb: "KB Walking Lunges",
                bb: "Barbell Walking Lunges",
                bodyweight: "Bodyweight Walking Lunges"
            },
            equipmentMap: {
                full: "Barbell Walking Lunges",
                commercial: "DB Walking Lunges",
                minimal: "DB Walking Lunges",
                bodyweight: "Bodyweight Walking Lunges"
            },
            coachingCues: [
                "Take big steps forward",
                "Back knee almost touches ground",
                "Keep torso upright throughout",
                "Continuous movement, don't pause"
            ],
            athleticCarryover: "Dynamic leg strength and movement efficiency",
            indicator: { isIndicator: false }
        },
        
        // SWINGS (DB or KB)
        dbKbSwings: {
            name: "DB/KB Swings",
            category: "lower-body",
            movementPattern: "hip-hinge-ballistic",
            baseMovement: "kettlebellSwing",
            defaultTool: "kb",
            toolVariations: {
                kb: "Kettlebell Swings",
                db: "Dumbbell Swings",
                bodyweight: "Hip Hinges (fast)"
            },
            equipmentMap: {
                full: "Kettlebell Swings",
                commercial: "Kettlebell Swings",
                minimal: "Dumbbell Swings",
                bodyweight: "Explosive Hip Hinges"
            },
            coachingCues: [
                "Push hips back, not squat down",
                "Snap hips forward explosively",
                "Arms are just along for the ride",
                "Squeeze glutes at the top"
            ],
            athleticCarryover: "Hip power and posterior chain explosiveness",
            indicator: { isIndicator: false }
        },
        
        // STEP DOWNS
        dbStepDowns: {
            name: "DB Step Downs",
            category: "lower-body",
            movementPattern: "step-eccentric",
            baseMovement: "stepDown",
            defaultTool: "db",
            toolVariations: {
                db: "DB Step Downs",
                kb: "KB Step Downs",
                bodyweight: "Bodyweight Step Downs"
            },
            equipmentMap: {
                full: "DB Step Downs",
                commercial: "DB Step Downs",
                minimal: "Bodyweight Step Downs",
                bodyweight: "Bodyweight Step Downs"
            },
            coachingCues: [
                "Stand on box or step",
                "Lower opposite foot slowly to floor",
                "Tap heel lightly, don't rest weight",
                "Push back up with working leg"
            ],
            athleticCarryover: "Eccentric leg strength and knee stability",
            indicator: { isIndicator: false }
        },
        
        // CURTSY LUNGE
        dbCurtsyLunge: {
            name: "DB Curtsy Lunge",
            category: "lower-body",
            movementPattern: "lunge-rotational",
            baseMovement: "curtsyLunge",
            defaultTool: "db",
            toolVariations: {
                db: "DB Curtsy Lunge",
                kb: "KB Curtsy Lunge",
                bodyweight: "Bodyweight Curtsy Lunge"
            },
            equipmentMap: {
                full: "DB Curtsy Lunge",
                commercial: "DB Curtsy Lunge",
                minimal: "Bodyweight Curtsy Lunge",
                bodyweight: "Bodyweight Curtsy Lunge"
            },
            coachingCues: [
                "Step back and across behind front leg",
                "Like a curtsy or bow",
                "Keep chest up, core tight",
                "Great for glute medius"
            ],
            athleticCarryover: "Hip stability and lateral glute strength",
            indicator: { isIndicator: false }
        },
        
        // ============================================================================
        // UPPER BODY - MOVEMENT-FIRST WITH TOOL VARIATIONS
        // ============================================================================
        
        // Z-PRESS
        dbZPress: {
            name: "DB Z-Press",
            category: "upper-body",
            movementPattern: "vertical-push",
            baseMovement: "overheadPress",
            defaultTool: "db",
            toolVariations: {
                db: "DB Z-Press",
                kb: "KB Z-Press",
                bb: "Barbell Z-Press"
            },
            equipmentMap: {
                full: "Barbell Z-Press",
                commercial: "DB Z-Press",
                minimal: "DB Z-Press",
                bodyweight: "Pike Push-ups"
            },
            coachingCues: [
                "Sit on floor with legs straight out",
                "No back support - core must work",
                "Press weights straight overhead",
                "Great for exposing core weakness"
            ],
            athleticCarryover: "Core stability and pressing strength",
            indicator: { isIndicator: false }
        },
        
        // SHOULDER RAISE COMPLEX
        dbShoulderRaiseComplex: {
            name: "DB Shoulder Raise Complex",
            category: "upper-body",
            movementPattern: "shoulder-isolation",
            baseMovement: "shoulderRaises",
            defaultTool: "db",
            toolVariations: {
                db: "DB Shoulder Raise Complex",
                cable: "Cable Shoulder Raise Complex",
                band: "Band Shoulder Raise Complex"
            },
            equipmentMap: {
                full: "DB Shoulder Raise Complex",
                commercial: "DB Shoulder Raise Complex",
                minimal: "Band Shoulder Raise Complex",
                bodyweight: "Arm Circles (various directions)"
            },
            coachingCues: [
                "Do front raises, lateral raises, then rear raises",
                "Use light weight - shoulders fatigue fast",
                "Control the movement, no swinging",
                "5 reps each direction = 1 set"
            ],
            athleticCarryover: "Shoulder health and balanced development",
            indicator: { isIndicator: false }
        },
        
        // PUSH-UPS
        pushUps: {
            name: "Push-ups",
            category: "upper-body",
            movementPattern: "horizontal-push",
            baseMovement: "pushUp",
            defaultTool: "bodyweight",
            toolVariations: {
                bodyweight: "Push-ups",
                weighted: "Weighted Push-ups",
                band: "Band-Resisted Push-ups"
            },
            equipmentMap: {
                full: "Push-ups",
                commercial: "Push-ups",
                minimal: "Push-ups",
                bodyweight: "Push-ups"
            },
            coachingCues: [
                "Hands slightly wider than shoulders",
                "Lower chest all the way to floor",
                "Keep body in straight line",
                "Push up to full arm extension"
            ],
            athleticCarryover: "Foundational pushing strength",
            indicator: { isIndicator: false }
        },
        
        // INVERTED ROWS
        invertedRows: {
            name: "Inverted Rows",
            category: "upper-body",
            movementPattern: "horizontal-pull",
            baseMovement: "row",
            defaultTool: "bodyweight",
            toolVariations: {
                bodyweight: "Inverted Rows (bar or TRX)",
                trx: "TRX Rows",
                rings: "Ring Rows"
            },
            equipmentMap: {
                full: "Inverted Rows (bar)",
                commercial: "Inverted Rows (Smith machine)",
                minimal: "TRX or Ring Rows",
                bodyweight: "Inverted Rows (table or sturdy bar)"
            },
            coachingCues: [
                "Set up under a bar at waist height",
                "Keep body straight like a plank",
                "Pull chest to the bar",
                "Control the descent"
            ],
            athleticCarryover: "Pulling strength and scapular control",
            indicator: { isIndicator: false }
        },
        
        // KNEELING OVERHEAD PRESS
        dbKneelingOHPress: {
            name: "DB Kneeling Overhead Press",
            category: "upper-body",
            movementPattern: "vertical-push",
            baseMovement: "overheadPress",
            defaultTool: "db",
            toolVariations: {
                db: "DB Kneeling Overhead Press",
                kb: "KB Kneeling Overhead Press",
                bb: "Barbell Kneeling Press"
            },
            equipmentMap: {
                full: "Barbell Kneeling Press",
                commercial: "DB Kneeling Overhead Press",
                minimal: "DB Kneeling Overhead Press",
                bodyweight: "Pike Push-ups"
            },
            coachingCues: [
                "Half-kneeling or tall kneeling position",
                "Eliminates leg drive - pure pressing",
                "Press weights straight overhead",
                "Keep core tight, don't arch back"
            ],
            athleticCarryover: "Core stability with overhead pressing",
            indicator: { isIndicator: false }
        },
        
        // GORILLA ROWS
        kbGorillaRows: {
            name: "KB Gorilla Rows",
            category: "upper-body",
            movementPattern: "horizontal-pull",
            baseMovement: "row",
            defaultTool: "kb",
            toolVariations: {
                kb: "KB Gorilla Rows",
                db: "DB Gorilla Rows"
            },
            equipmentMap: {
                full: "KB Gorilla Rows",
                commercial: "KB Gorilla Rows",
                minimal: "DB Gorilla Rows",
                bodyweight: "Inverted Rows"
            },
            coachingCues: [
                "Wide stance, hinged forward",
                "Two KBs/DBs on ground between feet",
                "Row one weight at a time, alternating",
                "Keep hips and shoulders square"
            ],
            athleticCarryover: "Pulling strength with core anti-rotation",
            indicator: { isIndicator: false }
        },
        
        // ============================================================================
        // ACCESSORIES
        // ============================================================================
        
        calfRaisesDouble: {
            name: "Double Leg Calf Raises",
            category: "lower-accessory",
            movementPattern: "ankle-plantar-flexion",
            baseMovement: "calfRaise",
            defaultTool: "bodyweight",
            toolVariations: {
                bodyweight: "Bodyweight Calf Raises",
                db: "DB Calf Raises",
                bb: "Barbell Calf Raises",
                machine: "Calf Raise Machine"
            },
            equipmentMap: {
                full: "Calf Raise Machine",
                commercial: "DB Calf Raises",
                minimal: "Bodyweight Calf Raises",
                bodyweight: "Bodyweight Calf Raises"
            },
            coachingCues: [
                "Rise up as high as possible",
                "Pause and squeeze at the top",
                "Lower slowly with control",
                "Full range of motion"
            ],
            athleticCarryover: "Calf strength for jumping and running",
            indicator: { isIndicator: false }
        },
        
        wallSits: {
            name: "Wall Sits",
            category: "lower-accessory",
            movementPattern: "isometric-squat",
            defaultTool: "bodyweight",
            coachingCues: [
                "Back flat against wall",
                "Thighs parallel to floor (like sitting in chair)",
                "Knees at 90 degrees",
                "Hold position for time"
            ],
            athleticCarryover: "Quad endurance and mental toughness",
            indicator: { isIndicator: false }
        },
        
        wallTibRaises: {
            name: "Wall Tibialis Raises",
            category: "lower-accessory",
            movementPattern: "ankle-dorsiflexion",
            defaultTool: "bodyweight",
            coachingCues: [
                "Lean back against wall, feet out in front",
                "Lift toes up toward shins",
                "Pause at the top",
                "Lower with control"
            ],
            athleticCarryover: "Shin strength and ankle stability (injury prevention)",
            indicator: { isIndicator: false }
        },
        
        stabilityBallHamstringCurls: {
            name: "Stability Ball Hamstring Curls",
            category: "lower-accessory",
            movementPattern: "knee-flexion",
            defaultTool: "stabilityball",
            toolVariations: {
                stabilityball: "Stability Ball Hamstring Curls",
                slideboard: "Slider Hamstring Curls",
                trx: "TRX Hamstring Curls"
            },
            equipmentMap: {
                full: "Stability Ball Hamstring Curls",
                commercial: "Stability Ball Hamstring Curls",
                minimal: "Slider Hamstring Curls (towel on floor)",
                bodyweight: "Nordic Curl Negatives"
            },
            coachingCues: [
                "Bridge hips up, heels on ball",
                "Curl the ball toward your butt",
                "Keep hips high throughout",
                "Extend legs with control"
            ],
            athleticCarryover: "Hamstring strength in lengthened position",
            indicator: { isIndicator: false }
        },
        
        // ============================================================================
        // CORE
        // ============================================================================
        
        plankElbows: {
            name: "Elbow Plank",
            category: "core",
            movementPattern: "anti-extension",
            defaultTool: "bodyweight",
            coachingCues: [
                "Elbows directly under shoulders",
                "Squeeze glutes and brace abs",
                "Straight line from head to heels",
                "Don't let hips sag or pike up"
            ],
            athleticCarryover: "Core stability and anti-extension strength",
            indicator: { isIndicator: false }
        },
        
        deadbugs: {
            name: "Dead Bugs",
            category: "core",
            movementPattern: "anti-extension",
            defaultTool: "bodyweight",
            coachingCues: [
                "Lie on back, arms up, knees at 90°",
                "Lower opposite arm and leg slowly",
                "Keep lower back pressed into floor",
                "Return and alternate sides"
            ],
            athleticCarryover: "Core control and coordination",
            indicator: { isIndicator: false }
        },
        
        dbLowHighChop: {
            name: "DB Low-to-High Chop",
            category: "core",
            movementPattern: "rotation",
            baseMovement: "woodchop",
            defaultTool: "db",
            toolVariations: {
                db: "DB Low-to-High Chop",
                cable: "Cable Low-to-High Chop",
                band: "Band Low-to-High Chop",
                mb: "Medicine Ball Rotational Throw"
            },
            equipmentMap: {
                full: "Cable Low-to-High Chop",
                commercial: "DB Low-to-High Chop",
                minimal: "Band Low-to-High Chop",
                bodyweight: "Rotational Reaches"
            },
            coachingCues: [
                "Start low on one side",
                "Rotate and lift diagonally across body",
                "Power comes from hips and core",
                "Control the return"
            ],
            athleticCarryover: "Rotational power for throwing, swinging, striking",
            indicator: { isIndicator: false }
        }
    };

    // Load the module
    if (typeof loadExerciseModule === 'function') {
        loadExerciseModule('whiteTemplateExercises', whiteTemplateExercises);
    } else {
        console.error('loadExerciseModule function not available when loading whiteTemplateExercises');
    }
})();
