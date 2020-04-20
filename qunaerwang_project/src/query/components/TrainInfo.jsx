import React from 'react';
import PropTypes from "prop-types";
import ListItem from "./TrainList";

import "../CSS/TrainInfo.sass";


const TrainInfo = (props) => {
    let { trainList } = props;

    return (
        <div className="train-info-wrapper">
            {trainList.length ? trainList.map(item => {
                return <ListItem key={item.trainNumber} info={item} />
            }) : void 0}
        </div>
    );
}

TrainInfo.propTypes = {
    trainList: PropTypes.array.isRequired
};

export default TrainInfo;
