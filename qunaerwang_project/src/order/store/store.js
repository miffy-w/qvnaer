import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';
import { getTodayFirstTime } from "../../common/tools/timeTools";

export default createStore(
    combineReducers(reducers),
    {
        depStation: "",
        arrStation: "",
        depTime: "",
        arrTime: "",
        seatType: "",
        depDate: getTodayFirstTime(),
        arrDate: getTodayFirstTime(),
        trainNumber: "",
        duration: null,
        ticketType: null,
        members: [],           // 乘客信息
        isShowAddPerson: true,      // 添加成人票的表单是否显示
        isShowMealFrame: false,     // 是否显示“高速出票套餐”
        isShowAmountDetailsFrame: false,    // 是否显示金额详情的弹出框

        isShowCertificateFrame: false,      // 是否显示选取票的类型（成人票、儿童票、学生票）
        nowList: {},        // 当前展示的是选票类型还是性别、或者证件类型（这几个弹出组件样式一直，只需要改变列表数据即可）
    },
    applyMiddleware(thunk)
);