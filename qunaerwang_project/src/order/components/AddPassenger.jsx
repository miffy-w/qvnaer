import React from 'react';
import "../CSS/AddPassenger.scss";

function PassengerForm(){
    return (
        <form id="passenger-form">
            <div className="hideBtn">
                <span>—</span>
            </div>

            <div className="form-wrapper">
                <div className="name wrapper">
                    <div className="title">性名</div>
                    <input type="text" placeholder="乘客性名" name="name"/>
                    <span className="ticketBtn">
                        成人票
                        <span className="rotate">
                            <i className="rotate iconfont">&#xeb99;</i>
                        </span>
                    </span>
                </div>

                <div className="certificate wrapper">
                    <div className="title">身份证
                        <span className="rotate">
                            <i className="iconfont rotate">&#xeb99;</i>
                        </span>
                    </div>
                    <input placeholder="证件号码" type="text" name="certificate"/>
                </div>

                <div className="phone wrapper">
                    <div className="title">手机号</div>
                    <input placeholder="建议填写乘客本人手机号 否则影响出行" type="text" name="phone"/>
                </div>
            </div>
        </form>
    );
}

const AddPassenger = () => {
    return (
        <div className="add-passenger">
            <div className="add">
                添加成人
            </div>
            <div className="add">
                添加儿童
            </div>
        </div>
    );
}

export { AddPassenger, PassengerForm };
