import React, { useRef, useCallback, memo } from 'react';
import PropTypes from "prop-types";
import '../CSS/SubmitOrder.scss';

// 金额详情页
const AmountDetails = memo((props) => {
    const {setIsShowAmountDetailsFrame} = props;
    const bill = useRef(null);

    const hideDetailFrame = useCallback((e) => {
        if(!bill.current.contains(e.target)){
            setIsShowAmountDetailsFrame(false);
        }
    },[bill, setIsShowAmountDetailsFrame]);

    return (
        <div className="mask" onClick={hideDetailFrame}>
            <div className="details" ref={bill}>
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
});

AmountDetails.propTypes = {
    setIsShowAmountDetailsFrame: PropTypes.func.isRequired,
};

export default function SubmitOrder(props) {
    const { 
        isShowAmountDetailsFrame, 
        toggleIsShowAmountDetailsFrame,
        setIsShowAmountDetailsFrame,
        verifyForm,
    } = props;

    return (
        <>
            {
                isShowAmountDetailsFrame ? <AmountDetails 
                    setIsShowAmountDetailsFrame={setIsShowAmountDetailsFrame}
                /> : ''
            }
            <div className="submit-order-wrapper">
                <div className="total-price" onClick={() => toggleIsShowAmountDetailsFrame()}>
                    <span className="wrapper">
                        <span className="price">207.5
                            <br /><span className="tip">支付金额</span>
                        </span>
                        <span className={
                            isShowAmountDetailsFrame ? "icon rotate90": "icon"
                        }>
                            <i className="iconfont">&#xeb99;</i>
                        </span>
                    </span>
                </div>

                <div className="submit-btn">
                    <button onClick={verifyForm} className="btn">
                        提交订单
                    </button>
                </div>
            </div>
        </>
    )
}

SubmitOrder.propTypes = {
    isShowAmountDetailsFrame: PropTypes.bool.isRequired,
    toggleIsShowAmountDetailsFrame: PropTypes.func.isRequired,
};