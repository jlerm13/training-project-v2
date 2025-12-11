// exercises/whiteTemplateExercises.js - White Tier Template Exercises
// Architecture: Movement-first with equipment-based variations
// Updated: Variations arrays derived from equipmentMap for UI compatibility
// ============================================================================

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
            variations: [
                "Squat to Stands",
                "Squat to Stands (holding wall)",
                "Squat to Stands (hands on knees)"
            ],
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
            variations: [
                "World's Greatest Stretch",
                "World's Greatest Stretch (no rotation)",
                "World's Greatest Stretch (hands elevated)"
            ],
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
            variations: [
                "Shoulder Taps",
                "Shoulder Taps (from knees)",
                "Shoulder Taps (feet wide)"
            ],
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
            variations: [
                "Jump Rope (Double Foot)",
                "Jumping Jacks",
                "High Knees in Place",
                "Seal Jacks"
            ],
            equipmentMap: {
                full: "Jump Rope (Double Foot)",
                commercial: "Jump Rope (Double Foot)",
                minimal: "Jumping Jacks",
                bodyweight: "High Knees in Place"
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
            variations: [
                "Squat to Forward Fold",
                "Squat to Forward Fold (hands on shins)",
                "Squat to Forward Fold (using wall)"
            ],
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
            variations: [
                "Hip 90/90 with Reach",
                "Hip 90/90 (no reach)",
                "Hip 90/90 Transitions"
            ],
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
            variations: [
                "Downward Dog Toe Tap",
                "Downward Dog Hold",
                "Downward Dog with Calf Pedal"
            ],
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
        // LOWER BODY EXERCISES
        // ============================================================================
        
        dbSlantboardGobletSquat: {
            name: "DB Slantboard Goblet Squat",
            category: "lower-body",
            movementPattern: "squat",
            baseMovement: "gobletSquat",
            defaultTool: "db",
            variations: [
                "DB Slantboard Goblet Squat",
                "KB Slantboard Goblet Squat",
                "DB Goblet Squat (heels elevated)",
                "Goblet Squat (plates under heels)",
                "Bodyweight Squat (heels elevated)"
            ],
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
        
        dbRDL: {
            name: "DB Romanian Deadlift",
            category: "lower-body",
            movementPattern: "hip-hinge",
            baseMovement: "romanianDeadlift",
            defaultTool: "db",
            variations: [
                "DB Romanian Deadlift",
                "KB Romanian Deadlift",
                "Barbell Romanian Deadlift",
                "Single-Leg RDL (bodyweight)",
                "Single DB Romanian Deadlift"
            ],
            equipmentMap: {
                full: "Barbell Romanian Deadlift",
                commercial: "DB Romanian Deadlift",
                minimal: "DB Romanian Deadlift",
                bodyweight: "Single-Leg RDL (bodyweight)"
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
        
        dbReverseLunge: {
            name: "DB Reverse Lunge",
            category: "lower-body",
            movementPattern: "lunge",
            baseMovement: "reverseLunge",
            defaultTool: "db",
            variations: [
                "DB Reverse Lunge",
                "KB Reverse Lunge (goblet)",
                "KB Reverse Lunge (rack position)",
                "Barbell Reverse Lunge",
                "Bodyweight Reverse Lunge"
            ],
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
        
        dbLateralLunge: {
            name: "DB Lateral Lunge",
            category: "lower-body",
            movementPattern: "lateral-lunge",
            baseMovement: "lateralLunge",
            defaultTool: "db",
            variations: [
                "DB Lateral Lunge",
                "KB Lateral Lunge (goblet)",
                "Barbell Lateral Lunge",
                "Bodyweight Lateral Lunge",
                "Slider Lateral Lunge"
            ],
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
        
        dbWalkingLunges: {
            name: "DB Walking Lunges",
            category: "lower-body",
            movementPattern: "lunge",
            baseMovement: "walkingLunge",
            defaultTool: "db",
            variations: [
                "DB Walking Lunges",
                "KB Walking Lunges (goblet)",
                "KB Walking Lunges (rack position)",
                "Barbell Walking Lunges",
                "Bodyweight Walking Lunges"
            ],
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
        
        dbKbSwings: {
            name: "DB/KB Swings",
            category: "lower-body",
            movementPattern: "hip-hinge-ballistic",
            baseMovement: "kettlebellSwing",
            defaultTool: "kb",
            variations: [
                "Kettlebell Swings (two-hand)",
                "Kettlebell Swings (one-hand)",
                "Dumbbell Swings",
                "Banded Hip Hinges (fast)",
                "Explosive Hip Hinges (bodyweight)"
            ],
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
        
        dbStepDowns: {
            name: "DB Step Downs",
            category: "lower-body",
            movementPattern: "step-eccentric",
            baseMovement: "stepDown",
            defaultTool: "db",
            variations: [
                "DB Step Downs",
                "KB Step Downs (goblet)",
                "Bodyweight Step Downs",
                "Slow Eccentric Step Downs",
                "Step Downs (lower box)"
            ],
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
        
        dbCurtsyLunge: {
            name: "DB Curtsy Lunge",
            category: "lower-body",
            movementPattern: "lunge-rotational",
            baseMovement: "curtsyLunge",
            defaultTool: "db",
            variations: [
                "DB Curtsy Lunge",
                "KB Curtsy Lunge (goblet)",
                "Barbell Curtsy Lunge",
                "Bodyweight Curtsy Lunge",
                "Curtsy Lunge to Lateral Lunge"
            ],
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
        // UPPER BODY EXERCISES
        // ============================================================================
        
        dbBenchPress: {
            name: "DB Bench Press",
            category: "upper-body",
            movementPattern: "horizontal-push",
            baseMovement: "benchPress",
            defaultTool: "db",
            variations: [
                "DB Bench Press",
                "DB Bench Press (neutral grip)",
                "Alternating DB Bench Press",
                "DB Floor Press",
                "Push-ups (weighted)",
                "Push-ups (bodyweight)"
            ],
            equipmentMap: {
                full: "DB Bench Press",
                commercial: "DB Bench Press",
                minimal: "DB Floor Press",
                bodyweight: "Push-ups"
            },
            coachingCues: [
                "Lower slowly to chest",
                "Press straight up",
                "Keep shoulder blades squeezed together",
                "Feet flat on floor"
            ],
            athleticCarryover: "Horizontal pushing strength",
            indicator: { isIndicator: false }
        },
        
        dbRows: {
            name: "DB Rows",
            category: "upper-body",
            movementPattern: "horizontal-pull",
            baseMovement: "row",
            defaultTool: "db",
            variations: [
                "DB Rows (one-arm)",
                "DB Rows (chest-supported)",
                "KB Rows",
                "Barbell Rows",
                "Inverted Rows",
                "Band Rows"
            ],
            equipmentMap: {
                full: "DB Rows (one-arm)",
                commercial: "DB Rows (one-arm)",
                minimal: "DB Rows (one-arm)",
                bodyweight: "Inverted Rows"
            },
            coachingCues: [
                "Place other hand on bench for support",
                "Pull weight to your side/hip",
                "Squeeze shoulder blade at top",
                "Control the descent"
            ],
            athleticCarryover: "Pulling strength and back development",
            indicator: { isIndicator: false }
        },
        
        dbZPress: {
            name: "DB Z-Press",
            category: "upper-body",
            movementPattern: "vertical-push",
            baseMovement: "overheadPress",
            defaultTool: "db",
            variations: [
                "DB Z-Press",
                "KB Z-Press",
                "Barbell Z-Press",
                "DB Seated Press (on bench)",
                "Pike Push-ups"
            ],
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
        
        dbShoulderRaiseComplex: {
            name: "DB Shoulder Raise Complex",
            category: "upper-body",
            movementPattern: "shoulder-isolation",
            baseMovement: "shoulderRaises",
            defaultTool: "db",
            variations: [
                "DB Shoulder Raise Complex",
                "Cable Shoulder Raise Complex",
                "Band Shoulder Raise Complex",
                "Plate Shoulder Raise Complex",
                "Arm Circles (various directions)"
            ],
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
        
        pushUps: {
            name: "Push-ups",
            category: "upper-body",
            movementPattern: "horizontal-push",
            baseMovement: "pushUp",
            defaultTool: "bodyweight",
            variations: [
                "Push-ups (standard)",
                "Push-ups (hands elevated)",
                "Push-ups (feet elevated)",
                "Push-ups (knees)",
                "Diamond Push-ups",
                "Wide Push-ups"
            ],
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
        
        invertedRows: {
            name: "Inverted Rows",
            category: "upper-body",
            movementPattern: "horizontal-pull",
            baseMovement: "row",
            defaultTool: "bodyweight",
            variations: [
                "Inverted Rows (bar)",
                "Inverted Rows (TRX/rings)",
                "Inverted Rows (underhand grip)",
                "Inverted Rows (feet elevated)",
                "Inverted Rows (knees bent - easier)"
            ],
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
        
        dbKneelingOHPress: {
            name: "DB Kneeling Overhead Press",
            category: "upper-body",
            movementPattern: "vertical-push",
            baseMovement: "overheadPress",
            defaultTool: "db",
            variations: [
                "DB Kneeling Overhead Press",
                "KB Kneeling Overhead Press",
                "DB Half-Kneeling Press (one knee)",
                "Barbell Kneeling Press",
                "Pike Push-ups",
                "Wall Handstand Hold"
            ],
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
        
        kbGorillaRows: {
            name: "KB Gorilla Rows",
            category: "upper-body",
            movementPattern: "horizontal-pull",
            baseMovement: "row",
            defaultTool: "kb",
            variations: [
                "KB Gorilla Rows",
                "DB Gorilla Rows",
                "KB Gorilla Rows (pause at top)",
                "Renegade Rows",
                "Bent-Over DB Rows (both arms)"
            ],
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
        // LOWER BODY ACCESSORIES
        // ============================================================================
        
        calfRaisesDouble: {
            name: "Double Leg Calf Raises",
            category: "lower-accessory",
            movementPattern: "ankle-plantar-flexion",
            baseMovement: "calfRaise",
            defaultTool: "bodyweight",
            variations: [
                "Calf Raises (bodyweight)",
                "Calf Raises (DB in hands)",
                "Calf Raises (machine)",
                "Single-Leg Calf Raises",
                "Seated Calf Raises"
            ],
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
            variations: [
                "Wall Sits",
                "Wall Sits (single leg)",
                "Wall Sits (with weight on lap)",
                "Wall Sits (marching)"
            ],
            equipmentMap: {
                full: "Wall Sits (with weight)",
                commercial: "Wall Sits",
                minimal: "Wall Sits",
                bodyweight: "Wall Sits"
            },
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
            variations: [
                "Wall Tibialis Raises",
                "Seated Tibialis Raises",
                "Tib Bar Raises",
                "Banded Tibialis Raises"
            ],
            equipmentMap: {
                full: "Tib Bar Raises",
                commercial: "Wall Tibialis Raises",
                minimal: "Wall Tibialis Raises",
                bodyweight: "Wall Tibialis Raises"
            },
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
            variations: [
                "Stability Ball Hamstring Curls",
                "Stability Ball Hamstring Curls (single leg)",
                "Slider Hamstring Curls",
                "TRX Hamstring Curls",
                "Nordic Curl Negatives"
            ],
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
        // CORE EXERCISES
        // ============================================================================
        
        plankElbows: {
            name: "Elbow Plank",
            category: "core",
            movementPattern: "anti-extension",
            defaultTool: "bodyweight",
            variations: [
                "Elbow Plank",
                "High Plank (hands)",
                "Plank with Shoulder Taps",
                "Plank (from knees)",
                "RKC Plank (max tension)"
            ],
            equipmentMap: {
                full: "Elbow Plank",
                commercial: "Elbow Plank",
                minimal: "Elbow Plank",
                bodyweight: "Elbow Plank"
            },
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
            variations: [
                "Dead Bugs",
                "Dead Bugs (arms only)",
                "Dead Bugs (legs only)",
                "Dead Bugs (with band)",
                "Dead Bugs (with weight)"
            ],
            equipmentMap: {
                full: "Dead Bugs (with weight)",
                commercial: "Dead Bugs",
                minimal: "Dead Bugs",
                bodyweight: "Dead Bugs"
            },
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
            variations: [
                "DB Low-to-High Chop",
                "Cable Low-to-High Chop",
                "Band Low-to-High Chop",
                "Medicine Ball Rotational Throw",
                "Rotational Reaches (bodyweight)"
            ],
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
        },
        
        sidePlank: {
            name: "Side Plank",
            category: "core",
            movementPattern: "anti-lateral-flexion",
            defaultTool: "bodyweight",
            variations: [
                "Side Plank (elbow)",
                "Side Plank (hand)",
                "Side Plank (from knees)",
                "Side Plank with Hip Dips",
                "Side Plank with Reach Through"
            ],
            equipmentMap: {
                full: "Side Plank",
                commercial: "Side Plank",
                minimal: "Side Plank",
                bodyweight: "Side Plank"
            },
            coachingCues: [
                "Stack feet or stagger for balance",
                "Lift hips to form straight line",
                "Keep top hip stacked over bottom hip",
                "Don't let hips sag forward or back"
            ],
            athleticCarryover: "Lateral core stability",
            indicator: { isIndicator: false }
        },
        
        trxKneeTuck: {
            name: "TRX Knee Tucks",
            category: "core",
            movementPattern: "hip-flexion-anti-extension",
            defaultTool: "trx",
            variations: [
                "TRX Knee Tucks",
                "TRX Pike",
                "Stability Ball Knee Tucks",
                "Slider Knee Tucks",
                "Mountain Climbers (slow)"
            ],
            equipmentMap: {
                full: "TRX Knee Tucks",
                commercial: "TRX Knee Tucks",
                minimal: "Slider Knee Tucks",
                bodyweight: "Mountain Climbers (slow)"
            },
            coachingCues: [
                "Start in plank with feet in straps",
                "Pull knees toward chest",
                "Keep hips level, don't pike up",
                "Extend back to plank with control"
            ],
            athleticCarryover: "Dynamic core control",
            indicator: { isIndicator: false }
        },
        
        pallofPressHold: {
            name: "Pallof Press Holds",
            category: "core",
            movementPattern: "anti-rotation",
            defaultTool: "band",
            variations: [
                "Pallof Press Holds (band)",
                "Pallof Press Holds (cable)",
                "Pallof Press (with press out)",
                "Pallof Press (tall kneeling)",
                "Pallof Press (half kneeling)"
            ],
            equipmentMap: {
                full: "Pallof Press Holds (cable)",
                commercial: "Pallof Press Holds (cable)",
                minimal: "Pallof Press Holds (band)",
                bodyweight: "Plank with Reach (anti-rotation)"
            },
            coachingCues: [
                "Stand perpendicular to cable/band",
                "Press hands straight out from chest",
                "Resist rotation toward the anchor",
                "Hold position, keep breathing"
            ],
            athleticCarryover: "Anti-rotation strength for contact sports",
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
