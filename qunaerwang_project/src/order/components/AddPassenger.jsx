import React, { useCallback, useMemo } from 'react';
import PropTypes from "prop-types";
import "../CSS/AddPassenger.scss";

import {
    GENDER,
    LICENCE_TYPE,
    TICKET_NAME,
    FOLLOW_ADULT,
} from "../store/config";

function Passenger(props){

    const {
        id,
        name,
        followAdult,
        ticketType,
        gender,
        birthday,
        phoneNumber,
        licenceNo,
        licenceType,
        ticketName,
        removePassenger,
        updateMember,
        handleShowFrame,
        genderList,
        cerTypeList,
        ticketTypeList,
        getAdultNameList,
        getAdultName,
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
                    {
                        isAdult && (
                            <span className="ticketBtn" 
                                onClick={() => handleShowFrame(ticketTypeList, id, TICKET_NAME, ticketName)}
                            >
                                { ticketName }
                                <span className="rotate">
                                    <i className="rotate iconfont">&#xeb99;</i>
                                </span>
                            </span>
                        )
                    }
                </div>
                {
                    isAdult && (
                        <>
                            <div className="certificate wrapper">
                                <div className="title" 
                                    onClick={(e) => handleShowFrame(cerTypeList, id, LICENCE_TYPE, licenceType) }>
                                        { licenceType }
                                    <span className="rotate">
                                        <i className="iconfont rotate">&#xeb99;</i>
                                    </span>
                                </div>
                                <input placeholder="证件号码" type="text" name="certificate"
                                    value={licenceNo}
                                    onChange={(e) => updateMember(id, { licenceNo: e.target.value })}
                                />
                            </div>

                            <div className="phone wrapper">
                                <div className="title">手机号</div>
                                <input placeholder="建议填写乘客本人手机号 否则影响出行" type="text" name="phone"
                                    value={phoneNumber}
                                    onChange={(e) => updateMember(id, { phoneNumber: e.target.value })}
                                />
                            </div>
                        </>
                    )
                }
                {
                    !isAdult && (
                        <>
                            <div className="gender right-arrow wrapper">
                                <div className="title">性别</div>
                                <input placeholder="性别" type="text" name="certificate"
                                    value={gender}
                                    readOnly onClick={(e) => handleShowFrame(genderList, id, GENDER, e.target.value)}
                                />
                                <span className="rotate" onClick={() => handleShowFrame(genderList, id, GENDER)}>
                                    <i className="iconfont">&#xeb99;</i>
                                </span>
                            </div>

                            <div className="followAdult right-arrow wrapper">
                                <div className="title">同行人</div>
                                <input placeholder="" type="text" name="certificate"
                                    readOnly
                                    value={getAdultName(followAdult)}       // 通过 id 拿到成年人的名字
                                    // 最后一个参数应传入 followAdult，表示当前儿童对应的成年人的 id
                                    onClick={(e) => handleShowFrame(getAdultNameList, id, FOLLOW_ADULT, followAdult)}
                                />
                                <span className="rotate">
                                    <i className="iconfont">&#xeb99;</i>
                                </span>
                            </div>

                            <div className="birthday wrapper">
                                <div className="title">出生日期</div>
                                <input placeholder="如：2005-10-15" type="text" name="phone"
                                    value={birthday}
                                    onChange={(e) => updateMember(id, { birthday: e.target.value })}
                                />
                            </div>
                        </>
                    )
                }
                
            </div>
        </form>
    );
}

Passenger.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ticketType: PropTypes.string.isRequired,
    gender: PropTypes.string,
    followAdult: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    birthday: PropTypes.string,
    licenceNo: PropTypes.string,
    removePassenger: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
    genderList: PropTypes.array.isRequired,
    cerTypeList: PropTypes.array.isRequired,
    ticketTypeList: PropTypes.array.isRequired,
    handleShowFrame: PropTypes.func.isRequired,
    getAdultNameList: PropTypes.array.isRequired,
    getAdultName: PropTypes.func.isRequired,
};

const AddPassenger = (props) => {
    const {
        genderList,
        cerTypeList,
        ticketTypeList,
        members,
        createAdult,
        createChild,
        removePassenger,
        updateMember,
        handleShowFrame,
    } = props;

    const getAdultNameList = useMemo(() => {
        return members.filter(item => item.ticketType === "adult")
            .map(item => ({ name: item.name, adultId: item.id }));
    },[members]);

    const getAdultName = useCallback((id) => {
        let member = members.find(item => item.ticketType === "adult" && item.id === id);
        if(member){
            return member.name;
        }
        return "";
    },[members]);

    return (
        <div className="add-passenger-wrapper">
            {
                members.map(member => {
                    return <Passenger 
                        key={member.id} 
                        removePassenger={removePassenger}
                        updateMember={updateMember}
                        genderList={genderList}
                        cerTypeList={cerTypeList}
                        ticketTypeList={ticketTypeList}
                        handleShowFrame={handleShowFrame}
                        getAdultNameList={getAdultNameList}
                        getAdultName={getAdultName}
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
    cerTypeList: PropTypes.array.isRequired,
    genderList: PropTypes.array.isRequired,
    ticketTypeList: PropTypes.array.isRequired,
    createAdult: PropTypes.func.isRequired,
    createChild: PropTypes.func.isRequired,
    members: PropTypes.array.isRequired,
    removePassenger: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
};

export default AddPassenger;
