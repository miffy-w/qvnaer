import React, { useCallback, useEffect, useState, useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import './App.css';

import Tip from "../common/Tip";
import Header from "../common/Header";
import CardMiddle from "./components/CardMiddle";
import TrainCard from "../ticket/components/TrainCard";
import Recommend from "./components/Recommend";
import Safeguard from "./components/Safeguard";
import AddPassenger from "./components/AddPassenger";
import Agreement from "./components/Agreement";
import ChooseSeat from "./components/ChooseSeat";
import SubmitOrder from "./components/SubmitOrder";
import ContactPhone from "./components/ContactPhone";
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
    setIsShowTip,
    setTipTitle,
    setReservedPhone,
    verifyForm,
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
        isShowTip,
        tipTitle,
        reservedPhone,
    } = props;

    const goback = useCallback(() => {
        window.history.back();
    },[]);

    const isShowTipCb = useCallback(() => {
        dispatch(setIsShowTip(!isShowTip))
    },[isShowTip, dispatch]);

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
        setIsShowTip,
        setTipTitle,
        verifyForm,
    }, dispatch),[dispatch]);
    const dialogCbs = useMemo(() => bindActionCreators({ 
        setIsShowCertificateFrame,
        updateMember,
        updateTicketName,
    },dispatch),[dispatch]);
    const chooseSeatCbs = useMemo(() => bindActionCreators({
        updateMember,
    },dispatch),[dispatch]);
    const contactPhoneCbs = useMemo(() => bindActionCreators({
        setReservedPhone,
    }, dispatch),[dispatch]);


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

                <ContactPhone reservedPhone={reservedPhone} { ...contactPhoneCbs} />
                {
                    members.length ? <ChooseSeat members={members} { ...chooseSeatCbs } /> : null
                }
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
            {
                isShowTip ? <Tip title={tipTitle}
                    timeout={1500}
                    // 当定时器完成后，调用的回调函数
                    cb={() => isShowTipCb()}
                /> : null
            }
            
        </div>
    );
}

export default connect(
    (state) => state,
    (dispatch) => ({ dispatch })
)(App);