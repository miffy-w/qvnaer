import React from 'react';
import '../CSS/BtnList.css';

export default function BtnList(props) {
    let { isShow } = props;
    return (
        <div style={{display: isShow("flex")}} className="list-wrapper">
            <div className="ticket-grabbing">
                <i className="iconfont grabbing">&#xe641;</i>
                <span>抢票</span>
            </div>

            <div className="train-abroad">
                <i className="iconfont abroad">&#xe638;</i>
                <span>火车境外</span>
            </div>

            <div className="my-order">
                <i className="iconfont order">&#xe637;</i>
                <span>我的订单</span>
            </div>        
        </div>
    )
}
