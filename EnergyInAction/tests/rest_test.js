var dayFrom = '2015-9-1';
if (process.argv[2]) {
    dayFrom = process.argv[2];
} else {
    console.error('execute it as follows: node rest_test.js {YYYY-MM-DD}');
}

var dayFromTimestamp = new Date(dayFrom + " 00:00:00").getTime(); 
//console.log(dayFromTimestamp);

var baseURL = 'http://127.0.0.1:3000/';


var dailyQuery = 'api/labs/marg/energy/daily.json?day_from=' + dayFrom;
var quarterQuery = 'api/labs/marg/energy/quarters.json?base_time=' + dayFromTimestamp;
var hourQuery = 'api/labs/marg/energy/hours.json?base_time=' + dayFromTimestamp;


var Client = require('node-rest-client').Client;
var client = new Client();

var args = {
    headers : {
        "Content-Type": "application/json"
    }
};

function getDaily() {
    var requestURL = baseURL + dailyQuery;
    
    client.get(requestURL, args, function (data, response) {
        var dayObj = data[0];
        var sum = dayObj.sum;
        console.log('sum of day ' + dayFrom + ',' + sum);
        console.log('');
        console.log('per 15min,value');
        getQuarters();
    })
   
}

function getQuarters() {
    var requestURL = baseURL + quarterQuery;
    
    client.get(requestURL, args, function (data, response) {
        //console.log('list 15min data: ');
        var total = 0;
        for (var i = 0; i < data.length; i++) {
            var dayObj = data[i];
            var sum = dayObj.sum;
            console.log('sum of ' + (dayObj.dateFrom) + ',' + sum);
            total += sum;
        }
        console.log('');
        console.log('15min total,' + total);
        console.log('');
        console.log('per hour,value');
        getHours();
    })
}

function getHours() {
    var requestURL = baseURL + hourQuery;
    
    client.get(requestURL, args, function (data, response) {
        //console.log('list 15min data: ');
        var total = 0;
        for (var i = 0; i < data.length; i++) {
            var dayObj = data[i];
            var sum = dayObj.sum;
            console.log('sum of ' + (dayObj.dateFrom) + ',' + sum);
            total += sum;
        }
        console.log('');
        console.log('hour total,' + total);
    })
}

console.log('daily, value');
getDaily();
