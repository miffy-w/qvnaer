import React, {useEffect, useCallback, useMemo} from 'react';
import { connect } from 'react-redux';
import URI from "urijs";
import './App.css';

import Screening from "./components/Screening";
import Header from '../common/Header.jsx';

import DateNav from '../common/DateNav/DateNav';
import TrainInfo from './components/TrainInfo.jsx';
import FooterScreen from './components/FooterScreen.jsx';
import {
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
    setSearchParsed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    prevDate,
    nextDate,

    toggleHighSpeed,
    toggleIsFiltersVisible,
    toggleOnlyTickets,
    toggleOrderType,

    setIsFilter,
    setCheckedTrainTypes,
    setCheckedTicketTypes,
    setCheckedArriveStations,
    setCheckedDepartStations,
    setDepartTimeEnd,
    setArriveTimeEnd,
    setDepartTimeStart,
    setArriveTimeStart,
} from "./store/actions";

import { getTodayFirstTime } from "../common/tools/timeTools";
import { URLQuery } from '../common/tools/URLQuery';
import useNav from '../common/tools/useNav';
import { bindActionCreators } from 'redux';

// 处理 jsonp 发过来的车次信息并处理
window.jsonp4 = function(data){
    if(data){
        return data;
    }else{
        console.log(-1);
    }
}

function App(props){

    const {
        isFilter,
        dispatch,
        from,
        to,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        trainList,
        isFiltersVisible,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
    } = props;
    useEffect(() => {
        const queryObj = URLQuery(window.location.href);
        const { fromCity, toCity, date, searchType } = queryObj;
        dispatch(setFrom(fromCity));
        dispatch(setTo(toCity));
        dispatch(setDepartDate(getTodayFirstTime(date)));
        if(searchType && searchType === "true"){     // searchType 有值时开启了只看高铁选项
            dispatch((setHighSpeed(true)));
        } 
        dispatch(setSearchParsed(true));        // url 已经解析完
    },[dispatch]);

    useEffect(() => {
        if(!searchParsed){
            return;
        }
        // 发起网络请求，给 url 添加查询参数
        const url = new URI("/rest/query")
            .setSearch('from',from)
            .setSearch('to',to)
            .setSearch('date', departDate.toCrossLineStr)
            .setSearch('highSpeed', highSpeed)
            .setSearch('searchParsed',searchParsed)
            .setSearch('orderType',orderType)
            .setSearch('onlyTickets',onlyTickets)
            .setSearch('checkedTicketTypes',Object.keys(checkedTicketTypes).join())
            .setSearch('checkedTrainTypes',Object.keys(checkedTrainTypes).join())
            .setSearch('checkedDepartStations',Object.keys(checkedDepartStations).join())
            .setSearch('checkedArriveStations',Object.keys(checkedArriveStations).join())
            .setSearch('departTimeStart',departTimeStart)
            .setSearch('departTimeEnd',departTimeEnd)
            .setSearch('arriveTimeStart',arriveTimeStart)
            .setSearch('arriveTimeEnd',arriveTimeEnd)
            .toString();
        fetch(url)
            .then(res => res.json())
            .then(result => {
                console.log("result: ", result);
                const {     // 解构
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation,
                            },
                        },
                    },
                } = result;
                dispatch(setTrainList(trains));
                dispatch(setTicketTypes(ticketType));
                dispatch(setTrainTypes(trainType));
                dispatch(setDepartStations(depStation));
                dispatch(setArriveStations(arrStation));
            }).catch(err => { console.error("err : ", err) });
    },[
        from,
        to,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        dispatch
    ]);

    // 这个状态是为了如何展示综合筛选的样式，如果综合筛选不是重置时的样子
    // 说明使用了一些筛选项，这是综合筛选的样式会有变化，默认是 false

    const backToHome = useCallback(() => {
        window.history.back();
    },[]);

    // 前一天、后一天的逻辑
    const {
        isNextDisable,
        isPrevDisable,
        prev,
        next,
    } = useNav(dispatch, departDate, prevDate, nextDate);

    const bottomCbs = useMemo(() => {
        return bindActionCreators({
            toggleHighSpeed,
            toggleIsFiltersVisible,
            toggleOnlyTickets,
            toggleOrderType,
        },dispatch);
    }, [dispatch]);

    const screeningCbs = useMemo(() => {
        return bindActionCreators({
            setCheckedTrainTypes,
            setCheckedTicketTypes,
            setCheckedArriveStations,
            setCheckedDepartStations,
            setDepartTimeEnd,
            setArriveTimeEnd,
            setDepartTimeStart,
            setArriveTimeStart,
            toggleIsFiltersVisible,
            setIsFilter,
        },dispatch);
    },[dispatch]);

    if(!searchParsed)   return null;

    return (
        <div className="query-app-wrapper">
            <div className="headerWrapper">
                <Header goback={backToHome} title={`${from} → ${to}`} />
                {/* 前一天、后一天 */}
                <DateNav 
                    date={departDate.toLocalStr} 
                    isNextDisable={isNextDisable}
                    isPrevDisable={isPrevDisable}
                    prev={prev}
                    next={next}
                />
            </div>
            <TrainInfo trainList={trainList} />
            <FooterScreen {...bottomCbs} 
                highSpeed={highSpeed}
                isFiltersVisible={isFiltersVisible}
                orderType={orderType}
                onlyTickets={onlyTickets}
                isFilter={isFilter}
            />
            {
                isFiltersVisible && <Screening
                    ticketTypes={ticketTypes}
                    trainTypes={trainTypes}
                    departStations={departStations}
                    arriveStations={arriveStations}
                    checkedTicketTypes={checkedTicketTypes}
                    checkedTrainTypes={checkedTrainTypes}
                    checkedDepartStations={checkedDepartStations}
                    checkedArriveStations={checkedArriveStations}
                    departTimeStart={departTimeStart}
                    departTimeEnd={departTimeEnd}
                    arriveTimeStart={arriveTimeStart}
                    arriveTimeEnd={arriveTimeEnd}
                    {...screeningCbs}
                />
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps,mapDispatchToProps)(App);