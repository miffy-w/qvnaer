const querystring = require('querystring');
const request = require('request');

const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";

function proRequest(URL,method){
    return new Promise((resolve,reject) => {
        request({
            url: URL,
            method: method || 'GET',
            headers: {
                "User-Agent": userAgent,
            }
        },(err,res,body) => {
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
        `https://touch.train.qunar.com/api/train/trains2s?startStation=${querystring.escape(info.from)}&endStation=${querystring.escape(info.to)}&date=${info.date}&searchType=stasta&bd_source=qunar&from=touchindex&e=57&f=7&wakeup=1`:
        `https://touch.train.qunar.com/api/train/trains2s?startStation=${querystring.escape(info.from)}&endStation=${querystring.escape(info.to)}&date=${info.date}&searchType=stasta&bd_source=qunar&filterTrainType%5B%5D=1&filterTrainType%5B%5D=5&filterTrainType%5B%5D=6&from=touchindex&e=89&f=013&wakeup=1`;
    try {
        var result = await proRequest(str);
        console.log(result);
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
