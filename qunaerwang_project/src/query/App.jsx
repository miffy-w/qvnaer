import React,{ useEffect,useCallback } from 'react';
import { connect } from 'react-redux';
import {actions} from './store/actions';
import './App.css';

import DateNav from './components/DateNav.jsx';
import Header from '../common/Header.jsx';

import { URLQuery } from '../common/tools/URLQuery';

function App(props){

    const { dispatch, queryObj } = props;

    useEffect(() => {
        var queryObj = URLQuery(window.location.href);
        if(!queryObj.searchType) queryObj.searchType = false;
        dispatch(actions.getInitQueryObj(queryObj));
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