export const ACTION_SET_DEP_STATION = "ACTION_SET_DEP_STATION";
export const ACTION_SET_ARR_STATION = "ACTION_SET_ARR_STATION";
export const ACTION_SET_DEP_TIME = "ACTION_SET_DEP_TIME";
export const ACTION_SET_ARR_TIME = "ACTION_SET_ARR_TIME";
export const ACTION_SET_DEP_DATE = "ACTION_SET_DEP_DATE";
export const ACTION_SET_ARR_DATE = "ACTION_SET_ARR_DATE";
export const ACTION_SET_TRAIN_NUMBER = "ACTION_SET_TRAIN_NUMBER";
export const ACTION_SET_DURATION = "ACTION_SET_DURATION";
export const ACTION_SET_TICKET_TYPE = "ACTION_SET_TICKET_TYPE";
export const ACTION_SET_MEMBERS = "ACTION_SET_MEMBERS";
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
export function setMembers(members){
    return {
        type: ACTION_SET_MEMBERS,
        payload: members,
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
        console.log('isShowCertificateFrame: ', isShowCertificateFrame);
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

let passengerIdSeed = 0;

export function createAdult(){
    return (dispatch, getState) => {
        const { members } = getState();
        // 检查表单中的字段是不是都填写了，有一项没填写就不能再添加新的乘客
        for(let passenger of members){
            const keys = Object.keys(passenger);
            for(let key of keys){
                if(!passenger[key]){
                    return;
                }
            }
        }
        dispatch(setMembers([
            ...members,
            {
                id: ++ passengerIdSeed,
                name: '',       // 性名
                ticketType: 'adult',        // 票的类型
                phoneNumber: '',            // 手机号
                licenceNo: '',              // 证件号
                seat: 'Z',                  // 座位
                licenceType: '身份证',            // 证件类型
                ticketName: '成人票',           // 票名称
            }
        ]));
    }
}
export function createChild(){
    return (dispatch, getState) => {
        const { members } = getState();
        let adultFound = null;
        for(let passenger of members){
            const keys = Object.keys(passenger);
            for(let key of keys){
                if(!passenger[key]){
                    return;
                }
            }
            if(passenger.ticketType === "adult"){
                adultFound = passenger.id;
            }
        }
        if(!adultFound){
            alert("请至少正确添加一个成人信息");
            return;
        }

        const firstAdult = members.find(item => item.ticketType === "adult");

        dispatch(setMembers([
            ...members,
            {
                id: ++ passengerIdSeed,
                name: '',       // 性名 
                gender: '',     // 性别
                ticketType: 'child',        // 票类型
                birthday: '',           // 出生日期
                followAdult: firstAdult ? firstAdult.id : '', // 跟随的成年人，值是成年人的 id，默认是第一个成年人的 id
                seat: 'Z',              // 座位信息
                ticketName: '儿童票'
            }
        ]));
    }
}

export function handleShowFrame(list, id, type, activeVal){
    return (dispatch, getState) => {
        const { isShowCertificateFrame } = getState();
        if(!isShowCertificateFrame){
            dispatch(setNowList({
                data: list,
                id, type, active: activeVal
            }));
        }
        dispatch(setIsShowCertificateFrame(true));
    }
}

export function removePassenger(id){
    return (dispatch, getState) => {
        const { members } = getState();
        let newMembers = members.filter(member => {
            // 传入的 id 就是要被删除掉的表单，如果删除了成年人，与他关联的儿童也会被删除
            return member.id !== id && member.followAdult !== id;
        });
        // 还要做二次筛选，因为如果删除一个成人后，可能就没有成人了，这时就要把 members 变成一个空数组
        let adults = newMembers.filter(item => item.ticketType === "adult");
        if(!adults.length){
            // 表明没有成人
            dispatch(setMembers([]));
        }else  dispatch(setMembers(newMembers));
    }
}

export function updateMember(id, data){
    return (dispatch, getState) => {
        const { members } = getState();
        for(let i = 0;i < members.length;i ++){
            if(members[i].id === id){
                const newMembers = [...members];
                newMembers[i] = Object.assign({}, members[i], data);
                dispatch(setMembers(newMembers));
                break;
            }
        }
    }
}

export function updateTicketName(id, ticketName){
    return (dispatch, getState) => {
        const { members } = getState();
        // 首先获取到 id 对应的 ticketName
        const self = members.find(item => item.id === id);
        if(self && self.ticketName === ticketName)   return;     // 说明点的是同一个，这时就不用处理

        if(ticketName !== '儿童票'){
            dispatch(updateMember(id, { ticketName }));
        }else{
            // 选择的是儿童票就要分情况
            // 1. 选择成了儿童票之后页面中没有成人了，这时就要警告，不能这样操作
            // 2. 选择成儿童票时候还有别的成人，这是可以的
            // 过滤出成人，并且与传入的 id 不同（不然会获取到自身）
            const adults = members.filter(item => item.ticketType === "adult" && item.id !== id);
            if(!adults.length){     // 没有找到
                alert("请至少正确添加一个成人信息");
                return;
            }
            // 不然就更新，还要更新 ticketType 为 child 类型
            dispatch(updateMember(id, { ticketName, ticketType: 'child' }));
        }
    }
}