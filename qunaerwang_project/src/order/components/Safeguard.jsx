import React, { memo } from 'react';
import '../CSS/Safeguard.scss';

const Safeguard = memo(() => {
    return (
        <div className="safeguard-wrapper">
            <div className="wrapper">
                <div className="tip">出行保障</div>
                <div className="title">高速出票套餐</div>
            </div>
            <div className="rotate">
                <i className="iconfont">&#xeb99;</i>
            </div>
        </div>
    )
});

export default Safeguard;
