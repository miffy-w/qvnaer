import React,{ useRef, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import pad from "pad";

import useWinSize from "../../common/tools/useWinSize";
import { Title } from "./Screening";

const MIN_TIME_INTERVAL = 2;        // 最小的时段是两小时
function Slider(props){
    const {
        title,
        currentStartHours,      // 时间段的前一部分
        currentEndHours,        // 时间段的后一部分
        onStartChanged,         // 前一段时间有变化
        onEndChanged            // 后一段时间有变化
    } = props;

    const winSize = useWinSize();
    const startHandle = useRef(null);
    const endHandle = useRef(null);

    const lastStartX = useRef(null);
    const lastEndX = useRef(null);
    const range = useRef(null);
    const rangeWidth = useRef(null);    // 滑块的长度

    // 这里只会触发一次，也就是说当设置重置按钮时，是不会影响到这里的
    // 想要重置成功，就需要显式的调用 setStart(currentStartHours / 24 * 100) 才可以
    const [start, setStart] = useState(() => currentStartHours / 24 * 100);     // 初始是 0
    const [end, setEnd] = useState(() => currentEndHours / 24 * 100);           // 初始是 100

    /*
    *   这里是为了实现当点击重置时，时间滑块组件也能重置
    *   useRef 会在每次渲染时返回同一个 ref 对象
    *   变更 .current 属性不会引发组件重新渲染。
    */
    const prevCurrentStartHours = useRef(currentStartHours);        // 保存初始的时间
    const prevCurrentEndHours = useRef(currentEndHours);            // 保存结束的时间
    // 如果不相等，就让 start 先变化，然后让 ref.current 等于之前的 start
    // currentStartHours 每次都是会变化的，点击重置时，它会变成 0，因此需要在这里使用 setStarte 可以更新内容，不然重置按钮不起效果
    // 使用 ref 是为了防止调用 setStart 导致循环引用，当调用 setStart 时，这是异步更新的，后面的 prev.current 会先执行完
    // setStart 执行完回调之后，prev.current 与 start 是相等的，就不会再次触发 setStart 函数
    if(prevCurrentStartHours.current !== currentStartHours){
        setStart(currentStartHours / 24 * 100);
        prevCurrentStartHours.current = currentStartHours;
    }
    if(prevCurrentEndHours.current !== currentEndHours){
        setEnd(currentEndHours / 24 * 100);
        prevCurrentEndHours.current = currentEndHours;
    }

    const startPercent = useMemo(() => {        // 左边的百分比
        if(start > 100)     return 100;
        if(start < 0)       return 0;
        return start;
    },[start]);

    const endPercent = useMemo(() => {      // 右边的百分比
        if(end > 100)       return 100;
        if(end < 0)         return 0;
        return end;
    },[end]);

    const startHours = useMemo(() => {      // 起始时间
        return Math.round(startPercent * 24 / 100);
    },[startPercent]);
    const endHours = useMemo(() => {        // 结束时间
        return Math.round(endPercent * 24 / 100);
    },[endPercent]);

    const startText = useMemo(() => {       // 展示时间的文字
        // pad 是一个字符串填充库
        return pad(2,String(startHours), '0') + ':00';
    },[startHours]);
    const endText = useMemo(() => {
        return pad(2,String(endHours) ,'0') + ':00';
    },[endHours]);

    function onStartTouchBegin(e){      // touchDown 时，获取到相对于整个 HTML 文档左边沿的的 X 坐标
        const touch = e.targetTouches[0];
        lastStartX.current = touch.pageX;
    }
    function onEndTouchBegin(e){       // 获取到整个 HTML 文档左边沿的 X 坐标
        const touch = e.targetTouches[0];
        lastEndX.current = touch.pageX;
    }

    function onStartTouchMove(e){       // 移动的是时候，用当前的 pageX 减去上一次的 pageX 得到差值
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastStartX.current;
        lastStartX.current = touch.pageX;
        // 相差两个小时，往右滑，distance 因此大于 0
        if(distance > 0 && startHours - endHours >= -2){
            if(start >= 100 - MIN_TIME_INTERVAL / 24 * 100) {
                // 这样，滑动速度再快，也总是相隔两个小时
                setStart(100 - MIN_TIME_INTERVAL / 24 * 100);
                return;
            }
            // 先更新 end，不然 start 可能会跑到 end 后面去（手速很快时就有可能）
            setEnd(end + (distance / rangeWidth.current) * 100);
            setStart(start + (distance / rangeWidth.current) * 100);
        }else{
            // 差值除以总长度乘以 100 得到百分比
            setStart(start => start + (distance / rangeWidth.current) * 100);
        }
    }
    function onEndTouchMove(e){
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastEndX.current;
        lastEndX.current = touch.pageX;
        // 相差两个小时，向左滑，因此 distance 小于 0
        if(distance < 0 && startHours - endHours >= -2){
            if(end <= 100 - (24 - MIN_TIME_INTERVAL) / 24 * 100) {
                // 这样，滑动速度再快，也总是相隔两个小时
                setEnd(100 - (24 - MIN_TIME_INTERVAL) / 24 * 100);
                return;
            }
            // 先更新 start，不然 end 可能会跑到 start 前面去
            setStart(start + (distance / rangeWidth.current) * 100);
            setEnd(end + (distance / rangeWidth.current) * 100);
        }else{
            setEnd(end => end + (distance / rangeWidth.current) * 100);
        }
    }

    useEffect(() => {
        // 获取到总长度
        rangeWidth.current = parseFloat(
            window.getComputedStyle(range.current).width
        );
    },[winSize.width]);

    useEffect(() => {
        startHandle.current.addEventListener(
            'touchstart',
            onStartTouchBegin,
            false
        );
        startHandle.current.addEventListener(
            'touchmove',
            onStartTouchMove,
            false
        );
        endHandle.current.addEventListener(
            'touchstart',
            onEndTouchBegin,
            false
        );
        endHandle.current.addEventListener(
            'touchmove',
            onEndTouchMove,
            false
        );
        // 别忘了在组件将要卸载时把事件移除，以免内存泄漏
        return () => {
            startHandle.current.removeEventListener(
                'touchstart',
                onStartTouchBegin,
                false,
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
            startHandle.current.removeEventListener(
                'touchmove',
                onStartTouchMove,
                false,
            );
            endHandle.current.removeEventListener(
                'touchstart',
                onEndTouchBegin,
                false,
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
            endHandle.current.removeEventListener(
                'touchmove',
                onEndTouchMove,
                false,
            );
        }
    });

    useEffect(() => {
        onStartChanged(startHours);
    },[startHours, onStartChanged]);
    useEffect(() => {
        onEndChanged(endHours);
    },[endHours, onEndChanged]);

    return (
        <>
            <Title>{title}</Title>
            <div className="slider-wrapper padding-wrapper">
                <div className="range-slider">
                    <div className="silder" ref={range}>
                        <div className="slider-range"
                            style={{
                                left: startPercent + '%',
                                width: endPercent - startPercent + '%',
                            }}
                        ></div>
                        {/* eslint-disable */}
                        <a
                            ref={startHandle}
                            className="slider-block slider-left"
                            href="#"
                            style={{left: startPercent + '%'}}
                        >
                            <span className="startText-adjoining">{startText}</span>
                        </a>
                        <a
                            ref={endHandle}
                            className="slider-block slider-right"
                            href="#"
                            style={{left: endPercent + '%'}}
                        >
                            <span className="endText-adjoining">{endText}</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

Slider.propTypes = {
    title: PropTypes.string.isRequired,
    currentStartHours: PropTypes.number.isRequired,
    currentEndHours: PropTypes.number.isRequired,
    onStartChanged: PropTypes.func.isRequired,
    onEndChanged: PropTypes.func.isRequired,
};

export default Slider;