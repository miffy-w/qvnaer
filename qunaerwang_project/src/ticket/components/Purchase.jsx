import React, { useCallback } from "react";
import PropTypes from "prop-types";

import "../CSS/Purchase.scss";

function Purchase(props){
    const { idx, expendedIdx } = props;

    const gotoOrderPage = useCallback(() => {
        const search = window.location.search;
        window.location.href = "/order.html" + search;
    },[]);

    return (
        <div className={ idx === expendedIdx ? "purchase-wrapper show" : "purchase-wrapper" }>
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
                <div onClick={gotoOrderPage} className="btn">
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

Purchase.propTypes = {
    idx: PropTypes.number.isRequired,
    expendedIdx: PropTypes.number.isRequired,
};

export default Purchase;