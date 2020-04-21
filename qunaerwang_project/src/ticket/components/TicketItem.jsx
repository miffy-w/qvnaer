import React from "react";

import "../CSS/TicketItem.scss";
import Purchase from "./Purchase";

function TicketItem(props){
    const { info: { name, price, desc }, idx, toggle, expendedIdx } = props;

    return (
        <div className="ticket-item-wrapper">
            <div className="wrapper" onClick={() => toggle(idx)}>
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
                        { idx === expendedIdx ? "收起" : "预定" }
                    </span>
                </div>
            </div>

            <Purchase idx={idx} expendedIdx={expendedIdx} />
        </div>
    );
}

export default TicketItem;