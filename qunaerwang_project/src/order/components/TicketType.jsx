import React, { useCallback } from 'react';
import '../CSS/dialog.scss';

export default function TicketType(props) {
    const { list, setIsShowCertificateFrame, isShowCertificateFrame } = props;

    const handleHideDialog = useCallback(() => {
        setIsShowCertificateFrame(false);
    },[setIsShowCertificateFrame]);
    
    return (
        <div className={isShowCertificateFrame ? "transparent-mask transition" : "transparent-mask"}>
            <div className="mask" onClick={handleHideDialog}></div>
            <div className="ticketType-dialog">
                <div className="close-btn">
                    <i className="iconfont">&#xe606;</i>
                </div>
                {
                    list.map(item => <div key={item}>{item}</div>)
                }
            </div>
        </div>
    );
}
