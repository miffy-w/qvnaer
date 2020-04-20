import {
    ACTION_SET_DEPART_STATE,
    ACTION_SET_ARRIVE_STATE,
    ACTION_SET_DEPART_DATE,
    ACTION_SET_ARRIVE_DATE,
    ACTION_SET_TRAIN_NUMBER,
    ACTION_SET_IS_SHOW_TIMETABLE,
    ACTION_SET_DEPART_TIME_STR,
    ACTION_SET_ARRIVE_TIME_STR,
    ACTION_SET_DURATION_STR,
    ACTION_SET_TICKETS,
    ACTION_SET_SEARCH_PARSED,
} from "./actions";

export default {
    departState(state = Date.now(), action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_DEPART_STATE:
                return payload;
            default: return state;
        }
    },
    arriveState(state = Date.now(), action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_ARRIVE_STATE:
                return payload;
            default: return state;
        }
    },
    departDate(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_DEPART_DATE:
                return payload;
            default: return state;
        }
    },
    arriveDate(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_ARRIVE_DATE:
                return payload;
            default: return state;
        }
    },
    trainNumber(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_TRAIN_NUMBER:
                return payload;
            default: return state;
        }
    },
    departTimeStr(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_DEPART_TIME_STR:
                return payload;
            default: return state;
        }
    },
    arriveTimeStr(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_ARRIVE_TIME_STR:
                return payload;
            default: return state;
        }
    },
    durationStr(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_DURATION_STR:
                return payload;
            default: return state;
        }
    },
    tickets(state = [], action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_TICKETS:
                return payload;
            default: return state;
        }
    },
    isShowTimetable(state = false, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_IS_SHOW_TIMETABLE:
                return payload;
            default: return state;
        }
    },
    searchParsed(state = false, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_SEARCH_PARSED:
                return payload;
            default: return state;
        }
    },
};