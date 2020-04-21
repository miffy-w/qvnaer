import React, { useCallback } from "react";
import { connect } from 'react-redux';
import './App.css';

import Header from "../common/Header";
import CardMiddle from "./components/CardMiddle";
import TrainCard from "../ticket/components/TrainCard";
import Recommend from "./components/Recommend";
import Safeguard from "./components/Safeguard";
import {AddPassenger, PassengerForm} from "./components/AddPassenger";
import Agreement from "./components/Agreement";
import SubmitOrder from "./components/SubmitOrder";
import TicketType from "./components/TicketType";

function App(props){

    const goback = useCallback(() => {
        window.history.back();
    },[]);

    return (
        <div className="order">
            <div id="order-wrapper">
                <Header goback={goback} title="订单填写" />
                <div className="order-trainInfo">
                    <TrainCard arrStation="北京" depStation="上海">
                        <CardMiddle />
                    </TrainCard>
                </div>

                <Recommend />
                <div className="add-passenger-wrapper">
                    <PassengerForm />
                    <AddPassenger />
                </div>

                <form className="touchPhone">
                    <span className="tip">联系手机</span>
                    <input type="text" name="touchPhone" placeholder="通知出票是信息" />
                </form>
                <Safeguard />
                <Agreement />
                <SubmitOrder />

                {/* <TicketType /> */}
            </div>
        </div>
        
    );
}

export default connect(
    (state) => state,
    (dispatch) => ({ dispatch })
)(App);