// ==================== WORKOUT TRACKING SYSTEM ====================
// Add this to app.js for set/rep/weight tracking

// ==================== DATA STRUCTURES ====================

/* 
WORKOUT LOG STRUCTURE:
{
  "user-12345": {
    "2025-12-05": {
      "tier": "white",
      "phase": "earlyOffSeason",
      "week": 1,
      "day": "monday",
      "timestamp": 1733425200000,
      "exercises": {
        "dbSlantboardGobletSquat": {
          "exerciseName": "DB Slantboard Goblet Squat",
          "sets": [
            { "setNumber": 1, "reps": 8, "weight": 35, "rpe": 6, "completed": true },
            { "setNumber": 2, "reps": 8, "weight": 35, "rpe": 6, "completed": true },
            { "setNumber": 3, "reps": 8, "weight": 35, "rpe": 6, "completed": true }
          ],
          "notes": "Felt strong, good depth"
        },
        "dbRomanianDeadlift": {
          "exerciseName": "DB Romanian Deadlift",
          "sets": [
            { "setNumber": 1, "reps": 8, "weight": 50, "rpe": 6, "completed": true },
            { "setNumber": 2, "reps": 8, "weight": 50, "rpe": 6, "completed": true },
            { "setNumber": 3, "reps": 8, "weight": 50, "rpe": 6, "completed": true }
          ],
          "notes": ""
        }
      },
      "completed": false,
      "duration": null
    }
  }
}
*/

// ==================== LOCAL STORAGE MANAGEMENT ====================

const WorkoutTracker = {
  
  STORAGE_KEY: 'athleticTraining_workouts',
  
  // Get user's workout history
  getUserWorkouts(userId = 'default') {
    const allData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    return allData[userId] || {};
  },
  
  // Get specific workout by date
  getWorkout(date, userId = 'default') {
    const userWorkouts = this.getUserWorkouts(userId);
    return userWorkouts[date] || null;
  },
  
  // Get today's workout
  getTodayWorkout(userId = 'default') {
    const today = this.getDateString();
    return this.getWorkout(today, userId);
  },
  
  // Initialize new workout
  initWorkout(tier, phase, week, day, userId = 'default') {
    const date = this.getDateString();
    const workout = {
      tier,
      phase,
      week,
      day,
      timestamp: Date.now(),
      exercises: {},
      completed: false,
      duration: null
    };
    
    this.saveWorkout(date, workout, userId);
    return workout;
  },
  
  // Save workout
  saveWorkout(date, workout, userId = 'default') {
    const allData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    
    if (!allData[userId]) {
      allData[userId] = {};
    }
    
    allData[userId][date] = workout;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allData));
  },
  
  // Log a set
  logSet(exerciseKey, exerciseName, setNumber, reps, weight, rpe = null, userId = 'default') {
    const date = this.getDateString();
    let workout = this.getWorkout(date, userId);
    
    // Create workout if doesn't exist
    if (!workout) {
      workout = this.initWorkout(
        userData.tier,
        userData.phase,
        userData.currentWeek,
        this.getCurrentDay(),
        userId
      );
    }
    
    // Initialize exercise if doesn't exist
    if (!workout.exercises[exerciseKey]) {
      workout.exercises[exerciseKey] = {
        exerciseName: exerciseName,
        sets: [],
        notes: ""
      };
    }
    
    // Find or create set
    const setIndex = workout.exercises[exerciseKey].sets.findIndex(s => s.setNumber === setNumber);
    const setData = {
      setNumber,
      reps: parseInt(reps),
      weight: parseFloat(weight),
      rpe: rpe ? parseInt(rpe) : null,
      completed: true,
      timestamp: Date.now()
    };
    
    if (setIndex >= 0) {
      workout.exercises[exerciseKey].sets[setIndex] = setData;
    } else {
      workout.exercises[exerciseKey].sets.push(setData);
    }
    
    // Sort sets by set number
    workout.exercises[exerciseKey].sets.sort((a, b) => a.setNumber - b.setNumber);
    
    this.saveWorkout(date, workout, userId);
    return workout;
  },
  
  // Add exercise notes
  addExerciseNotes(exerciseKey, notes, userId = 'default') {
    const date = this.getDateString();
    const workout = this.getWorkout(date, userId);
    
    if (workout && workout.exercises[exerciseKey]) {
      workout.exercises[exerciseKey].notes = notes;
      this.saveWorkout(date, workout, userId);
    }
  },
  
  // Mark workout complete
  completeWorkout(userId = 'default') {
    const date = this.getDateString();
    const workout = this.getWorkout(date, userId);
    
    if (workout) {
      workout.completed = true;
      workout.duration = this.calculateDuration(workout.timestamp);
      this.saveWorkout(date, workout, userId);
    }
  },
  
  // Get exercise history (last N workouts for specific exercise)
  getExerciseHistory(exerciseKey, limit = 5, userId = 'default') {
    const workouts = this.getUserWorkouts(userId);
    const history = [];
    
    const sortedDates = Object.keys(workouts).sort().reverse();
    
    for (const date of sortedDates) {
      const workout = workouts[date];
      if (workout.exercises[exerciseKey]) {
        history.push({
          date,
          ...workout.exercises[exerciseKey],
          week: workout.week
        });
        
        if (history.length >= limit) break;
      }
    }
    
    return history;
  },
  
  // Get last weight used for exercise
  getLastWeight(exerciseKey, userId = 'default') {
    const history = this.getExerciseHistory(exerciseKey, 1, userId);
    if (history.length > 0 && history[0].sets.length > 0) {
      return history[0].sets[0].weight;
    }
    return null;
  },
  
  // Calculate suggested weight (last weight + progressive overload)
  getSuggestedWeight(exerciseKey, userId = 'default') {
    const lastWeight = this.getLastWeight(exerciseKey, userId);
    if (!lastWeight) return null;
    
    // Suggest 2.5-5 lb increase depending on exercise category
    const increment = lastWeight < 50 ? 2.5 : 5;
    return lastWeight + increment;
  },
  
  // Helper: Get date string (YYYY-MM-DD)
  getDateString(date = new Date()) {
    return date.toISOString().split('T')[0];
  },
  
  // Helper: Get current day
  getCurrentDay() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  },
  
  // Helper: Calculate duration in minutes
  calculateDuration(startTimestamp) {
    return Math.round((Date.now() - startTimestamp) / 60000);
  },
  
  // Get workout stats
  getStats(userId = 'default') {
    const workouts = this.getUserWorkouts(userId);
    const dates = Object.keys(workouts);
    
    const totalWorkouts = dates.length;
    const completedWorkouts = dates.filter(d => workouts[d].completed).length;
    const totalVolume = this.calculateTotalVolume(workouts);
    
    return {
      totalWorkouts,
      completedWorkouts,
      completionRate: totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0,
      totalVolume,
      recentWorkouts: dates.sort().reverse().slice(0, 10)
    };
  },
  
  // Calculate total volume (sets × reps × weight)
  calculateTotalVolume(workouts) {
    let volume = 0;
    
    Object.values(workouts).forEach(workout => {
      Object.values(workout.exercises).forEach(exercise => {
        exercise.sets.forEach(set => {
          if (set.completed) {
            volume += set.reps * set.weight;
          }
        });
      });
    });
    
    return volume;
  },
  
  // Export data (for backup or analysis)
  exportData(userId = 'default') {
    const data = this.getUserWorkouts(userId);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workout-data-${userId}-${this.getDateString()}.json`;
    a.click();
  },
  
  // Import data
  importData(jsonData, userId = 'default') {
    try {
      const data = JSON.parse(jsonData);
      const allData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      allData[userId] = { ...allData[userId], ...data };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allData));
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  },
  
  // Clear all data (dangerous!)
  clearAll(userId = 'default') {
    if (confirm('Are you sure you want to delete all workout data? This cannot be undone.')) {
      const allData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      delete allData[userId];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allData));
      return true;
    }
    return false;
  }
};

// ==================== USAGE EXAMPLES ====================

/*

// Log a set:
WorkoutTracker.logSet('dbSlantboardGobletSquat', 'DB Slantboard Goblet Squat', 1, 8, 35, 6);

// Get last weight used:
const lastWeight = WorkoutTracker.getLastWeight('dbSlantboardGobletSquat');
console.log(`Last used: ${lastWeight} lbs`);

// Get exercise history:
const history = WorkoutTracker.getExerciseHistory('dbSlantboardGobletSquat', 5);
console.log('Last 5 workouts:', history);

// Get suggested weight:
const suggested = WorkoutTracker.getSuggestedWeight('dbSlantboardGobletSquat');
console.log(`Try ${suggested} lbs next time!`);

// Get stats:
const stats = WorkoutTracker.getStats();
console.log(`Completed ${stats.completedWorkouts} of ${stats.totalWorkouts} workouts`);

// Export data:
WorkoutTracker.exportData(); // Downloads JSON file

*/

// ==================== INTEGRATION WITH EXISTING APP ====================

// Call this when exercise card is rendered to show tracking UI
function addTrackingToExercise(exerciseKey, exerciseName, prescribedSets, prescribedReps) {
  const history = WorkoutTracker.getExerciseHistory(exerciseKey, 1);
  const lastWeight = WorkoutTracker.getLastWeight(exerciseKey);
  const suggestedWeight = WorkoutTracker.getSuggestedWeight(exerciseKey);
  
  return {
    history,
    lastWeight,
    suggestedWeight,
    prescribedSets,
    prescribedReps
  };
}
