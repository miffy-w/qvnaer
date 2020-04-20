import React from 'react';
import PropTypes from "prop-types";

import "../CSS/FooterScreen.sass";
import { ORDER_DEPART } from '../contains';

const FooterScreen = (props) => {

    const {
        toggleHighSpeed,
        toggleIsFiltersVisible,
        toggleOnlyTickets,
        toggleOrderType,
        highSpeed,
        orderType,
        onlyTickets,
        isFiltersVisible,
        isFilter,
    } = props;
    return (
        <div className="footer-screen-wrapper">
            <div className="icon-nav-wrapper" onClick={toggleOrderType}>
                <i className="iconfont">&#xe74f;</i>
                <span className="icon-describe">
                    {orderType === ORDER_DEPART ? "出发 早→晚" : "耗时 短→长"}
                </span>
            </div>
            <div className={highSpeed ? "icon-nav-wrapper high-speed" : "icon-nav-wrapper"}
                onClick={toggleHighSpeed}
            >
                <i className="iconfont">&#xe638;</i>
                <span className="icon-describe">只看高铁动车</span>
            </div>
            <div className={onlyTickets ? "icon-nav-wrapper only-tickets" : "icon-nav-wrapper"}
                onClick={toggleOnlyTickets}
            >
                <i className="iconfont">&#xe641;</i>
                <span className="icon-describe">只看有票</span>
            </div>
            {/* 如果综合筛选的模态框打开时就改变样式，或者用户在模态框中使用了一些筛选操作也改变样式（即使模态框已经关闭） */}
            <div className={isFiltersVisible || isFilter ? "icon-nav-wrapper checked": "icon-nav-wrapper"} onClick={toggleIsFiltersVisible}>
                <i className="iconfont">&#xe7eb;</i>
                <span className="icon-describe">综合筛选</span>
            </div>
        </div>
    );
}

FooterScreen.propTypes = {
    toggleHighSpeed: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    toggleOnlyTickets: PropTypes.func.isRequired,
    toggleOrderType: PropTypes.func.isRequired,
    highSpeed: PropTypes.bool.isRequired,
    orderType: PropTypes.number.isRequired,
    onlyTickets: PropTypes.bool.isRequired,
    isFiltersVisible: PropTypes.bool.isRequired,
    isFilter: PropTypes.bool.isRequired,
};

export default FooterScreen;
