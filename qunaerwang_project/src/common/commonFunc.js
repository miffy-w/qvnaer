export const debounce = (fn,delay) => {
    let timer;
    return function(){
        clearTimeout(timer);
        let args = arguments,
            self = this;
        timer = setTimeout(() => {
            fn.apply(self,args);
        },delay || 500);
    }
}

export const getTodayFirstTime = (date) => {
    // 把获得的时间戳的 小时、分钟、秒、毫秒都设置成零（就变成了这一天到来的第一个时刻）
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay(),
        time: date.getTime(),        // 返回毫秒时间戳
        nowDateObj: date    // 返回这个对象
    }
}
