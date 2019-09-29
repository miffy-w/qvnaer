import React from 'react';
import '../CSS/DateNav.sass';

export default function DateNav() {
    return (
        <div className="navWrapper">
            <span className="beforeDay">前一天</span>
            <span className="dateSelector"></span>
            <span className="afterDay">后一天</span>
        </div>
    )
}
