export const ADD_PERSON= 'ADD_PERSON';
export const DELETE_PERSON= 'DELETE_PERSON';
export const MEMORY= 'MEMORY';

export function addPerson(person) {
    return {
        type: ADD_PERSON,
        payload: person
    }
}

export function deletePerson(person) {
    return {
        type: DELETE_PERSON,
        payload: person
    }
}

export function memory(person) {
    return {
        type: MEMORY,
        payload: person
    }
}
