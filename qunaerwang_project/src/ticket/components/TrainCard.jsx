import React from "react";

import "../CSS/TrainCard.scss";

export default function TrainCard(props){
    const { depWeek, arrWeek } = props;

    return (
        <div className="ticket-trainCard-wrapper">
            <div className="wrapper left-wrapper">
                <span>北京南</span>
                <span className="time">19:00</span>
                <span className="date">04-20 {depWeek}</span>
            </div>

            { props.children }

            <div className="wrapper right-wrapper">
                <span>上海虹桥</span>
                <span className="time">23:18</span>
                <span className="date">04-20 {arrWeek}</span>
            </div>
        </div>
    );
}