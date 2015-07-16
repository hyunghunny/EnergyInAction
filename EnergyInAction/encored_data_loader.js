var Client = require('node-rest-client').Client;
client = new Client();

var baseURL = 'http://api.ongetit.com/1.1/';
var site_id = 'beff61ce9d7b67adbb357de8332db1995c319d15';
var auth_key = "Basic YjZhMDdlYjc4YTE3NDEwMmJmMmY2YzQ0OWYxOTIwOTc=";

var device_id = {
    'hcc' : 'f43f00acd27aed02071518c1c61ab51dfaefb1ed',
    'marg' : '85e6082adea6960a89dc935b05b969ad830a35ad',
    'ux' : 'c3441950dc9c92b34380c6c786897f8456f9bda7'
}



function requestRealtimeUsage(labId, callback) {
    
    var args = {
        headers : {
            "Content-Type": "application/json",
            "Authorization": auth_key
        },
        path : {
            "deviceId" : device_id[labId]
        }
    };

    var requestURL = baseURL + 'devices/${deviceId}/realtime/info/appliances';

    client.get(requestURL, args, function (data, response) {
        callback(transform(labId, data));
    })
}

 
function transform(labId, raw) {
    // reform the raw data which consisted as following format:
/*
 * // raw data schema
 * {
 *    $applianceId : [
 *       {
 *          timestamp: Date().getTime() value,
 *          feeder_id: feeder's ID,
 *          active_power: power usage (mA/s)
 *       }, ...
 *   ]
 *}
 *
 * // transformed data schema
 *  {  
    "dateFrom":"2015-04-01T00:00:00.000Z",
    "dateTo":"2015-04-01T00:00:01.000Z",
    "deviceID":1168,
    "location":"D410",
    "feeders":[  
      {  
        "feederID":3,
        "value":0,
 *      "description: 'computer'
      },
 */
    var extractedInfo = extractInfo(raw);
    var feeders = extractedInfo.feeders;
    var labInfo = require('./lab_info.js');
    var lab = labInfo.labs[labId];
    for (var i = 0; i < feeders.length; i++) {
        var feederInfo = feeders[i];
        lab.setValue(feederInfo.feederID, feederInfo.value); 
    }
    lab['dateFrom'] = extractedInfo.dateFrom;
    lab['dateTo'] = extractedInfo.dateTo;
     
    return lab;
}

function extractInfo(rawObj) {
    var all_feeders = [];
    var timestamp = 0;
    Object.getOwnPropertyNames(rawObj).forEach(function (val, idx, array) {
        var applianceId = val;
        var feeders = rawObj[val];
        for (var i = 0; i < feeders.length; i++) {
            timestamp = feeders[i].timestamp; // get timestamp

            var feeder = {
                'feederID' : feeders[i].feeder_id,
                'value' : feeders[i].active_power
            }
            all_feeders.push(feeder);
        }
    });
    //console.log(all_feeders);
    var returnObj = {
        'dateFrom' : new Date(timestamp),
        'dateTo' : new Date(timestamp + 1000), // add 1 sec
        'feeders' : all_feeders
    }
    return returnObj;
}

exports.getLatest = requestRealtimeUsage;

/*
// test code
requestRealtimeUsage('marg', function (obj) {
    console.log(obj);
    console.log('done');
})
 */
