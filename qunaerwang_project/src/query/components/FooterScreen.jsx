import React from 'react';

import "../CSS/FooterScreen.sass";

const FooterScreen = () => {
    return (
        <div className="footer-screen-wrapper">
            <div className="icon-nav-wrapper">
                <i className="iconfont">&#xe74f;</i>
                <span className="icon-describe">出发 早→晚</span>
            </div>
            <div className="icon-nav-wrapper">
                <i className="iconfont">&#xe638;</i>
                <span className="icon-describe">只看高铁动车</span>
            </div>
            <div className="icon-nav-wrapper">
                <i className="iconfont">&#xe641;</i>
                <span className="icon-describe">只看有票</span>
            </div>
            <div className="icon-nav-wrapper">
                <i className="iconfont">&#xe7eb;</i>
                <span className="icon-describe">综合筛选</span>
            </div>
        </div>
    );
}

export default FooterScreen;
