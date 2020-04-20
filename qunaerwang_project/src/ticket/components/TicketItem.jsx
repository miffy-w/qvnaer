import React, { useState, useCallback } from "react";

import "../CSS/TicketItem.scss";
import Purchase from "./Purchase";

function TicketItem(props){
    const { info: { name, price, desc } } = props;
    let [toggleShowPurchase, setToggleShowPurchase] = useState(false);

    const toggle = useCallback(() => {
        setToggleShowPurchase(!toggleShowPurchase);
    },[toggleShowPurchase]);

    return (
        <div className="ticket-item-wrapper">
            <div className="wrapper" onClick={toggle}>
                <div className="item ticket-item-left">
                    <span>{name}</span>
                    <span className="price">
                        ￥{price}
                    </span>
                </div>

                <div className="item ticket-item-right">
                    <span className="ticket-state">
                        {desc}
                    </span>
                    <span className="btn">
                        预定
                    </span>
                </div>
            </div>
            
            {
                toggleShowPurchase ? <Purchase /> : ''
            }
        </div>
    );
}

export default TicketItem;