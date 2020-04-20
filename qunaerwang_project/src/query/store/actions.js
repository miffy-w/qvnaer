import { ORDER_DEPART, ORDER_DEPARTION } from "../contains";
import { getTodayFirstTime } from "../../common/tools/timeTools";

export const ACTION_SET_FROM = "ACTION_SET_FROM";
export const ACTION_SET_TO = "ACTION_SET_TO";
export const ACTION_SET_DEPART_DATE = "ACTION_SET_DEPART_DATE";
export const ACTION_SET_HIGH_SPEED = "ACTION_SET_HIGH_SPEED";
export const ACTION_SET_TRAIN_LIST = "ACTION_SET_TRAIN_LIST";
export const ACTION_SET_ORDER_TYPE = "ACTION_SET_ORDER_TYPE";
export const ACTION_SET_ONLY_TICKETS = "ACTION_SET_ONLY_TICKETS";
export const ACTION_SET_TICKET_TYPES = "ACTION_SET_TICKET_TYPES";
export const ACTION_SET_CHECKED_TICKET_TYPES = "ACTION_SET_CHECKED_TICKET_TYPES";
export const ACTION_SET_TRAIN_TYPES = "ACTION_SET_TRAIN_TYPES";
export const ACTION_SET_CHECKED_TRAIN_TYPES = "ACTION_SET_CHECKED_TRAIN_TYPES";
export const ACTION_SET_DEPAR_STATIONS = "ACTION_SET_DEPAR_STATIONS";
export const ACTION_SET_CHECKED_DEPART_STATIONS = "ACTION_SET_CHECKED_DEPART_STATIONS";
export const ACTION_SET_ARRIVE_STATIONS = "ACTION_SET_ARRIVE_STATIONS";
export const ACTION_SET_CHECKED_ARRIVE_STATIONS = "ACTION_SET_CHECKED_ARRIVE_STATIONS";
export const ACTION_SET_DEPART_TIME_START = "ACTION_SET_DEPART_TIME_START";
export const ACTION_SET_DEPART_TIME_END = "ACTION_SET_DEPART_TIME_END";
export const ACTION_SET_ARRIVE_TIME_START = "ACTION_SET_ARRIVE_TIME_START";
export const ACTION_SET_ARRIVE_TIME_END = "ACTION_SET_ARRIVE_TIME_END";
export const ACTION_SET_IS_FILTERS_VISIBLE = "ACTION_SET_IS_FILTERS_VISIBLE";
export const ACTION_SET_SEARCH_PARSED = "ACTION_SET_SEARCH_PARSED";
export const ACTION_SET_IS_FILTER = 'ACTION_SET_IS_FILTER';

export function setFrom(from){
    return {
        type: ACTION_SET_FROM,
        payload: from
    };
}
export function setTo(to){
    return {
        type: ACTION_SET_TO,
        payload: to
    };
}
export function setDepartDate(departDate){
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate
    };
}
export function setHighSpeed(highSpeed){
    return {
        type: ACTION_SET_HIGH_SPEED,
        payload: highSpeed
    }
}
export function toggleHighSpeed(){
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed
        });
    }
}
export function setTrainList(trainList){
    return {
        type: ACTION_SET_TRAIN_LIST,
        payload: trainList
    };
}
export function toggleOrderType(){
    return (dispatch, getState) => {    
        const { orderType } = getState();
        if(orderType === ORDER_DEPART){
            dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DEPARTION
            });
        }else{
            dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DEPART
            });
        }
    }
}
export function toggleOnlyTickets(){
    return (dispatch, getState) => {
        const { onlyTickets } = getState();
        dispatch({
            type: ACTION_SET_ONLY_TICKETS,
            payload: !onlyTickets
        });
    }
}
export function setTicketTypes(ticketTypes){
    return {
        type: ACTION_SET_TICKET_TYPES,
        payload: ticketTypes
    };
}
export function setCheckedTicketTypes(checkedTicketTypes){
    return {
        type: ACTION_SET_CHECKED_TICKET_TYPES,
        payload: checkedTicketTypes
    };
}
export function setTrainTypes(trainTypes){
    return {
        type: ACTION_SET_TRAIN_TYPES,
        payload: trainTypes
    };
}
export function setCheckedTrainTypes(checkedTrainTypes){
    return {
        type: ACTION_SET_CHECKED_TRAIN_TYPES,
        payload: checkedTrainTypes
    };
}
export function setDepartStations(departStations){
    return {
        type: ACTION_SET_DEPAR_STATIONS,
        payload: departStations
    };
}
export function setCheckedDepartStations(checkedDepartStations){
    return {
        type: ACTION_SET_CHECKED_DEPART_STATIONS,
        payload: checkedDepartStations
    };
}
export function setArriveStations(arriveStations){
    return {
        type: ACTION_SET_ARRIVE_STATIONS,
        payload: arriveStations
    };
}
export function setCheckedArriveStations(checkedArriveStations){
    return {
        type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
        payload: checkedArriveStations
    };
}
export function setDepartTimeStart(departTimeStart){
    return {
        type: ACTION_SET_DEPART_TIME_START,
        payload: departTimeStart
    };
}
export function setDepartTimeEnd(departTimeEnd){
    return {
        type: ACTION_SET_DEPART_TIME_END,
        payload: departTimeEnd
    };
}
export function setArriveTimeStart(arriveTimeStart){
    return {
        type: ACTION_SET_ARRIVE_TIME_START,
        payload: arriveTimeStart
    };
}
export function setArriveTimeEnd(arriveTimeEnd){
    return {
        type: ACTION_SET_ARRIVE_TIME_END,
        payload: arriveTimeEnd
    };
}
export function toggleIsFiltersVisible(){
    return (dispatch, getState) => {
        const { isFiltersVisible } = getState();
        dispatch({
            type: ACTION_SET_IS_FILTERS_VISIBLE,
            payload: !isFiltersVisible
        });
    }
}
export function setSearchParsed(searchParsed){
    return {
        type: ACTION_SET_SEARCH_PARSED,
        payload: searchParsed
    };
}

function replaceUrl(dateObj){
    window.location.search = window.location.search.replace(/&date=(\d{4}-\d{1,2}-\d{1,2})/, `&date=${dateObj.toCrossLineStr}`);
}

export function setIsFilter(isFilter){
    return {
        type: ACTION_SET_IS_FILTER,
        payload: isFilter,
    }
}

export function nextDate(){
    return (dispatch, getState) => {
        const { departDate } = getState();
        const date = getTodayFirstTime(departDate.time + 86400 * 1000);
        // 这里考虑应不应该使用 search，用的话就会有刷新，但是相当于把日期缓存了，当再次刷新时，日期还是上一次的那个日期
        replaceUrl(date);
        dispatch(setDepartDate(date));
    }
}
export function prevDate(){
    return (dispatch, getState) => {
        const { departDate } = getState();
        const date = getTodayFirstTime(departDate.time - 86400 * 1000);
        replaceUrl(date);
        dispatch(setDepartDate(date));
    }
}

