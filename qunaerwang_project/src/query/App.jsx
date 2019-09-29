import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import DateNav from './components/DateNav.jsx';
import Header from '../common/Header.jsx';

function App(props){
    return (
        <div className="query-app-wrapper">
            <div className="headerWrapper">
                <Header title="郑州 → 北京" />
                <DateNav />
            </div>
        </div>
    );
}

export default connect(
    function (state){        // mapStateToPorps
        return state
    },

    function (dispatch){     // mapDispatchToProps
        return dispatch;
    }
)(App);