import React,{ useEffect,useCallback } from 'react';
import { connect } from 'react-redux';
import {actions} from './store/actions';
import './App.css';

import Header from '../common/Header.jsx';

import DateNav from './components/DateNav.jsx';
import TrainInfo from './components/TrainInfo.jsx';
import FooterScreen from './components/FooterScreen.jsx';

import { URLQuery,serialize } from '../common/tools/URLQuery';

// 处理 jsonp 发过来的车次信息并处理
window.jsonp4 = function(data){
    if(data){
        return data;
    }else{
        console.log(-1);
    }
}

function App(props){

    const { dispatch, queryObj } = props;

    useEffect(() => {
        var queryObj = URLQuery(window.location.href);
        if(!queryObj.searchType) queryObj.searchType = false;
        // 初始化渲染头部导航信息
        dispatch(actions.getInitQueryObj(queryObj));

        // 获取车次信息
        const url = "/query.json?" + serialize(queryObj);
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // const msg = eval(data);     // eslint-disable-line no-eval
        })
        .catch((err) => console.log(err));
    },[dispatch]);

    const backToHome = useCallback(() => {
        window.history.back();
    },[]);

    return (
        <div className="query-app-wrapper">
            <div className="headerWrapper">
                <Header goback={backToHome} title={`${queryObj.fromCity} → ${queryObj.toCity}`} />
                <DateNav date={queryObj.date} />
            </div>
            <TrainInfo />
            <FooterScreen />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

const mapStateToProps = (state) => {
    return {
        queryObj: state.cityQueryReducer.cityObj,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);