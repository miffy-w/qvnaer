import React from 'react';
import "../CSS/Recommend.scss";

const Recommend = () => {
    return (
        <>
            <div className="seatType">
                <span className="tip">坐席</span>
                <span>
                    <span>硬座</span>
                    <span className="price">￥177.5</span>
                </span>
            </div>
            <div className="recommend-wrapper">
                <div className="left">
                    <span>推荐登录12306账号</span><br />
                    <span>登录后专享极速出票特权</span>
                </div>
                <div className="right">
                    <i className="iconfont">&#xeb99;</i>
                </div>
            </div>
        </>
    );
}

export default Recommend;
