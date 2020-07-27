import React, { memo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const tipStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: '1000',
    padding: '.4rem 1rem',
    minWidth: '75%',
    background: 'rgba(0,0,0,.8)',
    borderRadius: '10px',
    textAlign: 'center',
    color: 'white',
    transform: 'translate(-50%, -50%)',
};

function Tip(props){
    const tip = useRef(null);
    const { cb } = props;
    useEffect(() => {
        let timer = setTimeout(() => {
            tip.current.style.display = "none";
            cb && typeof cb === 'function' && cb();
        }, props.timeout || 1000);

        return () => {
            clearTimeout(timer);
        }
    },[props.timeout, tip, cb]);

    return createPortal(
        <div ref={tip} style={tipStyle}>{props.title}</div>,
        document.getElementById('root')
    );
}

export default memo(Tip);