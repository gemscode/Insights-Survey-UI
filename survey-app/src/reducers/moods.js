import  { ADD_MOOD }  from '../actions/mood';
import  { DELETE_MOOD }  from '../actions/mood';

const initialState = {
    moodList: []
}

export default function(state=initialState, action) {
    switch (action.type) {
        case ADD_MOOD: {
            return {
                ...state,
                moodList: [...state.moodList, action.payload]
            }
        }

        case DELETE_MOOD: {
            return {
                ...state,
                moodList: state.moodList.filter(item => item.mood.id !== action.payload.mood.id)
            }
        }

        default:
            return state;
    }
}