import React, { useState, memo, useCallback, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

import Slider from "./Slider";
import "../CSS/Screening.scss";

function checkedTypeReducer(state, action) {
    const { type, payload } = action;
    switch(type){
        case 'toggle':
            const newState = { ...state };
            if(payload in newState){
                delete newState[payload];
            }else{
                newState[payload] = true;
            }
            return newState;
        case 'reset': return {};
        default:
    }
    return state;
}

// 每一筛选项的标题
export const Title = memo((props) => {
    return <div className="screening-title">{props.children}</div>
});

// 重置或确定
const ResizeOrEnter = memo(({ sure, reset, noRestRequired }) => {
    return (
        <div className="resize-or-enter-wrapper">
            <span className={noRestRequired ? "disabled" : ''} onClick={reset}>重置</span>
            <span onClick={sure}>确定</span>
        </div>
    );
});
ResizeOrEnter.propTypes = {
    sure: PropTypes.func.isRequired
};

// 按钮
const Button = memo((props) => {
    const { checked, value, dispatch } = props;
    return (
        <button className={ checked ? "checkedBtn screening-btn" : "screening-btn"}
            onClick={() => dispatch({type: 'toggle',payload: value})}
        >{props.children}</button>
    );
});

Button.propTypes = {
    checked: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const Options = memo(({item}) => {
    const { title, checkedMap, list, dispatch } = item;
    return (
        <>
            <Title>{title}</Title>
            <div className="seatType-wrapper padding-wrapper">
                {
                    list.map(option =>
                        <Button key={option.value}
                                checked={option.value in checkedMap}
                                { ...option }
                                dispatch={dispatch}
                        >{option.name}</Button>
                    )
                }
            </div>
        </>
    );
});
Options.propTypes = {
    item: PropTypes.object.isRequired,
};

// 综合筛选
function Screening(props){
    const {
        setIsFilter,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTrainTypes,
        setCheckedTicketTypes,
        setCheckedArriveStations,
        setCheckedDepartStations,
        setDepartTimeEnd,
        setArriveTimeEnd,
        setDepartTimeStart,
        setArriveTimeStart,
        toggleIsFiltersVisible,
    } = props;
    // 缓冲数据
    let [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(
        checkedTypeReducer,
        checkedTicketTypes,
        (checkedTicketTypes) => {
        return { ...checkedTicketTypes };
    });
    let [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(
        checkedTypeReducer,
        checkedTrainTypes,
        (checkedTrainTypes) => {
        return { ...checkedTrainTypes };
    });
    let [localCheckedDepartStations, localCheckedDepartStationsDispatch] = useReducer(
        checkedTypeReducer,
        checkedDepartStations,
        (checkedDepartStations) => {
        return { ...checkedDepartStations };
    });
    let [localCheckedArriveStations, localCheckedArriveStationsDispatch] = useReducer(
        checkedTypeReducer,
        checkedArriveStations,
        (checkedArriveStations) => {
        return { ...checkedArriveStations };
    });

    let [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
    let [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    let [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
    let [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

    const renderList = [
        // checkedMap 表示哪些选项被选中
        { title: "坐席类型", list: ticketTypes, checkedMap: localCheckedTicketTypes,
            dispatch: localCheckedTicketTypesDispatch,
        },
        { title: "车次类型", list: trainTypes, checkedMap: localCheckedTrainTypes,
            dispatch: localCheckedTrainTypesDispatch,
        },
        { title: "出发车站", list: departStations, checkedMap: localCheckedDepartStations,
            dispatch: localCheckedDepartStationsDispatch,
        },
        { title: "到达车站", list: arriveStations, checkedMap: localCheckedArriveStations,
            dispatch: localCheckedArriveStationsDispatch,
        },
    ];

    // 不需要重置，即：筛选按钮一个都没有选中
    const noRestRequired = useMemo(() => {
        return (
            Object.keys(localCheckedTrainTypes).length === 0 &&
            Object.keys(localCheckedTicketTypes).length === 0 &&
            Object.keys(localCheckedArriveStations).length === 0 &&
            Object.keys(localCheckedDepartStations).length === 0 &&
            localDepartTimeEnd === 24 &&
            localArriveTimeEnd === 24 &&
            localDepartTimeStart === 0 &&
            localArriveTimeStart === 0
        );
    },[
        localCheckedTrainTypes,
        localCheckedTicketTypes,
        localCheckedArriveStations,
        localCheckedDepartStations,
        localDepartTimeEnd,
        localArriveTimeEnd,
        localDepartTimeStart,
        localArriveTimeStart,
    ]);

    // 点击确定后，把筛选结果存入 redux store 中
    const sure = useCallback(() => {
        if(noRestRequired){
            setIsFilter(false);
        }else{
            setIsFilter(true);
        }
        setCheckedTrainTypes(localCheckedTrainTypes);
        setCheckedTicketTypes(localCheckedTicketTypes);
        setCheckedArriveStations(localCheckedArriveStations);
        setCheckedDepartStations(localCheckedDepartStations);
        setDepartTimeEnd(localDepartTimeEnd);
        setArriveTimeEnd(localArriveTimeEnd);
        setDepartTimeStart(localDepartTimeStart);
        setArriveTimeStart(localArriveTimeStart);
        toggleIsFiltersVisible();
    },[
        localCheckedTrainTypes,
        localCheckedTicketTypes,
        localCheckedArriveStations,
        localCheckedDepartStations,
        localDepartTimeEnd,
        localArriveTimeEnd,
        localDepartTimeStart,
        localArriveTimeStart,
        noRestRequired,
        
        setIsFilter,
        setCheckedTrainTypes,
        setCheckedTicketTypes,
        setCheckedArriveStations,
        setCheckedDepartStations,
        setDepartTimeEnd,
        setArriveTimeEnd,
        setDepartTimeStart,
        setArriveTimeStart,
        toggleIsFiltersVisible,
    ]);

    const reset = useCallback(() => {
        if(noRestRequired)  return;
        localCheckedTicketTypesDispatch({type: 'reset'});
        localCheckedTrainTypesDispatch({type: 'reset'});
        localCheckedArriveStationsDispatch({type: 'reset'});
        localCheckedDepartStationsDispatch({type: 'reset'});

        setLocalDepartTimeStart(0);
        setLocalDepartTimeEnd(24);
        setLocalArriveTimeStart(0);
        setLocalArriveTimeEnd(24);
    },[noRestRequired]);

    return (
        <div className="screen-wrapper screening-mask">
            <div className="screening-content-box">
                <div className="top-wrapper">
                    <ResizeOrEnter noRestRequired={noRestRequired} reset={reset} sure={sure} />
                </div>
                {
                    renderList.map(item => (
                        <Options key={item.title} item={item} />
                    ))
                }

                <Slider
                    title="出发时间"
                    currentStartHours={localDepartTimeStart}
                    currentEndHours={localDepartTimeEnd}
                    onStartChanged={setLocalDepartTimeStart}
                    onEndChanged={setLocalDepartTimeEnd}
                />
                <Slider
                    title="到达时间"
                    currentStartHours={localArriveTimeStart}
                    currentEndHours={localArriveTimeEnd}
                    onStartChanged={setLocalArriveTimeStart}
                    onEndChanged={setLocalArriveTimeEnd}
                />

            </div>
        </div>
    );
}

Screening.propTypes = {
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,
    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
};

export default Screening;