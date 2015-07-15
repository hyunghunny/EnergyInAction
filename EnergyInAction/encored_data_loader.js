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

exports.getLatest = function (labId, callback) {
    
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
        callback(transform(data));
    })
}


function transform(raw) {
    // TODO:reform the raw data which consisted as following format:
/*
 * {
 *    $applianceId : [
 *       {
 *          timestamp: Date().getTime() value,
 *          feeder_id: feeder's ID,
 *          active_power: power usage (mA/s)
 *       }, ...
 *   ]
 *}
 */
    return raw;
}