import React, { useCallback, useEffect, useState, useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import './App.css';

import Header from "../common/Header";
import CardMiddle from "./components/CardMiddle";
import TrainCard from "../ticket/components/TrainCard";
import Recommend from "./components/Recommend";
import Safeguard from "./components/Safeguard";
import AddPassenger from "./components/AddPassenger";
import Agreement from "./components/Agreement";
import SubmitOrder from "./components/SubmitOrder";
import Menu from "./components/Menu";

import { URLQuery } from "../common/tools/URLQuery";
import { getTodayFirstTime, getWeek } from "../common/tools/timeTools";

import {
    GENDER_LIST,
    LICENCE_LIST,
    TICKET_TYPE_LIST,
} from "./store/config";

import {
    setDepStation,
    setArrStation,
    setSeatType,
    setDepDate,
    setTrainNumber,
    toggleIsShowAmountDetailsFrame,
    setIsShowAmountDetailsFrame,
    setIsShowCertificateFrame,
    createAdult,
    createChild,
    removePassenger,
    updateMember,
    updateTicketName,
    handleShowFrame,
} from "./store/actions";

function App(props){

    const [cerTypeList] = useState(() => LICENCE_LIST);
    const [genderList] = useState(() => GENDER_LIST);
    const [ticketTypeList] = useState(() => TICKET_TYPE_LIST);

    const {
        dispatch,
        depStation,
        arrStation,
        depDate,
        seatType,
        trainNumber,
        isShowAmountDetailsFrame,
        isShowCertificateFrame,
        nowList,
        members,
    } = props;

    const goback = useCallback(() => {
        window.history.back();
    },[]);

    useEffect(() => {
        let obj = URLQuery(window.location.href);
        const { aStation, dStation, date, seatType, trainNum } = obj;
        dispatch(setDepDate(getTodayFirstTime(date)));
        dispatch(setDepStation(dStation));
        dispatch(setArrStation(aStation));
        dispatch(setSeatType(seatType));
        dispatch(setTrainNumber(trainNum));
    },[dispatch]);

    const pasFormCbs = useMemo(() => bindActionCreators({
        createAdult,
        createChild,
        removePassenger,
        updateMember,
        handleShowFrame,
    }, dispatch),[dispatch]);
    
    const submitOrderCbs = useMemo(() => bindActionCreators({
        toggleIsShowAmountDetailsFrame,
        setIsShowAmountDetailsFrame,
    }, dispatch),[dispatch]);
    const dialogCbs = useMemo(() => bindActionCreators({ 
        setIsShowCertificateFrame,
        updateMember,
        updateTicketName,
    },dispatch),[dispatch]);


    return (
        <div className="order">
            <div id="order-wrapper">
                <Header goback={goback} title="订单填写" />
                <div className="order-trainInfo">
                    <TrainCard 
                        arrStation={arrStation} 
                        depDate={depDate} 
                        depStation={depStation}
                        depWeek={getWeek(depDate.toLocalStr)}
                        arrWeek={getWeek(depDate.toLocalStr)}
                    >
                        <CardMiddle trainNumber={trainNumber} />
                    </TrainCard>
                </div>

                <Recommend seatType={seatType} />
                <AddPassenger
                    cerTypeList={cerTypeList}
                    genderList={genderList}
                    ticketTypeList={ticketTypeList}
                    members={members}
                    {...pasFormCbs}
                />

                <form className="touchPhone">
                    <span className="tip">联系手机</span>
                    <input type="text" name="touchPhone" placeholder="通知出票是信息" />
                </form>
                <Safeguard />
                <Agreement />
                <SubmitOrder 
                    isShowAmountDetailsFrame={isShowAmountDetailsFrame}
                    {...submitOrderCbs}
                />
                {
                    <Menu 
                        isShowCertificateFrame={isShowCertificateFrame} 
                        info={nowList} {...dialogCbs}
                    />
                }
            </div>
        </div>
        
    );
}

export default connect(
    (state) => state,
    (dispatch) => ({ dispatch })
)(App);