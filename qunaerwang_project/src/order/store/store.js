import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';
import { getTodayFirstTime } from "../../common/tools/timeTools";

export default createStore(
    combineReducers(reducers),
    {
        depStation: null,
        arrStation: null,
        depTime: null,
        arrTime: null,
        depDate: getTodayFirstTime(),
        arrDate: getTodayFirstTime(),
        trainNumber: null,
        duration: null,
        ticketType: null,
        memebers: [],
        isShowAddPerson: true,      // 添加成人的表单是否显示
        isShowMealFrame: false,     // 是否显示“高速出票套餐”
        isShowCertificateFrame: false,      // 是否显示选取票的类型（成人票、儿童票、学生票）
        isShowAmountDetailsFrame: false,    // 是否显示金额详情的弹出框
    },
    applyMiddleware(thunk)
);