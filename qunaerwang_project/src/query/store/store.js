import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { getTodayFirstTime } from '../../common/tools/timeTools';
import { ORDER_DEPART } from "../contains";

export default createStore(
    combineReducers(reducer),
    // 默认 state
    {
        isFilter: false,                // 综合筛选按钮的样式如何展示
        from: null, // 出发城市
        to: null,   // 到达城市
        departDate: getTodayFirstTime(Date.now()),  // 出发日期
        highSpeed: false,       // 是否选择了高铁动车
        trainList: [],      // 车次列表
        orderType: ORDER_DEPART,    // 筛选条件
        onlyTickets: false,     // 只看有票
        ticketTypes: [],        // 车票类型
        checkedTicketTypes: {},     // 被选中的车票类型
        trainTypes: [],         // 车次类型
        checkedTrainTypes: {},  // 被选中的车次类型
        departStations: [],      // 出发车站
        checkedDepartStations: {},      // 被选中的出发车站
        arriveStations: [],     // 到达车站
        checkedArriveStations: {},   // 被选中的到达车站
        departTimeStart: 0,     // 出发起始时间
        departTimeEnd: 24,      // 出发终止时间
        arriveTimeStart: 0,     // 到达起始时间
        arriveTimeEnd: 24,      // 到达结束时间
        isFiltersVisible: false,    // 综合筛选的显示与隐藏
        searchParsed: false,        // URL 是否已经解析完成
    },
    applyMiddleware(thunk)
);