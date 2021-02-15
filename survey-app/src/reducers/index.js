import { combineReducers } from 'redux';
import insightsReducer from './insights';
import moodsReducer from './moods';
import insighterReducer from './insighter';
import memoryReducer from './memory';
import { reducer as formReducer } from 'redux-form';

const allReducers = {
    insights: insightsReducer,
    moods: moodsReducer,
    insighter: insighterReducer,
    memory: memoryReducer,
    form: formReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;