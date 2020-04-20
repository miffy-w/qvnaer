const superagent = require("superagent");
const qs = require("querystring");

const url = "https://touch.train.qunar.com/api/train/trains2s?startStation=%E7%99%BD%E6%B2%B3%E4%B8%9C&endStation=%E4%B8%8A%E6%B5%B7&date=2020-4-22&searchType=stasta&bd_source=qunar&from=touchindex&e=57&f=7&wakeup=1";

superagent.get(url)
    .then(res => {
        console.log("body: === ", res.text);
    }).catch(err => console.error(err));