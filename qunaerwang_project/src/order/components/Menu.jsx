import React, { useCallback } from 'react';
import PropTypes from "prop-types";
import '../CSS/Menu.scss';

import {
    LICENCE_TYPE,
    TICKET_NAME,
    FOLLOW_ADULT,
    GENDER,
} from "../store/config";

function MenuList(props){
    const { info, handleUpdateVal } = props;

    if(info.data){
        if(
            info.type === GENDER || 
            info.type === LICENCE_TYPE || 
            info.type === TICKET_NAME
        ){
            return (
                info.data.map(item => 
                    <div key={item} onClick={() => handleUpdateVal(item)}
                        className={info.active === item ? "active" : ""}
                    >
                        {item}
                    </div>
                )
            )
        }else{
            return (
                info.data.map(item => 
                    <div key={item.adultId} onClick={() => handleUpdateVal(item)}
                        className={info.active === item.adultId ? "active" : ""}
                    >
                        {item.name}
                    </div>
                )
            );
        }
    }else{
        return null;
    }
}

MenuList.propTypes = {
    info: PropTypes.object.isRequired,
    handleUpdateVal: PropTypes.func.isRequired,
};


export default function Menu(props) {
    const { 
        info, 
        setIsShowCertificateFrame, 
        isShowCertificateFrame,
        updateMember,
        updateTicketName,
    } = props;
    const { id, type } = info;

    const handleHideDialog = useCallback(() => {
        setIsShowCertificateFrame(false);
    },[setIsShowCertificateFrame]);

    const handleUpdateVal = useCallback((item) => {
        setIsShowCertificateFrame(false);
        switch(type){
            case FOLLOW_ADULT:
                updateMember(id, { followAdult: item.adultId });
                break;
            case LICENCE_TYPE:
                updateMember(id, { licenceType: item });
                break;
            case TICKET_NAME:
                updateTicketName(id, item);
                break;
            default: updateMember(id, { gender: item })
        }
    },[setIsShowCertificateFrame, type, updateMember, id, updateTicketName]);
    
    return (
        <div className={isShowCertificateFrame ? "transparent-mask transition" : "transparent-mask"}>
            <div className="mask" onClick={handleHideDialog}></div>
            <div className="ticketType-dialog">
                <div className="close-btn">
                    <i className="iconfont" onClick={handleHideDialog}>&#xe606;</i>
                </div>
                <MenuList
                    info={info}
                    handleUpdateVal={handleUpdateVal}
                    updateTicketName={updateTicketName}
                />
            </div>
        </div>
    );
}

Menu.propTypes = {
    info: PropTypes.object.isRequired,
    setIsShowCertificateFrame: PropTypes.func.isRequired,
    isShowCertificateFrame: PropTypes.bool.isRequired,
    updateMember: PropTypes.func.isRequired,
    updateTicketName: PropTypes.func.isRequired,
};