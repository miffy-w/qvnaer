const qs = require('querystring');

const obj = {
    name: 1,
    age: "18"
};

console.log(qs.stringify(obj));