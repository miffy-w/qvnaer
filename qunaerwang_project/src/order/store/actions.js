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
export const ACTION_SET_IS_SHOW_MEAL_FRAME = "ACTION_SET_IS_SHOW_MEAL_FRAME";
export const ACTION_SET_IS_SHOW_CERTIFICATE_FRAME = "ACTION_SET_IS_SHOW_CERTIFICATE_FRAME";
export const ACTION_SET_IS_SHOW_AMOUNT_DETAILS_FRAME = "ACTION_SET_IS_SHOW_AMOUNT_DETAILS_FRAME";
export const ACTION_SET_SEAT_TYPE = "ACTION_SET_SEAT_TYPE";
export const ACTION_SET_NOW_LIST = "ACTION_SET_NOW_LIST";
export const ACTION_SET_IS_SHOW_TIP = "ACTION_SET_IS_SHOW_TIP";
export const ACTION_SET_TIP_TITLE = "ACTION_SET_TIP_TITLE";
export const ACTION_SET_RESERVED_PHONE = "ACTION_SET_RESERVED_PHONE";

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

export function setIsShowTip(isShowTip){
    return {
        type: ACTION_SET_IS_SHOW_TIP,
        payload: isShowTip,
    };
}
export function setTipTitle(tipTitle){
    return {
        type: ACTION_SET_TIP_TITLE,
        payload: tipTitle,
    };
}
export function setReservedPhone(reservedPhone){
    return {
        type: ACTION_SET_RESERVED_PHONE,
        payload: reservedPhone,
    };
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
                seat: '',                  // 座位
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
                seat: '',              // 座位信息
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

// 把数据发送到后端
function orderFetch(data){
    fetch('/api/orderData',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    }).then(result => result.json())
    .then(data => {
        if(data.code && data.code === 1){
            window.location.href = "/end.html";
        }else   alert("数据传送有误，请重试！")
    }).catch(err => {
        alert('数据传送有误，请重试：', err);
    });
}

export const verify = {
    verifyBirthDay(field){
        const reg = /^((?:19[2-9]\d{1})|(?:20(?:(?:0[0-9])|(?:1[0-8]))))-((?:0?[1-9])|(?:1[0-2]))-((?:0?[1-9])|(?:[1-2][0-9])|30|31)$/;
        return reg.test(field);
    },
    verifyPhone(field){
        const reg = /^1(3|4|5|7|8)\d{9}$/;
        return reg.test(field);
    },
    verifyIdentityCard(field){
        const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        return reg.test(field);
    }
}

function birthdayWrong(field, dispatch){
    if(!verify.verifyBirthDay(field)){
        setTip(dispatch, "出生日期填写格式不正确！");
    }
}
function identityCardWrong(field, dispatch){
    if(!verify.verifyIdentityCard(field)){
        setTip(dispatch, "身份证格式填写有误！");
    }
}
function phoneWrong(field, dispatch){
    if(!verify.verifyPhone(field)){
        setTip(dispatch, "无效的手机号码");
    }
}


function setTip(dispatch,msg, bool = true){
    dispatch(setTipTitle(msg));
    dispatch(setIsShowTip(bool));
}
// 验证表单正确性
export function verifyForm(){
    return (dispatch, getState) => {
        const { members, reservedPhone } = getState();
        if(!members.length){
            setTip(dispatch,"请完成个人信息填写");
            return;
        }
        for(let i = 0;i < members.length;i ++){
            let keys = Object.keys(members[i]);
            for(let k of keys){
                if(k!== 'seat' && k!=='gender' && !members[i][k]){
                    setTip(dispatch, "个人信息没有填写完整，不能提交");
                    return;
                }
                // 验证一些字段的合法性
                switch(k){
                    case 'birthday':
                        birthdayWrong(members[i][k], dispatch);
                        break;
                    case 'phoneNumber':
                        phoneWrong(members[i][k], dispatch);
                        break;
                    case 'licenceNo':
                        identityCardWrong(members[i][k], dispatch);
                        break;
                    default: continue;
                }
            }
        }

        if(!reservedPhone){
            setTip(dispatch, "请填写联系手机");
            return;
        }
        if(!verify.verifyPhone(reservedPhone, dispatch)){
            setTip(dispatch, "用于联系的手机号格式不正确");
            return;
        }

        // 验证都正确，这时就可以发送网络请求
        orderFetch({
            members,
            contactPhone: reservedPhone,
        });
    }
}