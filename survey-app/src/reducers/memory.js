import  { ADD_MEMORY }  from '../actions/memory';
import  { DELETE_MEMORY }  from '../actions/memory';

const initialState = {
    object: '',
}

export default function(state=initialState, action) {
    switch (action.type) {
        case ADD_MEMORY: {
            return { ...state, object: action.payload }
        }

        case DELETE_MEMORY: {
            return { ...state, object: '' }
        }

        default:
            return state;
    }
}