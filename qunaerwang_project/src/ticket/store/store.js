import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

import { getTodayFirstTime } from "../../common/tools/timeTools";

export default createStore(
    combineReducers(reducers),
    {
        departState: null,
        arriveState: null,
        departDate: getTodayFirstTime(Date.now()),
        arriveDate: getTodayFirstTime(Date.now()),
        trainNumber: null,
        isShowTimetable: false,
        departTimeStr: null,
        arriveTimeStr: null,
        durationStr: null,
        tickets: [],
        searchParsed: false,
    },
    applyMiddleware(thunk)
);