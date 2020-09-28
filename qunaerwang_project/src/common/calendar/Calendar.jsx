import React,{ useState,useEffect,Fragment,useCallback,useContext, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../../index/store/actions';
import './Calendar.scss';
import Header from '../Header.jsx';
import { FromDateCtx } from '../../index/App.jsx';
import { getTodayFirstTime } from '../tools/timeTools';

const WeekBar = memo((props) => {
    // 顶部的星期导航
    const { weekArr,isGotoTop } = props;
    return (
        <ul style={isGotoTop ? {top: '0'} : {top: '3rem'}} className="weekNavWrapper">
            {
                weekArr.map(
                    item => <li key={item}>{item}</li>
                )
            }
        </ul>
    );
});
WeekBar.propTypes = {
    weekArr: PropTypes.array,
    isGotoTop: PropTypes.bool
}

// 渲染每一周
function EveryWeek(props){
    const { year, month, weekList } = props;
    const {getThisDate, fromDate} = useContext(FromDateCtx);

    // nowDate-td: 表示刚好是这一天
    // pastDate-td：表示已经过去的日期
    // laterDate-td：表示还没有过去的日期
    // weekedDate-td：表示没有过去的日期是周日

    function getClassName(year,month,day){
        var date = new Date();
        var resultStr = 'laterDate-td';
        if(!day) return resultStr;
        if(date.getMonth() + 1 === month){      // 是同一个月
            if(date.getDate() < day){      // 现在的日期号小于传入的日期号
                var d = new Date(new Date().setDate(day)).getDay();
                if(d === 0 || d === 6){
                    resultStr = 'weekedDate-td';     // 检验是不是周日/周六
                }
            }else if(date.getDate() === day){      // 刚好是同月同日
                resultStr = 'nowDate-td';
            }else{
                resultStr = 'pastDate-td';
            }
        }else{      // 现在的月份大于传入的月份，这里只有跨年的情况，或者本来就小于传入的月份
            var D = new Date();
            D.setFullYear(year);
            D.setMonth(month - 1);
            D.setDate(day);
            if(D.getDay() === 0 || D.getDay() === 6){
                resultStr = 'weekedDate-td';
            }
        }
        // 是不是选中状态
        if(
            fromDate.year === year &&
            fromDate.month === month &&
            fromDate.date === day
        ) {
            resultStr += ' selected-td';
        }
        return resultStr;
    }
    return (
        <tr className="week-tr">
            {
                weekList.map((item,index) => {
                    return <td
                        onClick={(e) => getThisDate({year,month,date:item}, e) }
                        className={ getClassName(year,month,item) } 
                        key={index}
                    >{item}</td>;
                })
            }
        </tr>
    );
}
EveryWeek.propTypes = {
    year: PropTypes.number, 
    month: PropTypes.number, 
    weekList: PropTypes.array
}

// 渲染每日一个月
function EveryMonth(props){
    const { year, month, dateList } = props;
    
    const cutList = useCallback(function (){
        let i = 0,      // 这个是为了分割数组（七个一组去渲染每一周） 
        weekList = [];
        while (true) {
            let temp = dateList.slice(i*7, (++i) * 7);
            if (!temp.length) {
                break;
            }
            weekList.push(temp);
        }
        return weekList;
    },[dateList]);

    return (
        <Fragment>
            <thead>
                <tr>
                    <th colSpan="7">{year}年{month}月</th>
                </tr>
            </thead>
            <tbody>
                {
                    cutList().map((item,index) => (
                        <EveryWeek 
                            key={index}
                            year={year}
                            weekList={ item }
                            month={ month }
                        />)
                    )
                }
            </tbody>
        </Fragment>
    );
}
EveryMonth.propTypes = {
    year: PropTypes.number, 
    month: PropTypes.number, 
    dateList: PropTypes.array
}

// 里面的日期表
function DateList(props){
    const { dateDataList } = props;
    return (
        <table className="dateTable">
            {
                dateDataList.map(item => {
                    // 深层解构
                    const { monthObj: { month, year }, dateList } = item;
                    return <EveryMonth year={year} month={ month } dateList={ dateList } key={month} />;
                })
            }
        </table>
    );
}
DateList.propTypes = {
    dateDataList: PropTypes.array
}

function Calendar(props) {
    const { listenScroll, isGotoTop, dispatch } = props;

    let [weekArr,setWeekArr] = useState([]);
    // 这个 state 存储三个月的日期信息
    let [dateList,setDateList] = useState([]);

    const getThisMonthData = useCallback(function (date){
        var nowDayData = getTodayFirstTime(date),
            month = nowDayData.month,
            year = nowDayData.year,
            // 这个变量是这个月的第一天的 firstTime
            firstTimeThisMonth = nowDayData.nowDateObj.setDate(1),
            // 找到这个月的第一天星期几：
            firstWeek = new Date(firstTimeThisMonth).getDay(),
            nowMonthNum = month === 2 ?
                // 当是二月时，判断是韵年还是平年（韵年的规律是：四年一闰,百年不闰,四百年再闰）
                (((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28) :
                // 当不是二月时，判断是 31 月份还是 30 月份（规律是：六月之前的月份基数31天，六月之后的月份偶数是31天）
                (month <= 7 ? (month % 2 === 0 ? 30 : 31) : (month % 2 === 0 ? 31 : 30)),

            // 找到 这个月最后一天星期几：
            lastWeek = new Date(new Date(firstTimeThisMonth).setDate(nowMonthNum)).getDay();

        // 生成一个数组，这个数组是为了存入日期号
        var dateList = [];
        for (let i = 1; i <= nowMonthNum; i++) {
            dateList.push(i);
        }
        // 分别判断这个月的第一天和最后一天是周几，然后在数组中追加空值，达到日期号准确的对应周几
        dateList = new Array(firstWeek).fill(null).concat(dateList);
        dateList = dateList.concat(new Array(6 - lastWeek).fill(null));

        // 通过对象存入相关数据：
        let monthObj = {
            monthNum: nowMonthNum,     // 月份天数
            firstWeek,       // 找到这个月的第一天（一号）星期几
            lastWeek,       // 这个月的最后一天是星期几
            month,         // 这个月的月份
            year
        };

        return { monthObj,dateList };
    },[]);

    // 这里监听滚动事件
    useEffect(() => {
        // 这里是为了取消多余的订阅，避免内存泄漏
        // useEffect 可以模拟 componentWillUnmout 生命周期函数
        window.removeEventListener('scroll', listenScroll);
        setWeekArr(["日","一","二","三","四","五","六"]);
        // 找到 星期导航的高度
        window.addEventListener('scroll',listenScroll);

        return () => {
            window.removeEventListener('scroll', listenScroll);
        };
    }, [listenScroll]);

    // 这里是为了生成所有日期的数据
    useEffect(() => {
        // 现在这个月
        const nowDate = getThisMonthData(new Date());

        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        date.setDate(1);
        // nowDate.monthObj.month 是正确的日期对应关系，即：1 就是 1 月份
        // 而 JavaScript 中的 month 0 才表示 1 月份
        date.setMonth(nowDate.monthObj.month);

        // 之后的一个月份
        const nextDate = getThisMonthData(date);

        date.setMonth(nextDate.monthObj.month);
        // 最后一个月份
        const lastDate = getThisMonthData(date);
        // 存入 state：
        setDateList([nowDate,nextDate,lastDate]);
    },[getThisMonthData]);

    const hideCalendar = useCallback(function(){
        var isShowCalendar = JSON.parse(sessionStorage.getItem("isShowCalendar"));
        if(isShowCalendar){
            dispatch(actions.gotoCalendar(false));
            // sessionStorage.setItem("isShowCalendar",false);
        }
    },[dispatch]);

    return (
        // 最顶部组件消失后，日历组件定位到页面最顶部
        <div className="calendarWrapper">
            <div className="top-fixed"> 
                <Header title="日期选择" goback={hideCalendar} />
                <WeekBar isGotoTop={isGotoTop} weekArr={weekArr} />
            </div>
            <DateList dateDataList={ dateList } />
        </div>
    )
}
Calendar.propTypes = {
    listenScroll: PropTypes.func.isRequired, 
    isGotoTop: PropTypes.bool.isRequired,
    hideCalendar: PropTypes.func,
}

var mapDispatchToProps = function(dispatch){
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(Calendar);