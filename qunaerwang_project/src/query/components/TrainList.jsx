import React, { useMemo } from "react";
import PropTypes from "prop-types";
import URI from "urijs";

import "../CSS/TrainList.scss";

function ListItem(props){
    const { 
        dTime,
        aTime,
        aStation,
        dStation,
        trainNumber,
        trainStatusDes,
        ticketInfos,
        date,
        time,
        priceMsg,
        dayAfter,
        dCity,
        aCity,
    } = props.info;
    
    const url = useMemo(() => new URI("ticket.html")
        .setSearch('startCity', dCity)
        .setSearch('aStation', aStation)
        .setSearch('endCity', aCity)
        .setSearch('dStation', dStation)
        .setSearch('trainNum', trainNumber)
        .setSearch('searchType', 'stasta')
        .setSearch('seatType', '二等座')
        .setSearch('date', date)
        .setSearch('dptHm', dTime)
        .setSearch('searchArr', aCity)
        .setSearch('searchDep', dCity)
        .setSearch('needRecommondLess', 1)
        .setSearch('bd_source', 'qunar')
        .setSearch('msign','undefined')
        .setSearch('_', Date.now())
        .toString(),
    [aStation, dStation, date, trainNumber, dCity, aCity, dTime]);

    const getTicketInfos = useMemo(() => (ticketInfo, info) => {
        var result = "";
        if(Array.isArray(ticketInfo)){
            for(let i = 0;i < ticketInfo.length;i ++){
                var item = ticketInfo[i];
                if(item.count > 0){
                    result = (item.type + item.count);
                    break;
                }
            }
        }
        if(!result) return info;
        return result + '张';
    },[]);


    return (
        <a className="aLink" href={url}>
            <table>
                <tbody>
                    <tr>
                        <td>{dTime}</td>
                        <td className="mark">
                            <span className="display">始</span>
                            {dStation}
                        </td>
                        <td>{trainNumber}</td>
                        <td className="ticketPrice">{trainStatusDes === "已发车" ? "已停运" : priceMsg}</td>
                    </tr>
                    <tr>
                        <td className="dayAfter">{aTime}
                            <i className="dayAfter">{dayAfter}</i>
                        </td>
                        <td className="mark">
                            <span></span>
                            {aStation}
                        </td>
                        <td>{time}</td>
                            
                        <td>
                            { trainStatusDes === "已发车" ? "" : getTicketInfos(ticketInfos, "无票") }
                        </td>
                    </tr>
                </tbody>
            </table>
        </a>
    );
}

ListItem.propTypes = {
    info: PropTypes.shape({
        time: PropTypes.string.isRequired,
        priceMsg: PropTypes.string.isRequired,
        dTime: PropTypes.string.isRequired,
        aTime: PropTypes.string.isRequired,
        dStation: PropTypes.string.isRequired,
        aStation: PropTypes.string.isRequired,
        trainNumber: PropTypes.string.isRequired,
        ticketInfos: PropTypes.array.isRequired
    })
};

export default ListItem;