import React, { useState, useCallback, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import './App.css';

import useNav from "../common/tools/useNav";
import { prevDate, nextDate } from "../query/store/actions";
import { URLQuery } from "../common/tools/URLQuery";
import { getTodayFirstTime, getWeek } from "../common/tools/timeTools";

import Header from "../common/Header";
import DateNav from "../common/DateNav/DateNav";
import TrainCard from "./components/TrainCard";
import TicketItem from "./components/TicketItem";
import TimetableDialog from "./components/TimetableDialog";
import CardMiddle from "./components/CardMiddle";

import {
    setDepartState,
    setArriveState,
    setTrainNumber,
    setDepartDate,
    setIsShowTimetable,
    setSearchParsed,
} from "./store/actions";

const ticketTypes = [
    { name: '二等座', price: 553, desc: "有票", state: 1 },
    { name: '一等座', price: 933, desc: '有票', state: 1 },
    { name: '商务座', price: 1728, desc: '15张', state: 1 },
];

function App(props){

    const {
        arriveDate,
        departDate,
        trainNumber,
        dispatch,
        isShowTimetable,
        searchParsed,
        departState,
        arriveState,
    } = props;

    const goBack = useCallback(() => {
        window.history.back();
    },[]);

    const [expendedIdx, setExpendedIdx] = useState(-1);
    // 这个 state 是用来切换座次列表的，-1 表示每个座次列表都不展开
    // 渲染的列表索引会传给 toggle 函数（在每次点击列表项时触发该函数）
    // 它用来判断新的 idx 与当前的 expendedIdx 是不是相等，相等说明本来就显示的列表项又点击了一次
    // 这时就要关闭列表项。两者不相等也就说明被点击的列表项是隐藏的，需要把它显示出来
    const toggle = useCallback((idx) => {
        setExpendedIdx(idx === expendedIdx ? -1 : idx);
    },[expendedIdx]);

    useEffect(() => {
        const urlObj = URLQuery(window.location.href);
        const { aStation, dStation, trainNum, date } = urlObj;
        dispatch(setDepartState(aStation));
        dispatch(setArriveState(dStation));
        dispatch(setTrainNumber(trainNum));
        dispatch(setDepartDate(getTodayFirstTime(date)));

        dispatch(setSearchParsed(true));
    },[dispatch]);

    useEffect(() => {
        if(searchParsed){

            const search = window.location.search;
            fetch(`/api/train/trainSeat${search}`)
                .then(json => json.json())
                .then(data => {
                    console.log(data);
                }).catch(err => console.error(err));

        }
    },[searchParsed]);

    const showDialog = useCallback(() => {
        dispatch(setIsShowTimetable(true));
    },[dispatch]);

    const dialogCbs = bindActionCreators({
        setIsShowTimetable
    }, dispatch);

    // 前一天、后一天的逻辑
    const {
        isNextDisable,
        isPrevDisable,
        prev,
        next,
    } = useNav(dispatch, departDate, prevDate, nextDate);

    if(!searchParsed)   return null;

    return (
        <div className="ticketApp-wrapper">
            <header id="ticket-header">
                <Header goback={goBack} title={trainNumber} />
                {/* 前一天、后一天 */}
                <DateNav 
                    date={departDate.toLocalStr} 
                    isNextDisable={isNextDisable}
                    isPrevDisable={isPrevDisable}
                    prev={prev}
                    next={next}
                />
            </header>
            <article className="ticket-trainCard">
                <TrainCard
                    depWeek={getWeek(departDate.time)}
                    arrWeek={getWeek(arriveDate.time)}
                    depStation={departState}
                    arrStation={arriveState}
                >
                    <CardMiddle
                        showDialog={showDialog} 
                        trainNumber={trainNumber}
                    />
                </TrainCard>
            </article>
            <section className="ticket-trainTypeList">
                {
                    ticketTypes.map((item, idx) => 
                        <TicketItem key={item.name} toggle={toggle} expendedIdx={expendedIdx} idx={idx} info={item} />
                    )
                }
            </section>
            {
                isShowTimetable ? <TimetableDialog isShowTimetable={isShowTimetable} {...dialogCbs} /> : ""
            }
        </div>
    );
}

function mapStateToProps(state){
    return state;
}

function mapStateToDispatch(dispatch){
    return { dispatch };
}

export default connect(mapStateToProps, mapStateToDispatch)(App);