import React from 'react';
import '../CSS/DateNav.sass';

import { getWeak, isToday, parseLocalDate } from '../../common/tools/timeTools';

export default function DateNav(props) {
    
    const { date } = props;
    return (
        <div className="navWrapper">
            <span style={isToday(date) ? {opacity: ".3"} : {}} className="beforeDay">前一天</span>
            <span className="dateSelector">{parseLocalDate(date)} {getWeak(date)}</span>
            <span className="afterDay">后一天</span>
        </div>
    )
}
