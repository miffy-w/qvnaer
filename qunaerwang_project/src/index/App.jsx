import React,{ useCallback ,useEffect,useState,createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from './store/actions';
import './App.css';
import { getTodayFirstTime } from '../common/tools/timeTools';

import Header from '../common/Header.jsx';
import CityListPage from '../common/cityList/CityList.jsx';
import Calendar from '../common/calendar/Calendar.jsx';

import Station from './components/Station.jsx';
import StartOffDate from './components/StartOffDate.jsx';
import Button from './components/Button.jsx';
import Option from './components/Option.jsx';
import BtnList from './components/BtnList.jsx';


// 使用 Context 这里是为了解决在日期组件中的深层调用问题，同时试验一下 useContext 的使用
export const FromDateCtx = createContext();

function App(props){

    const { dispatch, isShowCityListPage, isShowCalendar } = props;

    // 是否只看高铁/动车
    let [searchType,setSearchType] = useState(false);
    let [isGotoTop, setGotoTop] = useState(false);
    // 设置CSS定位
    let [weekBar_height, setBarHeight] = useState(0);
    // 初始化时间
    const initNowDate = getTodayFirstTime(new Date()).nowDateObj;
    let [fromDate,setFromDate] = useState({
        year: initNowDate.getFullYear(),
        month: initNowDate.getMonth() + 1,
        date: initNowDate.getDate(),
        day: initNowDate.getDay(),
        time: initNowDate.getTime()
    });

    useEffect(() => {
        let fd = sessionStorage.getItem("from-date");
        if(!fd){
            sessionStorage.setItem("from-date",JSON.stringify(fromDate));
        }
        else
            setFromDate(JSON.parse(fd));
            // eslint-disable-next-line
    },[]);

    // 显示城市选择页：
    const gotoCalendar = useCallback((bool) => {
        dispatch(actions.gotoCalendar(bool));
    }, [dispatch]);

    // 监听滑动变化
    const listenScroll = useCallback(function () {
        var scrollTop = document.documentElement.scrollTop;
        // 监听事件，当向下滑动的距离大于 weekBar 的高度时，weekBar 的位置变到最顶部
        if (scrollTop > weekBar_height) {
            setGotoTop(true);
        } else {
            setGotoTop(false);
        }
    }, [weekBar_height]);

    // 根据返回的结果，判断要不要做渲染
    const getThisDate = useCallback((obj) => {
        if(!obj.date) return;
        var d = new Date();
        if(d.getMonth() + 1 === obj.month){
            if(d.getDate() > obj.date){     // 表示已经过期的时间
                return;
            }
        }
        d.setFullYear(obj.year);
        d.setMonth(obj.month - 1);
        d.setDate(obj.date);
        d = getTodayFirstTime(d).nowDateObj;

        let timeData = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            date: d.getDate(),
            day: d.getDay(),
            time: d.getTime()
        }
        setFromDate(timeData);
        dispatch(actions.gotoCalendar(false));
        sessionStorage.setItem("from-date",JSON.stringify(timeData));
    }, [dispatch]);

    // 路由回退
    const goback = useCallback(function (){
        window.history.back();
        if(isShowCalendar){
            dispatch(actions.gotoCalendar(false));
            // 在这里别忘了退出页面时，清除最后一次已经没用了的事件绑定
            window.removeEventListener('scroll',listenScroll)
        }
    }, [dispatch, isShowCalendar, listenScroll]);

    // 跳转到城市选择页面
    const gotoCitySelector = useCallback(function (bool) {
        dispatch(actions.gotoCitySelector(bool));
    },[dispatch]);

    // 设置 searchType 的状态
    const handleSearchType = useCallback((bool) => {
        setSearchType(bool);
    },[]);

    // 这里两个 useEffect 是为了让页面刷新后，也让 cityList 的页面还显示（而不是隐藏）
    useEffect(() => {
        // 获取到 城市列表的显示/隐藏情况
        var cityList_bool = sessionStorage.getItem('isShowCityList'),
        // 获取到 日历组件的显示/隐藏情况
            calendar_bool = sessionStorage.getItem('isShowCalendar');
        if (cityList_bool === 'true'){
            dispatch(actions.backPrevPage(JSON.parse(cityList_bool)));
        }
        if (calendar_bool === 'true'){
            dispatch(actions.gotoCalendar(JSON.parse(calendar_bool)));
        }
    },[dispatch]);

    useEffect(() => {
        // 存储城市列表页和日期页的显示/隐藏状态
        sessionStorage.setItem('isShowCityList', isShowCityListPage);
        sessionStorage.setItem('isShowCalendar',isShowCalendar);
    }, [isShowCityListPage, isShowCalendar]);

    // 这里获取到 weekBar 的具体高度，用以比较
    useEffect(() => {
        // 只有日期组件显示才能获取到元素及其属性值
        if(isShowCalendar){
            var offsetTop = document.querySelector('.weekNavWrapper').offsetHeight;
            setBarHeight(offsetTop);
        }
    }, [isShowCalendar]);

    const isShow = useCallback((type) => {
        var bool = JSON.parse(isShowCalendar);
        return bool ? "none" : type;
    },[isShowCalendar]);

    return (
        <div className="page">
                <div style={{display: isShow("block")}} className="header-pos">
                    <Header goback={goback} title="火车票" />
                </div>
                {/* 背景 logo */}
                <div className="train-logo"></div>
            <form 
                style={{ display: isShow("flex")}} 
                method="GET" action="/query.html" 
                className="form-wrapper">
                    {/* 城市选择组件 */}
                    <Station gotoCitySelector={gotoCitySelector} />
                    {/* 日期选择页 */}
                    <StartOffDate fromDate={fromDate} gotoCalendar={gotoCalendar} />
                    <Option handleSearchType={handleSearchType} searchType={searchType} />
                    <Button />
                </form>
                <BtnList isShow={isShow} />
            
            <div className={isShowCityListPage ? "city-selector" : "cityListhidden" }>
                <CityListPage />
            </div>

            <div
                className="train-calendar-wrapper"
                style={{display: isShowCalendar ? 'block' : 'none'}}
            >
                <FromDateCtx.Provider value={{ getThisDate, fromDate }}>
                    <Calendar
                        listenScroll={listenScroll}
                        isGotoTop={isGotoTop}
                    />
                </FromDateCtx.Provider>
            </div>
            
        </div>
    );
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired, 
    // oneOfType 表示可能是其中的任意一种类型
    // 考虑到数字存入本地存储后会变成字符类型的数据
    isShowCityListPage: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    isShowCalendar: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
}

const mapStateToProps = (state) => ({
    isShowCityListPage: state.appReducer.isShowCityListPage,
    isShowCalendar: state.appReducer.isShowCalendar,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);