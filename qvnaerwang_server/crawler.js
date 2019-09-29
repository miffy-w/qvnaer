const querystring = require('querystring');
const request = require('request');

function proRequest(URL){
    return new Promise((resolve,reject) => {
        request(URL,(err,res,body) => {
            if(!err){
                if(res.statusCode === 200){
                    resolve(body);
                }
            }else{
                reject(err);
            }
        });
    });
}

// 这个是为了获得查询的列车班次
async function getTrainNumber(info){
    const str = info.searchType ? 
    `https://touch.train.qunar.com/api/train/trains2s?startStation=${querystring.escape(info.from)}&endStation=${querystring.escape(info.to)}&date=${info.date}&searchType=stasta&bd_source=qunar&filterTrainType=&from=touchindex&ouid=&rtype=4&wakeup=1&_=${+new Date()}&jsonpCallback=jsonp4`:
    `https://touch.train.qunar.com/api/train/trains2s?startStation=${querystring.escape(info.from)}&endStation=${querystring.escape(info.to)}&date=${info.date}&searchType=stasta&bd_source=qunar&filterTrainType%5B%5D=1&filterTrainType%5B%5D=5&filterTrainType%5B%5D=6&from=touchindex&ouid=&rtype=4&wakeup=1&_=${+new Date()}&jsonpCallback=jsonp4`;
    try {
        var result = await proRequest(str);
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


module.exports = {
    getTrainNumber,
    getCityList,
}
