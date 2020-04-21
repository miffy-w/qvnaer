import React from 'react';
import '../CSS/SubmitOrder.scss';

// 金额详情页
function AmountDetails(){
    return (
        <div className="mask">
            <div className="details">
                <p>金额详情</p>
                <div className="left">
                    <span>火车票</span>
                    <span className="price">
                        <span>￥177.5</span><span>×1份</span>
                    </span>
                </div>

                <div className="right">
                    <span>出行保障</span>
                    <span className="price">
                        <span>￥30</span><span>×1份</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function SubmitOrder() {
    return (
        <>
            {/* <AmountDetails /> */}
            <div className="submit-order-wrapper">
                <div className="total-price">
                    <span className="wrapper">
                        <span className="price">207.5
                            <br /><span className="tip">支付金额</span>
                        </span>
                        <span className="icon">
                            <i className="iconfont">&#xeb99;</i>
                        </span>
                    </span>
                </div>

                <div className="submit-btn">
                    <button className="btn">
                        提交订单
                    </button>
                </div>
            </div>
        </>
    )
}
