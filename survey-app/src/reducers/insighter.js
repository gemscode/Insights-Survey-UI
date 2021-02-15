import  { ADD_PERSON }  from '../actions/insighter';
import  { DELETE_PERSON }  from '../actions/insighter';
import  { MEMORY }  from '../actions/insighter';

const initialState = {
    person: {
        id: '',
        name: '',
        img: ''
    },
    memory: {
        id: '',
        name: '',
        img: ''
    },
}

export default function(state=initialState, action) {
    switch (action.type) {
        case ADD_PERSON: {
            return { ...state, person: action.payload }
        }

        case DELETE_PERSON: {
            return { ...state, person: { id: '', name: '', img: ''} }
        }

        default:
            return state;
    }
}