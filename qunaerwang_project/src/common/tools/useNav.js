import { getTodayFirstTime } from "./timeTools";
import { useCallback } from "react";

export default function useNav(dispatch, departDate, prevDate, nextDate){
    // 前一天、后一天的逻辑
    const isPrevDisable = getTodayFirstTime(departDate.time).time <= getTodayFirstTime().time;
    // 后一天是否禁用（20天）
    const isNextDisable = getTodayFirstTime(departDate.time).time - getTodayFirstTime().time > 20 * 86400 * 1000;
    const prev = useCallback(() => {
        if(isPrevDisable)   return;
        dispatch(prevDate());
    },[isPrevDisable,dispatch, prevDate]);
    const next = useCallback(() => {
        if(isNextDisable)   return;
        dispatch(nextDate());
    },[dispatch, isNextDisable, nextDate]);
    
    return {
        isNextDisable,
        isPrevDisable,
        prev,
        next
    };
}