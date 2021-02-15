export const ADD_MEMORY= 'ADD_MEMORY';
export const DELETE_MEMORY= 'DELETE_MEMORY';

export function addMemory(object) {
    return {
        type: ADD_MEMORY,
        payload: object
    }
}

export function deleteMemory(object) {
    return {
        type: DELETE_MEMORY,
        payload: object
    }
}
