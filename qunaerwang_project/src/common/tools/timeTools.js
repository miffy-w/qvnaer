/**
 * 防抖函数
 * @param {function} fn 
 * @param {number} delay 
 */
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

/**
 * 把获得的时间戳的 小时、分钟、秒、毫秒都设置成零（就变成了这一天到来的第一个时刻）
 * @param {number | string | Date} date
 * @return Object
 */
export const getTodayFirstTime = (date= new Date()) => {
    if(typeof date === "number"){
        date = new Date(date);
    }else if(typeof date === "string"){
        date = new Date(date.replace(/-/g,"/"));
    }
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
        nowDateObj: date,    // 返回这个对象
        toLocalStr: parseDate(date.getTime()).replace(/-/g, "/"),
        toCrossLineStr: parseDate(date.getTime())
    }
}

// 将 “2019/10/1” 的日期格式转成 “2019-10-1” 的日期格式
export function parseDate(timeNumber){
    var date = new Date();
    if(timeNumber && typeof timeNumber === "number"){
        date = new Date(timeNumber);
    }
    var str = '' + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return str;
}

/**
 * 将形如 “2019/10/1” 或者 “2019-10-1” 的日期格式转成形如 “10月1日” 的格式
 * @param {string | number} str
 */
export function parseLocalDate(str){
    var date = new Date();
    if(str){
        if(typeof str === "string"){
            var s = str.replace(/-/g,"/");
            date = new Date(s);
        }else if(typeof str === "number"){
            date = new Date(str);
        }
    }
    return date.getMonth() + 1 + "月" + date.getDate() + "日";
}

/**
 * 输入“ 2019-10-1”（ 或者“ 2019/10/1”） 的日期格式， 返回这一天周几
 * @param {string} dateStr 
 */
export function getWeek(dateStr){
    let date = new Date().getDay();
    if(dateStr instanceof Date) date = dateStr.getDay();
    if(typeof dateStr === "string"){
        var ds = dateStr.replace(/-/g, "/");
        date = new Date(ds).getDay();
    }else if(typeof dateStr === "number"){
        date = new Date(dateStr).getDay();
    }
        

    switch(date){
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2: 
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        default: return "周六";
    }
}

/**
 * 判断形如 “2019-10-1” （或者 “2019/10/1”） 的日期格式是不是今天的日期
 * @param {string} dateStr 
 */
export function isToday(dateStr){
    var dt = new Date(dateStr.replace(/\-/g, "/")),   // eslint-disable-line no-useless-escape
        today = new Date();
    if(
        dt.getFullYear() === today.getFullYear() && 
        dt.getMonth() === today.getMonth() &&
        dt.getDate() === today.getDate()
    ){
        return true;
    }
    return false;
}