const querystring = require('querystring');
const fs = require("fs");
const superAgent = require("superagent");

const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
const COOKIE = "QN1=00003e00306c205a84e8095f; QN99=3672; QunarGlobal=10.86.213.148_-52f2184b_1707a88d944_275|1582615197444; QN601=a9c2684be1b1e18fa3f91269391a9435; _i=VInJOQ6XAvwVogf1mC-v9uc76K3q; QN48=a3037cc3-31f1-4904-8dcb-68cbe2b2009b; fid=57e4948f-a2c2-4457-9be7-78227259b6c9; QN205=auto_4e0d874a; QN277=auto_4e0d874a; csrfToken=lFDHkLY2ZAw7Uton6oZbKS31bW4exYyj; _vi=MLg0GN7BtXcNvmh_JwhXqELiwbUGBSkiuxFRqS76kT-3AEtxxFwxDWjlNjWTcIzCNTA3Wis46hlAd1C0-_SSqqRJqlQuAvzsM90e_GBoFUnnARYwNya6a97svEuI3nJpqq2EM9CsOvOZVQ9XS2JzgxK20D3c4UGI6BCFbh5cAutT; QN163=0; QN269=3CC21A00586B11EA9C55FA163E5906AD; QN6=auto_4e0d874a; QN271=e571a2d5-7231-4bd4-a088-a33f4587896a; QN66=qunar; QN300=qunar; QN267=48984623ab433e19";

function proRequest(URL){
    return superAgent.get(URL)
        .set("User-Agent", userAgent)
        .set("accept", "json")
        .set('Cookie', COOKIE)
        .then(res => res.text)
        .catch(err => err);
}

function padZero(number){
    return number < 10 ? '0' + number : number;
}

// 这个是为了获得查询的列车班次
async function getTrainNumber(info){
    const { from, to, date, onlyTickets, orderType,
        departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd,
        checkedDepartStations, checkedArriveStations, checkedTicketTypes, checkedTrainTypes
    } = info;

    const filterStation = checkedDepartStations.split(",");
    filterStation.push(...checkedArriveStations.split(","));

    let fetchUri = "https://touch.train.qunar.com/api/train/trains2s";

    let baseSearch = `?startStation=${encodeURIComponent(from)}&endStation=${encodeURIComponent(to)}&date=${date}&searchType=stasta&bd_source=qunar&from=touchindex&e=18&f=731&wakeup=1&`;

    let filterObj = {
        filterNewDepTimeRange: departTimeStart && departTimeEnd ? `filterNewDepTimeRange=${encodeURIComponent(padZero(departTimeStart) + ':00-' + padZero(departTimeEnd) + ':00')}` : '',
        filterNewArrTimeRange: arriveTimeStart && arriveTimeEnd ? `filterNewArrTimeRange=${encodeURIComponent(padZero(arriveTimeStart) + ':00-' + padZero(arriveTimeEnd) + ':00')}` : '',

        filterTicketType: checkedTicketTypes ? `filterTicketType=${checkedTicketTypes}` : '',
        filterTrainType: checkedTrainTypes ? `filterTrainType=${checkedTrainTypes}`: '',
        filterStation: filterStation.length && filterStation.join() !== "," ? `filterStation=${encodeURIComponent(filterStation.join())}` : '',
        onlyTickets: onlyTickets === "true" ? `onlyTickets=${1}` : `onlyTickets=${0}`,
        sort: `sort=${orderType}`,
    };
    fetchUri += (baseSearch + Object.values(filterObj).join('&').replace(/&{2,}/g,"&"));

    console.log(fetchUri);

    try {
        var result = await proRequest(fetchUri);
        return result;
    } catch (error) {
        return -1;
    }
}

// 这个是为了获得城市列表的提示信息
async function getCityList(info){
    const str = `https://touch.train.qunar.com/api/train/TrainStationSuggest?keyword=${querystring.escape(info.keyword)}&rtype=4&_=${+new Date()}`;
    try {
        var result = await proRequest(str);
        return result;
    } catch (error) {
        return -1;
    }
}

async function getTrainSeat(query){
    const search = "?" + querystring.stringify(query);
    const url = 'https://touch.train.qunar.com/api/train/trainSeat' + search;
    try {
        var result = await proRequest(url);
        return result;
    } catch (error) {
        return -1;
    }
}

module.exports = {
    getTrainNumber,
    getCityList,
    getTrainSeat,
}
