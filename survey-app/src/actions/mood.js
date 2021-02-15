export const ADD_MOOD= 'ADD_MOOD';
export const DELETE_MOOD = 'DELETE_MOOD';

export function addMood(mood) {
    return {
        type: ADD_MOOD,
        payload: { mood }
    }
}

export function deleteMood(mood) {
    return {
        type: DELETE_MOOD,
        payload: { mood }
    }
}