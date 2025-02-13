/**
 * Service to handle workout data processing and API interactions
 */

/**
 * Parses natural language workout descriptions into structured workout data
 * TODO: Integrate with OpenAI API
 * - Add API key to environment variables
 * - Use fetch/axios to make API calls
 * - Implement proper error handling
 * - Add rate limiting and caching
 * 
 * Example OpenAI API call:
 * const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
 *   },
 *   body: JSON.stringify({
 *     model: "gpt-3.5-turbo",
 *     messages: [{
 *       role: "user",
 *       content: `Parse this workout: ${inputText}`
 *     }],
 *     temperature: 0.7
 *   })
 * });
 * 
 * @param {string} inputText - The natural language workout description
 * @returns {Promise<Object>} Structured workout data
 */
export const parseWorkoutInput = async (inputText) => {
    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, return dummy data
    // In the future, this will be replaced with actual API response parsing
    return {
        date: new Date(), // Ensure we return a Date object
        workoutSplit: determineWorkoutSplit(inputText),
        exerciseName: "Bench Press",
        muscleGroup: "Chest",
        sets: 10,
        reps: 12,
        weight: 1000,
        notes: "Auto-parsed workout entry"
    };
};

/**
 * Helper function to determine workout split based on keywords
 * @param {string} inputText 
 * @returns {string}
 */
const determineWorkoutSplit = (inputText) => {
    const text = inputText.toLowerCase();
    
    if (text.includes('push') || text.includes('chest') || text.includes('shoulder')) {
        return 'Push';
    } else if (text.includes('pull') || text.includes('back') || text.includes('bicep')) {
        return 'Pull';
    } else if (text.includes('leg') || text.includes('squat')) {
        return 'Legs';
    } else {
        return 'Push'; // Default value
    }
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