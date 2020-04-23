import React, { useEffect, useRef } from 'react';
import PropTypes from "prop-types";

import "../CSS/Dialog.scss";

const TimetableDialog = (props) => {

    const { showDialog, setIsShowTimetable } = props;
    const dialog = useRef(null);

    useEffect(() => {
        function handleClick(e){
            if(!dialog.current.contains(e.target) && showDialog){
                setIsShowTimetable(false);
            }
        }
        document.addEventListener("click", handleClick, false);

        return () => {
            document.removeEventListener('click', handleClick, false);
        }
    },[dialog, showDialog, setIsShowTimetable]);

    return (
        <div className="dialog-mask-wrapper">
            <div ref={dialog} className="dialog-wrapper">
                <h2 className="title">列车时刻表</h2>
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>车站</th>
                                <th>到达</th>
                                <th>发车</th>
                                <th>停留时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>北京南</td>
                                <td>始发站</td>
                                <td>19:00</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>南京南</td>
                                <td>22:13</td>
                                <td>22:15</td>
                                <td>2分</td>
                            </tr>
                            <tr>
                                <td>上海虹桥</td>
                                <td>23:18</td>
                                <td>终到站</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    );
}

TimetableDialog.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    setIsShowTimetable: PropTypes.func.isRequired,
};

export default TimetableDialog;
