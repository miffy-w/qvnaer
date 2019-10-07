import { combineReducers } from 'redux';
import { types } from './actions';
import { parseDate } from '../../common/tools/timeTools';

function cityQueryReducer(state = {
    cityObj: {
        fromCity: "北京",
        toCity: "上海",
        date: parseDate(),
        searchType: false,
    },
},action){
    
    switch(action.type){
        case types.INIT_QUERY_STRING: 
            return {
                cityObj: action.queryObject
            }
        default: return state;
    }
}

function trainQueryReducer(state = {
    trainsData: [],
},action){
    switch(action.type){
        default: return state
    }
}

export default combineReducers({
    cityQueryReducer,
    trainQueryReducer,
});