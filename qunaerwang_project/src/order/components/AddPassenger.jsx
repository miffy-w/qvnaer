import React, { useCallback } from 'react';
import PropTypes from "prop-types";
import "../CSS/AddPassenger.scss";

function PassengerForm(props){
    const { 
        setIsShowAddPerson,
        toggleIsShowCertificateFrame,
        isShowCertificateFrame,
        setNowList,
        cerTypeList,
        genderList,
        ticketTypeList,
    } = props;

    console.log('isShowCertificateFrame: ', isShowCertificateFrame);

    const handleToggleTicketFrame = useCallback(() => {
        if(!isShowCertificateFrame){
            setNowList(ticketTypeList);
        }
        toggleIsShowCertificateFrame();
    },[ticketTypeList, setNowList, toggleIsShowCertificateFrame, isShowCertificateFrame]);

    return (
        <form id="passenger-form">
            <div onClick={() => setIsShowAddPerson(false)} className="hideBtn">
                <span>—</span>
            </div>

            <div className="form-wrapper">
                <div className="name wrapper">
                    <div className="title">性名</div>
                    <input type="text" placeholder="乘客性名" name="name"/>
                    <span className="ticketBtn" onClick={handleToggleTicketFrame}>
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

PassengerForm.propTypes = {
    setIsShowAddPerson: PropTypes.func.isRequired,
    setNowList: PropTypes.func.isRequired,
    cerTypeList: PropTypes.array.isRequired,
    genderList: PropTypes.array.isRequired,
    ticketTypeList: PropTypes.array.isRequired,
};

const AddPassenger = (props) => {
    const { isShowAddPerson, setIsShowAddPerson } = props;
    const handleAddAdult = useCallback(() => {
        if(!isShowAddPerson){
            setIsShowAddPerson(true);
        }
    },[isShowAddPerson, setIsShowAddPerson]);

    return (
        <div className="add-passenger">
            <div onClick={handleAddAdult} className="add">
                添加成人
            </div>
            <div className="add">
                添加儿童
            </div>
        </div>
    );
}

AddPassenger.propTypes = {
    isShowAddPerson: PropTypes.bool.isRequired,
    setIsShowAddPerson: PropTypes.func.isRequired,
};

export { AddPassenger, PassengerForm };
