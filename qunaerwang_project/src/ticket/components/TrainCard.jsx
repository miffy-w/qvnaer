import React, { memo } from "react";

import "../CSS/TrainCard.scss";
import Proptypes from "prop-types";

const TrainCard = memo((props) => {
    const { depWeek, arrWeek, depStation, arrStation } = props;

    return (
        <div className="ticket-trainCard-wrapper">
            <div className="wrapper left-wrapper">
                <span>{depStation}</span>
                <span className="time">19:00</span>
                <span className="date">04-20 {depWeek}</span>
            </div>

            { props.children }

            <div className="wrapper right-wrapper">
                <span>{arrStation}</span>
                <span className="time">23:18</span>
                <span className="date">04-20 {arrWeek}</span>
            </div>
        </div>
    );
});

TrainCard.propTypes = {
    depWeek: Proptypes.string.isRequired,
    arrWeek: Proptypes.string.isRequired,
    depStation: Proptypes.string.isRequired,
    arrStation: Proptypes.string.isRequired,
};

export default TrainCard;