import React, { memo } from 'react';
import '../CSS/Agreement.scss';

const Agreement = memo(() => {
    return (
        <>
            <div className="reminding-wrapper">
                <p>
                    据铁路要求，为加强新冠肺炎防治工作，2月1日起，购票时需提供每一名乘车人本人使用的手机，以便在需要时联络。
                </p>
                <p>
                    **未成年人/老人等重点旅客及无手机旅客。可提供监护人或能及时联系的亲友手机。
                </p>
                <p>
                    **港澳台及外籍旅客可提供邮箱。
                </p>
            </div>
            <div className="agreement-wrapper">
                <span>
                    点击提交订单表示已阅读并同意
                </span>
                <span className="highlight">
                    《预订须知》
                </span>
                <span className="highlight">
                    《火车票服务协议》
                </span>
                <span>
                    出票方：北京津渡远游信息技术有限公司
                </span>
                <span className="highlight">
                    工商执照信息
                </span>
            </div>
        </>
    )
});

export default Agreement;
