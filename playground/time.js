// const moment = require('moment');
//
// var date = moment();
// var date1 = date.format('h:mm:ss a Z');
// console.log(date.format('h:mm a'));
//
// console.log(date1);


const moment = require('moment');

var createdAt = moment().valueOf();
var date = moment(createdAt);

console.log(date.format('h:mm:ss a Z'));
