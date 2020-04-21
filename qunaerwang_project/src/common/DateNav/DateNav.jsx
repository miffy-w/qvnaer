import React, { memo } from 'react';
import PropTypes from "prop-types";
import './DateNav.sass';

import { getWeek, parseLocalDate } from '../tools/timeTools';

const DateNav = memo(function (props) {
    
    const { date, prev, next, isPrevDisable, isNextDisable } = props;
    return (
        <div className="navWrapper">
            <span onClick={prev} style={isPrevDisable ? {opacity: ".3"} : {}} className="beforeDay">前一天</span>
            <span className="dateSelector">{parseLocalDate(date)} {getWeek(date)}</span>
            <span onClick={next} style={isNextDisable ? {opacity: ".3"} : {}} className="afterDay">后一天</span>
        </div>
    )
});

DateNav.propTypes = {
    date: PropTypes.string.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    isPrevDisable: PropTypes.bool.isRequired,
    isNextDisable: PropTypes.bool.isRequired
}

export default DateNav;