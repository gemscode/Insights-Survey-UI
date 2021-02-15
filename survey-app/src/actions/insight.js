export const ADD_INSIGHT= 'ADD_INSIGHT';
export const UPDATE_INSIGHT= 'UPDATE_INSIGHT';
export const DELETE_INSIGHT= 'DELETE_INSIGHT';

export function addInsight(insight) {
    return {
        type: ADD_INSIGHT,
        payload: { insight }
    }
}

export function updateInsight(insight) {
    return {
        type: UPDATE_INSIGHT,
        payload: { insight }
    }
}

export function deleteInsight(insight) {
    return {
        type: DELETE_INSIGHT,
        payload: { insight }
    }
}