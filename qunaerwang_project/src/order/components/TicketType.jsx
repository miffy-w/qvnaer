import React from 'react';

import '../CSS/dialog.scss';

export default function TicketType(props) {
    const { list } = props;
    return (
        <div className="transparent-mask">
            <div className="ticketType-dialog">
                <div className="close-btn">
                    <i className="iconfont">&#xe606;</i>
                </div>
                {
                    list.map(item => <div key={item}>{item}</div>)
                }
            </div>
        </div>        
    )
}
