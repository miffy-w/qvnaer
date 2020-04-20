import { useState, useEffect } from "react";

export default function useWinSize() {
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    const [height, setHeight] = useState(document.documentElement.clientHeight);

    const onResize = () => {
        setHeight(document.documentElement.clientHeight);
        setWidth(document.documentElement.clientWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', onResize, false);

        // 组将将要卸载时会调用这个函数
        return () => {
            window.removeEventListener('resize', onResize, false);
        }
    },[]);

    return { width, height };
}