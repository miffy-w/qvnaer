// app 组件 types ： --------------------------------------->
const SHOW_CITY_SELECTOR = 'app/SHOW_CITY_SELECTOR';
const GOTO_CALENDAR = 'app/GOTO_CALENDAR';

// station 组件 types ： --------------------------------------->
const EXCHANGE_CITY = 'station/EXCHANGE_CITY';

// cityList 组件 types ： --------------------------------------->
const BACK_PREV_PAGE = 'cityList/BACK_PREV_PAGE';
const GET_CITY_DATA = 'cityList/GET_CITY_DATA';
const SELECTOR_CITY = 'cityList/SELECTOR_CITY';

const types = {
    SHOW_CITY_SELECTOR,
    EXCHANGE_CITY,
    BACK_PREV_PAGE,
    GET_CITY_DATA,
    SELECTOR_CITY,
    GOTO_CALENDAR,
}

export { types };

//------------------------- actions ---------------------------->

const exchangeCity = (from,to) => ({
    type: EXCHANGE_CITY,
    preload: [to, from]
});

const gotoCitySelector = (bool) => ({
    type: SHOW_CITY_SELECTOR,
    fromOrTo: bool,
    isGotoCitySelector: true
});

// 隐藏 cityList 组件页面：
const backPrevPage = (bool) => ({
    type: BACK_PREV_PAGE,
    isShowCityList: bool
});

function getCitysData(list,hot){
    return {
        type: GET_CITY_DATA,
        listData: list,
        hotCitys: hot
    }
}

// 获取城市列表：
const getCityList = () => {
    return (dispatch) => {
        fetch('/rest/cityList.json').then(res => {
            return res.json();
        }).then(data => {
            dispatch(getCitysData(data.data.cityList,data.data.hotCity));
        });
    }
}

// 显示日期选择页：
const gotoCalendar = (bool) => ({
    type: GOTO_CALENDAR,
    isShowCalendar: bool
}); 

const actions = {
    exchangeCity,
    gotoCitySelector,
    backPrevPage,
    getCityList,
    getCitysData,
    gotoCalendar,
};

export { actions };