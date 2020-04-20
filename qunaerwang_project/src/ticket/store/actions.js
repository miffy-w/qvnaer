export const ACTION_SET_DEPART_STATE = "ACTION_SET_DEPART_STATE";
export const ACTION_SET_ARRIVE_STATE = "ACTION_SET_ARRIVE_STATE";
export const ACTION_SET_DEPART_DATE = "ACTION_SET_DEPART_DATE";
export const ACTION_SET_ARRIVE_DATE = "ACTION_SET_ARRIVE_DATE";
export const ACTION_SET_TRAIN_NUMBER = "ACTION_SET_TRAIN_NUMBER";
export const ACTION_SET_IS_SHOW_TIMETABLE = "ACTION_SET_IS_SHOW_TIMETABLE";
export const ACTION_SET_DEPART_TIME_STR = "ACTION_SET_DEPART_TIME_STR";
export const ACTION_SET_ARRIVE_TIME_STR = "ACTION_SET_ARRIVE_TIME_STR";
export const ACTION_SET_DURATION_STR = "ACTION_SET_DURATION_STR";
export const ACTION_SET_TICKETS = "ACTION_SET_TICKETS";
export const ACTION_SET_SEARCH_PARSED = "ACTION_SET_SEARCH_PARSED";

export function setDepartState(departState){
    return {
        type: ACTION_SET_DEPART_STATE,
        payload: departState,
    }
}
export function setArriveState(arriveState){
    return {
        type: ACTION_SET_ARRIVE_STATE,
        payload: arriveState,
    }
}
export function setDepartDate(departDate){
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    }
}
export function setArriveDate(arriveDate){
    return {
        type: ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    }
}
export function setTrainNumber(trainNumber){
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    }
}
export function setIsShowTimetable(isShowTimetable){
    return {
        type: ACTION_SET_IS_SHOW_TIMETABLE,
        payload: isShowTimetable,
    }
}
export function toggleShowTimetable(){
    return (dispatch, getState) => {
        const { isShowTimetable } = getState();
        dispatch(setIsShowTimetable(!isShowTimetable));
    }
}

export function setDepartTimeStr(departTimeStr){
    return {
        type: ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    }
}
export function setArriveTimeStr(arriveTimeStr){
    return {
        type: ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    }
}
export function setDurationStr(durationStr){
    return {
        type: ACTION_SET_DURATION_STR,
        payload: durationStr,
    }
}
export function setTickets(tickets){
    return {
        type: ACTION_SET_TICKETS,
        payload: tickets,
    }
}
export function setSearchParsed(searchParsed){
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    }
}