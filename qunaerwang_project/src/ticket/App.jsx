import React, { useCallback, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import './App.css';

import useNav from "../common/tools/useNav";
import { prevDate, nextDate } from "../query/store/actions";
import { URLQuery } from "../common/tools/URLQuery";
import { getTodayFirstTime } from "../common/tools/timeTools";

import Header from "../common/Header";
import DateNav from "../common/DateNav/DateNav";
import TrainCard from "./components/TrainCard";
import TicketItem from "./components/TicketItem";
import TimetableDialog from "./components/TimetableDialog";

import {
    setDepartState,
    setArriveState,
    setTrainNumber,
    setDepartDate,
    setIsShowTimetable,
} from "./store/actions";

const ticketTypes = [
    { name: '二等座', price: 553, desc: "有票", state: 1 },
    { name: '一等座', price: 933, desc: '有票', state: 1 },
    { name: '商务座', price: 1728, desc: '15张', state: 1 },
];

function App(props){

    const {
        departDate,
        trainNumber,
        dispatch,
        isShowTimetable,
    } = props;

    const goBack = useCallback(() => {
        window.history.back();
    },[]);

    useEffect(() => {
        const urlObj = URLQuery(window.location.href);
        const { aStation, dStation, trainNumber, date } = urlObj;
        dispatch(setDepartState(aStation));
        dispatch(setArriveState(dStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setDepartDate(getTodayFirstTime(date)));
    },[dispatch]);

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
                <TrainCard showDialog={showDialog} />
            </article>
            <section className="ticket-trainTypeList">
                {
                    ticketTypes.map(item => <TicketItem key={item.name} info={item} />)
                }
            </section>
            {
                isShowTimetable ? <TimetableDialog showDialog={showDialog} {...dialogCbs} /> : ""
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