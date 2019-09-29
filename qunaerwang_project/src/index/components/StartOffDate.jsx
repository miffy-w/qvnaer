import React,{ useCallback } from 'react';
import '../CSS/StartOffDate.css';
import PropTypes from 'prop-types';
import { getTodayFirstTime } from '../../common/tools/timeTools';

export default function StartOffDate(props) {
    const { gotoCalendar, fromDate } = props;

    const isShowLabel = useCallback((date) => {
        var day = getTodayFirstTime(new Date()).nowDateObj,
            today = day.getDate(),
            nowTime = day.getTime();
        if(nowTime === date.time){
            return "（今天）";
        }
        var time =  new Date(new Date(nowTime).setDate(today + 1)).getTime();
        if(time === date.time){
            return "（明天）";
        }
        time =  new Date(new Date(nowTime).setDate(today + 2)).getTime();
        if (time === date.time) {
            return "（后天）";
        }

        return "";
    },[]);

    const week = ['日','一','二','三','四','五','六']

    return (
        <div onClick={ () => gotoCalendar(true) } className="dateWrapper">
            <input
                name="date"
                className="date-hidden"
                onChange={() => {}}
                value={`${fromDate.year}-${fromDate.month}-${fromDate.date}`}
            />
            <span className="date">{fromDate.month}月{fromDate.date}日</span>
            <span className="week">周{week[fromDate.day]}</span>
            <span className="labelDay">{ isShowLabel(fromDate) }</span>
        </div>
    )
}

StartOffDate.propTypes = {
    gotoCalendar: PropTypes.func.isRequired, 
    fromDate: PropTypes.object.isRequired,
}
