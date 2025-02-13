export const parseWorkoutInput = async (input) => {
    // For now, return a simple object with the input as description
    return {
        date: new Date(),
        workoutSplit: 'General',
        exerciseName: 'Workout',
        muscleGroup: '',
        sets: '',
        reps: '',
        weight: '',
        notes: input
    };
};

export const formatWorkoutData = (data) => {
    return {
        ...data,
        date: data.date instanceof Date ? data.date : new Date(data.date)
    };
}; 