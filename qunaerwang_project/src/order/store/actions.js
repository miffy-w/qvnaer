export const ACTION_SET_DEP_STATION = "ACTION_SET_DEP_STATION";
export const ACTION_SET_ARR_STATION = "ACTION_SET_ARR_STATION";
export const ACTION_SET_DEP_TIME = "ACTION_SET_DEP_TIME";
export const ACTION_SET_ARR_TIME = "ACTION_SET_ARR_TIME";
export const ACTION_SET_DEP_DATE = "ACTION_SET_DEP_DATE";
export const ACTION_SET_ARR_DATE = "ACTION_SET_ARR_DATE";
export const ACTION_SET_TRAIN_NUMBER = "ACTION_SET_TRAIN_NUMBER";
export const ACTION_SET_DURATION = "ACTION_SET_DURATION";
export const ACTION_SET_TICKET_TYPE = "ACTION_SET_TICKET_TYPE";
export const ACTION_SET_MEMEBERS = "ACTION_SET_MEMEBERS";
export const ACTION_SET_IS_SHOW_ADD_PERSON = "ACTION_SET_IS_SHOW_ADD_PERSON";
export const ACTION_SET_IS_SHOW_MEAL_FRAME = "ACTION_SET_IS_SHOW_MEAL_FRAME";
export const ACTION_SET_IS_SHOW_CERTIFICATE_FRAME = "ACTION_SET_IS_SHOW_CERTIFICATE_FRAME";
export const ACTION_SET_IS_SHOW_AMOUNT_DETAILS_FRAME = "ACTION_SET_IS_SHOW_AMOUNT_DETAILS_FRAME";
export const ACTION_SET_SEAT_TYPE = "ACTION_SET_SEAT_TYPE";
export const ACTION_SET_NOW_LIST = "ACTION_SET_NOW_LIST";

export function setDepStation(depStation){
    return {
        type: ACTION_SET_DEP_STATION,
        payload: depStation,
    }
}
export function setArrStation(arrStation){
    return {
        type: ACTION_SET_ARR_STATION,
        payload: arrStation,
    }
}
export function setDepTime(depTime){
    return {
        type: ACTION_SET_DEP_TIME,
        payload: depTime,
    }
}
export function setArrTime(arrTime){
    return {
        type: ACTION_SET_ARR_TIME,
        payload: arrTime,
    }
}
export function setDepDate(depDate){
    return {
        type: ACTION_SET_DEP_DATE,
        payload: depDate,
    }
}
export function setArrDate(arrDate){
    return {
        type: ACTION_SET_ARR_DATE,
        payload: arrDate,
    }
}
export function setTrainNumber(trainNumber){
    return {
        type: ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    }
}
export function setDuration(duration){
    return {
        type: ACTION_SET_DURATION,
        payload: duration,
    }
}
export function setTicketType(ticketType){
    return {
        type: ACTION_SET_TICKET_TYPE,
        payload: ticketType,
    }
}
export function setMemebers(memebers){
    return {
        type: ACTION_SET_MEMEBERS,
        payload: memebers,
    }
}
export function setSeatType(seatType){
    return {
        type: ACTION_SET_SEAT_TYPE,
        payload: seatType,
    }
}
export function setNowList(nowList){
    return {
        type: ACTION_SET_NOW_LIST,
        payload: nowList,
    }
}

export function setIsShowAddPerson(isShowAddPerson){
    return {
        type: ACTION_SET_IS_SHOW_ADD_PERSON,
        payload: isShowAddPerson,
    }
}
export function toggleIsShowAddPerson(){
    return (dispatch, getState) => {
        const { isShowAddPerson } = getState();
        dispatch(setIsShowAddPerson(!isShowAddPerson));
    }
}

export function setIsShowMealFrame(isShowMealFrame){
    return {
        type: ACTION_SET_IS_SHOW_MEAL_FRAME,
        payload: isShowMealFrame,
    }
}
export function toggleIsShowMealFrame(){
    return (dispatch, getState) => {
        const { isShowMealFrame } = getState();
        dispatch(setIsShowMealFrame(!isShowMealFrame));
    }
}

export function setIsShowCertificateFrame(isShowCertificateFrame){
    return {
        type: ACTION_SET_IS_SHOW_CERTIFICATE_FRAME,
        payload: isShowCertificateFrame,
    }
}
export function toggleIsShowCertificateFrame(){
    return (dispatch, getState) => {
        const { isShowCertificateFrame } = getState();
        dispatch(setIsShowCertificateFrame(!isShowCertificateFrame));
    }
}

export function setIsShowAmountDetailsFrame(isShowAmountDetailsFrame){
    return {
        type: ACTION_SET_IS_SHOW_AMOUNT_DETAILS_FRAME,
        payload: isShowAmountDetailsFrame,
    }
}
export function toggleIsShowAmountDetailsFrame(){
    return (dispatch, getState) => {
        const { isShowAmountDetailsFrame } = getState();
        dispatch(setIsShowAmountDetailsFrame(!isShowAmountDetailsFrame));
    }
}