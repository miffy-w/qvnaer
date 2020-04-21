import React from 'react';

import '../CSS/dialog.scss';

const list = [
    '身份证',
    '护照',
    '港澳通行证',
    '台胞证'
];

export default function TicketType() {
    return (
        <div className="ticketType-dialog">
            <div className="close-btn">
                <i className="iconfont">&#xe606;</i>
            </div>
            {
                list.map(item => <div key={item}>{item}</div>)
            }
        </div>
    )
}
