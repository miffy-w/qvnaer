import React from "react";

import "../CSS/Purchase.scss";

function Purchase(){
    return (
        <div className="purchase-wrapper">
            <div className="fastPurchase">
                <div className="icon">
                    <i className="iconfont">&#xe614;</i>
                </div>
                <div className="describe">
                    <span className="title">去哪儿快速预定</span>
                    <span className="pre">
                        火车票553元+40元优惠券包,7*24小时服务
                    </span>
                </div>
                <div className="btn">
                    买票
                </div>
            </div>

            <div className="fastPurchase">
                <div className="icon">
                    <i className="iconfont">&#xe675;</i>
                </div>
                <div className="describe">
                    <span className="title">去哪儿快速预定</span>
                    <span className="pre">
                        火车票553元+40元优惠券包,7*24小时服务
                    </span>
                </div>
                <div className="btn">
                    买票
                </div>
            </div>
        </div>
    );
}

export default Purchase;