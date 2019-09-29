// 和并多个 reducer：
import { combineReducers } from 'redux';
import { types } from './actions';

// App 组件的 reducer：
const appReducer = function(state = {
    // 是否显示 城市选择页
    isShowCityListPage: false,
    // 是否显示 日期选择页
    isShowCalendar: false
},action){
    switch(action.type){
        case types.SHOW_CITY_SELECTOR:
            return {
                isShowCityListPage: action.isGotoCitySelector,
                isShowCalendar: state.isShowCalendar
            }
        case types.BACK_PREV_PAGE:
            return {
                isShowCityListPage: action.isShowCityList,
                isShowCalendar: state.isShowCalendar
            }
        case types.EXCHANGE_CITY:
            return {
                isShowCityListPage: false,
                isShowCalendar: state.isShowCalendar
            }
        // 选择了某城市
        case types.SELECTOR_CITY:
            return {
                isShowCityListPage: action.isShowCityList,
                isShowCalendar: state.isShowCalendar
            }
        // 显示/隐藏日期选择页：
        case types.GOTO_CALENDAR:
            return{
                isShowCityListPage: state.isShowCityListPage,
                isShowCalendar: action.isShowCalendar
            }
        default: return state;
    }
}

const  stationReducer = function(state = {
    // 初始值：
    from: '北京',
    to: '上海',
    fromOrTo: true          // true 表示当前进入的是出发地，false 表示目的地
},action){
    switch(action.type){
        case types.EXCHANGE_CITY:
            return {
                from: action.preload[0],
                to: action.preload[1],
                fromOrTo: state.fromOrTo
            };
        case types.SHOW_CITY_SELECTOR:
            return {
                from: state.from,
                to: state.to,
                fromOrTo: action.fromOrTo
            }
        default: return state;
    }
}

// 城市列表页面
const cityListReducer = function(state = {
    cityList: [],
    hotCitys: []
},action){
    switch(action.type){
        case types.GET_CITY_DATA:
            return {
                cityList: action.listData,
                hotCitys: action.hotCitys
            }
        default: return state;
    }
}

// 导出合并的 reducer
export default combineReducers({
    appReducer,
    stationReducer,
    cityListReducer
});