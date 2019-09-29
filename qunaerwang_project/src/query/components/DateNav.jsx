import React from 'react';
import '../CSS/DateNav.sass';

import { getWeak } from '../../common/tools/timeTools';

export default function DateNav(props) {
    const { date } = props;
    return (
        <div className="navWrapper">
            <span className="beforeDay">前一天</span>
            <span className="dateSelector">{getWeak(date)}</span>
            <span className="afterDay">后一天</span>
        </div>
    )
}
