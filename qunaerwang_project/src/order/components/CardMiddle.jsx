import React from 'react';
import PropTypes from "prop-types";
import "../CSS/CardMiddle.scss";

const CardMiddle = (props) => {
    const { trainNumber } = props;
    return (
        <div className="card-middle-wrapper">
            <span>{ trainNumber }直达特快</span>
            <span className="icon">
                <i className="iconfont">&#xe669;</i>
            </span>
            <span>耗时14小时44分</span>
        </div>
    );
}

CardMiddle.propTypes = {
    trainNumber: PropTypes.string.isRequired,
};

export default CardMiddle;
