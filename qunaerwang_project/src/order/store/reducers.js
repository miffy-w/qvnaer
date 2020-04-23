import {
    ACTION_SET_DEP_STATION,
    ACTION_SET_ARR_STATION,
    ACTION_SET_DEP_TIME,
    ACTION_SET_ARR_TIME,
    ACTION_SET_DEP_DATE,
    ACTION_SET_ARR_DATE,
    ACTION_SET_TRAIN_NUMBER,
    ACTION_SET_DURATION,
    ACTION_SET_TICKET_TYPE,
    ACTION_SET_MEMEBERS,
    ACTION_SET_IS_SHOW_ADD_PERSON,
    ACTION_SET_IS_SHOW_MEAL_FRAME,
    ACTION_SET_IS_SHOW_CERTIFICATE_FRAME,
    ACTION_SET_IS_SHOW_AMOUNT_DETAILS_FRAME,
    ACTION_SET_SEAT_TYPE,
    ACTION_SET_NOW_LIST,
} from "./actions";

export default {
    depStation(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_DEP_STATION:
                return payload;
            default: return state;
        }
    },
    arrStation(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_ARR_STATION:
                return payload;
            default: return state;
        }
    },
    depTime(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_DEP_TIME:
                return payload;
            default: return state;
        }
    },
    arrTime(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_ARR_TIME:
                return payload;
            default: return state;
        }
    },
    depDate(state = Date.now(), action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_DEP_DATE:
                return payload;
            default: return state;
        }
    },
    arrDate(state = Date.now(), action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_ARR_DATE:
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
    duration(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_DURATION:
                return payload;
            default: return state;
        }
    },
    ticketType(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_TICKET_TYPE:
                return payload;
            default: return state;
        }
    },
    memebers(state = [], action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_MEMEBERS:
                return payload;
            default: return state;
        }
    },
    isShowAddPerson(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_IS_SHOW_ADD_PERSON:
                return payload;
            default: return state;
        }
    },
    isShowMealFrame(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_IS_SHOW_MEAL_FRAME:
                return payload;
            default: return state;
        }
    },
    isShowCertificateFrame(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_IS_SHOW_CERTIFICATE_FRAME:
                return payload;
            default: return state;
        }
    },
    isShowAmountDetailsFrame(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_IS_SHOW_AMOUNT_DETAILS_FRAME:
                return payload;
            default: return state;
        }
    },
    seatType(state = null, action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_SEAT_TYPE: 
                return payload;
            default: return state;
        }
    },
    nowList(state = [], action){
        const { type, payload } = action;
        switch(type){
            case ACTION_SET_NOW_LIST: 
                return payload;
            default: return state;
        }
    }
};