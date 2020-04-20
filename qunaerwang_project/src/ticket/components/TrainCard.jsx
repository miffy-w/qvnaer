import React from "react";

import "../CSS/TrainCard.scss";

export default function TrainCard(props){
    const { showDialog } = props;
    

    return (
        <div className="ticket-trainCard-wrapper">
            <div className="wrapper left-wrapper">
                <span>北京南</span>
                <span className="time">19:00</span>
                <span className="date">04-20 周一</span>
            </div>

            <div className="wrapper middle-wrapper">
                <span className="trainNumber">G17 高速动车</span>
                <span className="timetable">— <a onClick={showDialog} href="#!">时刻表</a> —</span>
                <span className="duration">耗时4小时18分</span>
            </div>

            <div className="wrapper right-wrapper">
                <span>上海虹桥</span>
                <span className="time">23:18</span>
                <span className="date">04-20 周一</span>
            </div>
        </div>
    );
}