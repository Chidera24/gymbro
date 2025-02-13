/**
 * Parses natural language workout descriptions into structured workout data
 * @param {string} input - The natural language workout description
 * @returns {Object} Structured workout data
 */
export const parseWorkoutInput = async (input) => {
    // This is a basic implementation. In a real app, you might want to use
    // NLP libraries or AI services for more accurate parsing
    const lowercaseInput = input.toLowerCase();
    
    // Default return object
    const workoutData = {
        date: new Date(),
        workoutSplit: '',
        exerciseName: '',
        muscleGroup: '',
        sets: '',
        reps: '',
        weight: '',
        notes: ''
    };

    // Basic pattern matching for workout split
    if (lowercaseInput.includes('leg day')) {
        workoutData.workoutSplit = 'Legs';
        workoutData.muscleGroup = 'Legs';
    } else if (lowercaseInput.includes('upper body')) {
        workoutData.workoutSplit = 'Upper Body';
    } else if (lowercaseInput.includes('push')) {
        workoutData.workoutSplit = 'Push';
    } else if (lowercaseInput.includes('pull')) {
        workoutData.workoutSplit = 'Pull';
    }

    // Extract numbers for sets, reps, and weight
    const numbers = lowercaseInput.match(/\d+/g) || [];
    if (numbers.length >= 3) {
        workoutData.sets = numbers[0];
        workoutData.reps = numbers[1];
        workoutData.weight = numbers[2];
    }

    // Extract exercise name (this is a simple implementation)
    const commonExercises = [
        'bench press', 'squat', 'deadlift', 'shoulder press',
        'bicep curl', 'tricep extension', 'leg press', 'pull up',
        'push up', 'row'
    ];

    for (const exercise of commonExercises) {
        if (lowercaseInput.includes(exercise)) {
            workoutData.exerciseName = exercise;
            break;
        }
    }

    // If we found an exercise but no split, try to determine the split
    if (workoutData.exerciseName && !workoutData.workoutSplit) {
        if (['bench press', 'shoulder press', 'tricep extension', 'push up'].includes(workoutData.exerciseName)) {
            workoutData.workoutSplit = 'Push';
        } else if (['pull up', 'row', 'bicep curl'].includes(workoutData.exerciseName)) {
            workoutData.workoutSplit = 'Pull';
        } else if (['squat', 'deadlift', 'leg press'].includes(workoutData.exerciseName)) {
            workoutData.workoutSplit = 'Legs';
        }
    }

    // Extract any additional notes (everything after "note" or "notes")
    const noteMatch = lowercaseInput.match(/(?:note|notes?):?\s*(.+)$/i);
    if (noteMatch) {
        workoutData.notes = noteMatch[1].trim();
    }

    return workoutData;
};

/**
 * Formats the workout data into a readable string
 * @param {Object} workoutData - The structured workout data
 * @returns {string} A formatted string describing the workout
 */
export const formatWorkoutData = (workoutData) => {
    const parts = [];
    
    if (workoutData.workoutSplit) {
        parts.push(`${workoutData.workoutSplit} day`);
    }
    
    if (workoutData.exerciseName) {
        let exerciseDescription = workoutData.exerciseName;
        if (workoutData.sets && workoutData.reps) {
            exerciseDescription += ` - ${workoutData.sets}x${workoutData.reps}`;
        }
        if (workoutData.weight) {
            exerciseDescription += ` @ ${workoutData.weight}lbs`;
        }
        parts.push(exerciseDescription);
    }
    
    if (workoutData.notes) {
        parts.push(`Note: ${workoutData.notes}`);
    }
    
    return parts.join('\n');
}; 