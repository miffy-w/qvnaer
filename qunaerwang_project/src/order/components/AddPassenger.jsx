import React, { useCallback } from 'react';
import PropTypes from "prop-types";
import "../CSS/AddPassenger.scss";


function Passenger(props){

    const {
        id,
        name,
        followAdult,
        ticketType,
        gender,
        birthday,
        licenceNo,
        removePassenger,
        updateMember,
    } = props;

    const isAdult = ticketType === "adult";

    return (
        <form id="passenger-form">
            <div onClick={() => removePassenger(id)} className="hideBtn">
                <span>—</span>
            </div>

            <div className="form-wrapper">
                <div className="name wrapper">
                    <div className="title">性名</div>
                    <input type="text" placeholder="乘客性名" name="name"
                        value={name}
                        onChange={(e) => updateMember(id, { name: e.target.value })}
                    />
                    <span className="ticketBtn">
                        成人票
                        <span className="rotate">
                            <i className="rotate iconfont">&#xeb99;</i>
                        </span>
                    </span>
                </div>
                {
                    isAdult && (
                        <div className="certificate wrapper">
                            <div className="title">身份证
                                <span className="rotate">
                                    <i className="iconfont rotate">&#xeb99;</i>
                                </span>
                            </div>
                            <input placeholder="证件号码" type="text" name="certificate"
                                value={licenceNo}
                                onChange={(e) => updateMember(id, { licenceNo: e.target.value })}
                            />
                        </div>
                    )
                }
                {
                    !isAdult && (
                        <div className="certificate wrapper">
                            <div className="title">性别
                                <span className="rotate">
                                    <i className="iconfont rotate">&#xeb99;</i>
                                </span>
                            </div>
                            <input placeholder="性别" type="text" name="certificate"/>
                        </div>
                    )
                }

                <div className="phone wrapper">
                    <div className="title">手机号</div>
                    <input placeholder="建议填写乘客本人手机号 否则影响出行" type="text" name="phone"/>
                </div>
            </div>
        </form>
    );
}

Passenger.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ticketType: PropTypes.string.isRequired,
    gender: PropTypes.string,
    followAdult: PropTypes.number,
    birthday: PropTypes.string,
    licenceNo: PropTypes.string,
    removePassenger: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
};

const AddPassenger = (props) => {
    const { 
        isShowAddPerson, 
        setIsShowAddPerson,
        isShowCertificateFrame,
        setNowList,
        genderList,
        cerTypeList,
        ticketTypeList,
        setIsShowCertificateFrame,
        members,
        createAdult,
        createChild,
        removePassenger,
        updateMember,
    } = props;

    function handleShowFrame(list){
        if(!isShowCertificateFrame){
            setNowList(list);
        }
        setIsShowCertificateFrame(true);
    }

    return (
        <div className="add-passenger-wrapper">
            {
                members.map(member => {
                    return <Passenger 
                        key={member.id} 
                        removePassenger={removePassenger}
                        updateMember={updateMember}
                        { ...member } 
                    />
                })
            }

            <div className="add-passenger">
                <div onClick={() => createAdult()} className="add">
                    添加成人
                </div>
                <div className="add" onClick={() => createChild()}>
                    添加儿童
                </div>
            </div>
        </div>
    );
}

AddPassenger.propTypes = {
    isShowAddPerson: PropTypes.bool.isRequired,
    setIsShowAddPerson: PropTypes.func.isRequired,
    cerTypeList: PropTypes.array.isRequired,
    genderList: PropTypes.array.isRequired,
    ticketTypeList: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired,
    removePassenger: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
};

export default AddPassenger;
