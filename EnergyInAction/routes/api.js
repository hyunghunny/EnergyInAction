var express = require('express');
var router = express.Router();

// Get controller module.
var controller = require('../control');
var Client = require('node-rest-client').Client;
w_client = new Client();
var weather_baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=Suwon&mode=json&units=metric&APPID=';
var weather_apikey = "3a0dad724ecd4024df6785e56b2a9760";
/**
 * @api {get} api Show available APIs
 * @apiName Listing_API
 * @apiGroup Billboard
 * @apiExample {js} Example usage:
 *     api/
 * @apiHeader {String} Content-Type application/json or text/html
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {"api":[{
 *      "href":"/api/labs",
 *      "type":"ItemList"
 *  }]}
 *
 *
 * @apiDescription This API lists the top level APIs.
 * You can navigate the other APIs by starting with this API.
 *
 * If you doesn't set Content-Type as JSON, human readable help document will be shown.
 *
 */
router.get('/', function (req, res) {
    if (req.headers['content-type'] === 'application/json') {
        res.writeHead(200, controller.api.getContentHeader());
        res.end(controller.api.getBillboard());
    } else {
        res.redirect('/apidoc/index.html');
    }

});

/**
 * @api {get} api/labs Show all laboratories.
 * @apiName Get_Current_Weather_Info
 * 
 * @apiGroup Lab Details
 * @apiExample {js} Example usage:
 *     api/weather
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  TODO:JSON body will be updated.
 */
router.get('/weather', function (req, res) {
  var requestURL = weather_baseURL + weather_apikey;
  res.writeHead(200, w_client.get(requestURL,function (data, response) {
      var result = JSON.parse(data);
      console.log(result);
  }));
  res.end(result);
});
/**
 * @api {get} api/labs Show all laboratories.
 * @apiName Listing_All_Labs
 * @apiGroup Lab Details
 * @apiExample {js} Example usage:
 *     api/labs
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 * "labs":[
 *   {
 *     "id":"ux",
 *    "name":"UX Lab.",
 *     "description":"User Experience Lab.",
 *     "api":[
 *       {
 *         "href":"/api/labs/ux/energy/latest.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/ux/energy/quarters.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/ux/energy/hours.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/ux/energy/total.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/ux/energy/feeders",
 *         "type":"ItemList"
 *       }
 *     ]
 *   },
 *   {
 *     "id":"marg",
 *     "name":"MARG Lab.",
 *     "description":"Music and Audio Research Group",
 *     "api":[
 *       {
 *         "href":"/api/labs/marg/energy/latest.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/marg/energy/quarters.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/marg/energy/hours.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/marg/energy/total.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/marg/energy/feeders",
 *         "type":"ItemList"
 *       }
 *     ]
 *   },
 *   {
 *     "id":"hcc",
 *     "name":"HCC Lab.",
 *     "description":"Human Centered Computing Laboratory",
 *     "api":[
 *       {
 *         "href":"/api/labs/hcc/energy/latest.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/hcc/energy/quarters.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/hcc/energy/hours.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/hcc/energy/total.json",
 *         "type":"ItemList"
 *       },
 *       {
 *         "href":"/api/labs/hcc/energy/feeders",
 *         "type":"ItemList"
 *       }
 *     ]
 *   }
 * ],
 * "api":[
 *   {
 *     "href":"/api/labs/ux",
 *     "type":"ItemList"
 *   },
 *   {
 *     "href":"/api/labs/marg",
 *     "type":"ItemList"
 *   },
 *   {
 *     "href":"/api/labs/hcc",
 *     "type":"ItemList"
 *   }
 * ]
 *}
 *
 *
 * @apiDescription This API lists the available Labs which are being monitored for energy usage behavior research.
 *
 */
router.get('/labs', function (req, res) {

    res.writeHead(200, controller.api.getContentHeader());
    res.end(JSON.stringify(controller.labs));
});


/**
 * @api {get} api/labs/:labId Show the specific Lab.
 * @apiParam {String} labId Lab's unique ID.
 * @apiName Show_the_Lab_Information
 * @apiGroup Lab Details
 * @apiExample {js} Example usage:
 *     api/labs/ux
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {"id":"ux",
 *  "name":"UX Lab.",
 *  "description":"User Experience Lab.",
 *  "api":[{"href":"/api/labs/ux/latest.json","type":"ItemList"},
 *      {"href":"/api/labs/ux/quarters.json","type":"ItemList"},
 *      {"href":"/api/labs/ux/hours.json","type":"ItemList"},
 *      {"href":"/api/labs/ux/total.json","type":"ItemList"},
 *      {"href":"/api/labs/ux/feeders","type":"ItemList"}]
 *  }
 *
 *
 * @apiDescription This API show the information of a specific Lab which are being monitored for energy usage behavior research.
 *
 */
router.get('/labs/:labId', function (req, res) {
    try {
        var id = req.params.labId;

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }
        res.writeHead(200, controller.api.getContentHeader());
        res.end(JSON.stringify(labObj));
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});


/**
 * @api {get} api/labs/:labId/energy Show the supported usage measurements.
 * @apiParam {String} labId Lab's unique ID.
 * @apiName Show_the_Lab_Energy
 * @apiGroup Lab Details
 * @apiExample {js} Example usage:
 *     api/labs/ux/energy
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {"id":"ux",
 *  "name":"UX Lab.",
 *  "description":"User Experience Lab.",
 *  "api":[{"href":"/api/labs/ux/latest.json","type":"ItemList"},
 *      {"href":"/api/labs/ux/quarters.json","type":"ItemList"},
 *      {"href":"/api/labs/ux/hours.json","type":"ItemList"},
 *      {"href":"/api/labs/ux/total.json","type":"ItemList"},
 *      {"href":"/api/labs/ux/feeders","type":"ItemList"}]
 *  }
 *
 *
 * @apiDescription This API show the information of a specific Lab which are being monitored for energy usage behavior research.
 *
 */
router.get('/labs/:labId/energy', function (req, res) {
    try {
        var id = req.params.labId;

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }
        res.writeHead(200, controller.api.getContentHeader());
        res.end(JSON.stringify(labObj));
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});



/*
 * @api {get} api/labs/:labId/energy/secs.json Retrieve the usage measured 1 seconds each.
 *
 * @apiName Retrieve the energy usage information which measured per one second
 *
 * @apiParam {String} labId Lab's unique ID.
 * @apiParam {Number} [base_time=timestamp_of_today's_midnight]  Query parameter to set the base time.
 *   It can be returned by invoking Date().getTime() in JavaScript.
 *   If skipped it will be set as today's midnight
 * @apiParam {Number} [limit=100] Query parameter to set the number of items which will be retrieved.
 * @apiParam {Number} [skip=0] Query parameter to set the skipped numbers of items.
 *
 * @apiExample {js} Example usage:
 *     api/labs/marg/energy/secs.json?base_time=1430477977029&skip=100
 * @apiGroup Lab Energy Usage
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
  {
    "dateFrom":"2015-04-01T00:00:00.000Z",
    "dateTo":"2015-04-01T00:00:01.000Z",
    "deviceID":1168,
    "location":"D410",
    "feeders":[
      {
        "feederID":3,
        "value":0
      },
      {
        "feederID":4,
        "value":0
      },
      {
        "feederID":5,
        "value":0
      },
      {
        "feederID":6,
        "value":0
      },
      {
        "feederID":7,
        "value":0
      },
      {
        "feederID":8,
        "value":0
      },
      {
        "feederID":9,
        "value":0
      },
      {
        "feederID":10,
        "value":0
      },
      {
        "feederID":11,
        "value":0
      },
      {
        "feederID":12,
        "value":0
      },
      {
        "feederID":13,
        "value":0
      },
      {
        "feederID":14,
        "value":0
      },
      {
        "feederID":15,
        "value":0
      },
      {
        "feederID":16,
        "value":0
      },
      {
        "feederID":17,
        "value":0
      },
      {
        "feederID":18,
        "value":0
      },
      {
        "feederID":19,
        "value":0
      },
      {
        "feederID":20,
        "value":0
      },
      {
        "feederID":21,
        "value":0
      },
      {
        "feederID":22,
        "value":0
      },
      {
        "feederID":23,
        "value":0
      }
    ],
    "sum":0,
    "unit":"mW/s"
  }]
 *
 *
 * @apiDescription This API retrieves the energy usage information of a specific Lab
 * which are being monitored for energy usage behavior research.
 * It is referred into milliwatt per sec
 *
 * REMARKS: THIS API IS DEPRECATED.
 *
router.get('/labs/:labId/energy/secs.json', function (req, res) {
    try {
        var id = req.params.labId;
        var labObj = controller.labs.find(id);
        if (labObj == null) {
            throw new Error('404');
        }

        // validate query parameter
        var queries = validateQueryParam(req.query);
        if (queries == null) {
            throw new Error('404');
        }

        labObj.retrieveUsages('secs', queries, function (result) {
            if (result != null) {
                for (var i = 0; i < result.length; i++) {
                    var obs = result[i];
                    var sum = accumulateFeederUsage(obs[id].feeders);
                    obs.deviceID = obs[id].deviceID;
                    obs.location = obs[id].location;
                    obs.feeders = obs[id].feeders;
                    obs.sum = sum;
                    obs.unit = 'mW/s';

                    // remove all labs
                    delete obs['marg'];
                    delete obs['hcc'];
                    delete obs['ux'];
                }
                res.writeHead(200, controller.api.getContentHeader());
                res.end(JSON.stringify(result));
            } else {
                var err = new Error('500')
                res.sendStatus(err.message);
            }
        });

    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});
*/
/**
 * @api {get} api/labs/:labId/energy/latest.json Retrieve the latest usage measured at each 1 seconds.
 *
 * @apiName Retrieve the latest energy usage information which measured per one second
 *
 * @apiParam {String} labId Lab's unique ID.
 *
 * @apiExample {js} Example usage:
 *     api/labs/marg/energy/latest.json
 * @apiGroup Lab Energy Usage
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
  {
    "dateFrom":"2015-04-01T00:00:00.000Z",
    "dateTo":"2015-04-01T00:00:01.000Z",
    "deviceID":1168,
    "location":"D410",
    "feeders":[
      {
        "feederID":3,
        "value":0
      },
      {
        "feederID":4,
        "value":0
      },
      {
        "feederID":5,
        "value":0
      },
      {
        "feederID":6,
        "value":0
      },
      {
        "feederID":7,
        "value":0
      },
      {
        "feederID":8,
        "value":0
      },
      {
        "feederID":9,
        "value":0
      },
      {
        "feederID":10,
        "value":0
      },
      {
        "feederID":11,
        "value":0
      },
      {
        "feederID":12,
        "value":0
      },
      {
        "feederID":13,
        "value":0
      },
      {
        "feederID":14,
        "value":0
      },
      {
        "feederID":15,
        "value":0
      },
      {
        "feederID":16,
        "value":0
      },
      {
        "feederID":17,
        "value":0
      },
      {
        "feederID":18,
        "value":0
      },
      {
        "feederID":19,
        "value":0
      },
      {
        "feederID":20,
        "value":0
      },
      {
        "feederID":21,
        "value":0
      },
      {
        "feederID":22,
        "value":0
      },
      {
        "feederID":23,
        "value":0
      }
    ],
    "sum":0,
    "unit":"mW/s"
  }]
 *
 *
 * @apiDescription This API retrieves the energy usage information of a specific Lab
 * which are being monitored for energy usage behavior research.
 * It is referred into milliwatt per sec
 */
router.get('/labs/:labId/energy/latest.json', function (req, res) {
    try {
        var id = req.params.labId;
        var labObj = controller.labs.find(id);
        if (labObj == null) {
            throw new Error('404');
        }

        // validate query parameter
        var queries = validateQueryParam(req.query);
        if (queries == null) {
            throw new Error('400');
        }
        queries.labId = id;

        labObj.realtimeUsages(queries, function (result) {
            if (result != null) {

                var sum = accumulateFeederUsage(result.feeders);
                result.sum = sum;
                result.unit = 'mW/s';

                res.writeHead(200, controller.api.getContentHeader());
                res.end(JSON.stringify(result));
            } else {
                var err = new Error('500')
                res.sendStatus(err.message);
            }
        });

    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});


/**
 * visit all feeders for accumulate the power usages and unit transformation
 *
 * @return the accumulated power usage
 */
function accumulateFeederUsage(feeders, unitType) {
    var sum = 0.0;
    var unit = 1;
    switch (unitType) {
        case 'kW/15min':
            unit = 1000000;
            break;
        case 'kWh':
            unit = 1000000;
            break;
        default:
            unit = 1; // ERROR case!
            break;
    }
    for (var i = 0; i < feeders.length; i++) {
        var feeder = feeders[i];
        
        sum = sum + feeder.value; // cummulate value
        // unit transformation
        feeder.value = feeder.value / unit;
    }
    return ( sum/unit );
}

function validateQueryParam(queries) {
    var base_time = Number(queries.base_time - (queries.base_time % 1000));
    var to_time = Number(queries.to_time - (queries.to_time % 1000));
    var count = queries.limit;
    var index = queries.skip;


    if (isNaN(base_time)) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        queries.base_time = today.getTime();
    } else {
        var today = new Date(base_time);
        queries.base_time = base_time;
    }

    if (isNaN(to_time)) {
        var tommorow = new Date(today);
        tommorow.setHours(today.getHours() + 24);

        queries.to_time = tommorow.getTime();
    } else {
        queries.to_time = to_time;
    }

    if (base_time > to_time) {
        // ERROR: invalid case!
        return null;
    } else {
        // TODO: validate base_time (timestamp by Date().getTime())
        if (count == null) {
            queries.limit = 100;
        }
        if (index == null) {
            queries.skip = 0;
        }
        return queries;
    }

}

/**
 * @api {get} api/labs/:labId/energy/quarters.json Retrieve the previous usage(s) measured at each 15 minutes.
 * @apiName Retrieve the energy usage information which measured per 15 mins
 *
 * @apiParam {String} labId Lab's unique ID.
 * @apiParam {Number} [base_time=timestamp_of_today's_midnight]  Query parameter to set the base time.
 *   It can be returned by invoking Date().getTime() in JavaScript.
 *   If skipped it will be set as today's midnight
 * @apiParam {Number} [to_time=1_day_more_from_base_time]  Query parameter to set the time to be collected.
 *   It can be returned by invoking Date().getTime() in JavaScript.
 *   If skipped it will be set as 1 day more from the base time
 * @apiParam {Number} [limit=100] Query parameter to set the number of items which will be retrieved.
 * @apiParam {Number} [skip=0] Query parameter to set the skipped numbers of items.
 *
 * @apiExample {js} Example usage:
 *     api/labs/marg/energy/quarters.json?base_time=1430477977029&skip=100
 *
 * @apiGroup Lab Energy Usage
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
  {
    "dateFrom":"2015-04-01T00:00:00.000Z",
    "dateTo":"2015-04-01T00:15:00.000Z",
    "deviceID":1168,
    "location":"D410",
    "feeders":[
      {
        "feederID":3,
        "value":7.555555555555555
      },
      {
        "feederID":4,
        "value":39.05555555555556
      },
      {
        "feederID":5,
        "value":138323.75
      },
      {
        "feederID":6,
        "value":33499.88888888889
      },
      {
        "feederID":7,
        "value":4.277777777777778
      },
      {
        "feederID":8,
        "value":84.38888888888889
      },
      {
        "feederID":9,
        "value":63.166666666666664
      },
      {
        "feederID":10,
        "value":28591.472222222223
      },
      {
        "feederID":11,
        "value":45400.666666666664
      },
      {
        "feederID":12,
        "value":45606.166666666664
      },
      {
        "feederID":13,
        "value":160957.05555555556
      },
      {
        "feederID":14,
        "value":2153.472222222222
      },
      {
        "feederID":15,
        "value":12.333333333333334
      },
      {
        "feederID":16,
        "value":0
      },
      {
        "feederID":17,
        "value":0
      },
      {
        "feederID":18,
        "value":0
      },
      {
        "feederID":19,
        "value":0
      },
      {
        "feederID":20,
        "value":0
      },
      {
        "feederID":21,
        "value":0
      },
      {
        "feederID":22,
        "value":0
      },
      {
        "feederID":23,
        "value":0
      }
    ],
    "sum":454743.25,
    "unit":"mW/h"
  },]
 *
 *
 * @apiDescription This API retrieves the energy usage information of a specific Lab
 * which are being monitored for energy usage behavior research.
 *
 * It is referred into milliwatt per hr (mWh).
 *
 */
router.get('/labs/:labId/energy/quarters.json', function (req, res) {
    try {
        var id = req.params.labId;

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        // validate query parameter
        var queries = validateQueryParam(req.query);
        if (queries == null) {
            throw new Error('400');
        }

        // if time span between base time to to time is not enough, return empty result
        if (queries.to_time - queries.base_time < 900000) {
            var result = [];
            res.writeHead(200, controller.api.getContentHeader());
            res.end(JSON.stringify(result));
            return;
        }

        labObj.retrieveUsages('quarters', queries, function (result) {

            if (result != null) {

                for (var i = 0; i < result.length; i++) {
                    var obs = result[i];
                    if (obs[id]) {
                        var sum = accumulateFeederUsage(obs[id].feeders, 'kW/15min');
                        obs.deviceID = obs[id].deviceID;
                        obs.location = obs[id].location;
                        obs.feeders = obs[id].feeders;

                        obs.sum = sum;
                        obs.unit = 'kW/15min';

                        // remove all labs
                        delete obs['marg'];
                        delete obs['hcc'];
                        delete obs['ux'];

                    } else {
                        console.log('invalid result: ' + JSON.stringify(obs))
                    }

                }

                res.writeHead(200, controller.api.getContentHeader());
                res.end(JSON.stringify(result));
            } else {
                var err = new Error('500')
                res.sendStatus(err.message);
            }
        });
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/**
 * @api {get} api/labs/:labId/energy/hours.json Retrieve the previous usage(s) measured at each hours.
 * @apiName Retrieve the energy usage information which measured per hours
 *
 * @apiParam {String} labId Lab's unique ID.
 * @apiParam {Number} [base_time=timestamp_of_today's_midnight]  Query parameter to set the base time.
 *   It can be returned by invoking Date().getTime() in JavaScript.
 *   If skipped it will be set as today's midnight
 * @apiParam {Number} [to_time=1_day_more_from_base_time]  Query parameter to set the time to be collected.
 *   It can be returned by invoking Date().getTime() in JavaScript.
 *   If skipped it will be set as 1 day more from the base time
 * @apiParam {Number} [limit=100] Query parameter to set the number of items which will be retrieved.
 * @apiParam {Number} [skip=0] Query parameter to set the skipped numbers of items.
 *
 * @apiExample {js} Example usage:
 *     api/labs/marg/energy/hours.json?base_time=1430477977029&skip=100
 *
 * @apiGroup Lab Energy Usage
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
  {
    "dateFrom":"2015-04-01T00:00:00.000Z",
    "dateTo":"2015-04-01T01:00:00.000Z",
    "deviceID":1168,
    "location":"D410",
    "feeders":[
      {
        "feederID":3,
        "value":0.00005997222222222222
      },
      {
        "feederID":4,
        "value":0.0000695
      },
      {
        "feederID":5,
        "value":0.6066586944444444
      },
      {
        "feederID":6,
        "value":0.1342481388888889
      },
      {
        "feederID":7,
        "value":0.000011361111111111111
      },
      {
        "feederID":8,
        "value":0.0001768888888888889
      },
      {
        "feederID":9,
        "value":0.00012825
      },
      {
        "feederID":10,
        "value":0.143789
      },
      {
        "feederID":11,
        "value":0.18312230555555556
      },
      {
        "feederID":12,
        "value":0.1638166388888889
      },
      {
        "feederID":13,
        "value":0.6445815555555555
      },
      {
        "feederID":14,
        "value":0.008646055555555556
      },
      {
        "feederID":15,
        "value":0.00016791666666666666
      },
      {
        "feederID":16,
        "value":0
      },
      {
        "feederID":17,
        "value":0
      },
      {
        "feederID":18,
        "value":0
      },
      {
        "feederID":19,
        "value":0
      },
      {
        "feederID":20,
        "value":0
      },
      {
        "feederID":21,
        "value":0
      },
      {
        "feederID":22,
        "value":0
      },
      {
        "feederID":23,
        "value":0
      }
    ],
    "sum":1.8854762777777778,
    "unit":"kW/h"
  }]
 *
 *
 * @apiDescription This API retrieves the energy usage information of a specific Lab
 * which are being monitored for energy usage behavior research.
 *
 * It is referred into kilowatt per hr. (kWh)
 *
 */
router.get('/labs/:labId/energy/hours.json', function (req, res) {
    try {
        var id = req.params.labId;

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }
        // validate query parameter
        var queries = validateQueryParam(req.query);
        if (queries == null) {
            throw new Error('400');
        }
        // if time span between base time to to time is not enough, return empty result
        if (queries.to_time - queries.base_time < 3600000) {
            var result = [];
            res.writeHead(200, controller.api.getContentHeader());
            res.end(JSON.stringify(result));
        }
        labObj.retrieveUsages('hours', queries, function (result) {
            if (result != null) {
                // result will be translated to kWh
                for (var i = 0; i < result.length; i++) {
                    var obs = result[i];
                    var sum = accumulateFeederUsage(obs[id].feeders, 'kWh');
                    obs.deviceID = obs[id].deviceID;
                    obs.location = obs[id].location;
                    obs.feeders = obs[id].feeders;

                    obs.sum = sum;
                    obs.unit = 'kW/h';

                    // remove all labs
                    delete obs['marg'];
                    delete obs['hcc'];
                    delete obs['ux'];
                }
                res.writeHead(200, controller.api.getContentHeader());
                res.end(JSON.stringify(result));
            } else {
                var err = new Error('500')
                res.sendStatus(err.message);
            }
        });
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/**
 * @api {get} api/labs/:labId/energy/daily.json Retrieve the previous usage(s) measured at each days.
 * @apiName Retrieve the energy usage information which measured per day
 *
 * @apiParam {String} labId Lab's unique ID.
 * @apiParam {String} [day_from=yesterday]  Query parameter to set the base day.
 *   It should be formated as YYYY-MM-DD. e.g. 2015-4-10.
 *   The result(s) contains the observations which measured from the value of from to the value of to.
 *   CAUTION: this day string format translated to local time.
 * @apiParam {String} [day_to=same day of from value]  Query parameter to set the time to be collected.
 *   It should be formated as YYYY-MM-DD. e.g. 2015-4-10.
 *   CAUTION: this day string format translated to local time.
 * @apiParam {Number} [offset=0] Query parameter to set the offset hour. e.g. offset=9 means each measurements associated from 9 A.M. to next 9 A.M.
 * @apiParam {Number} [limit=100] Query parameter to set the number of items which will be retrieved.
 * @apiParam {Number} [skip=0] Query parameter to set the skipped numbers of items.
 *
 * @apiExample {js} Example usage:
 *     api/labs/ux/energy/daily.json?day_from=2015-7-19&day_to=2015-7-25&offset=8
 *
 * @apiGroup Lab Energy Usage
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
  {
    "dateFrom":"2015-07-18T23:00:00.000Z",
    "dateTo":"2015-07-19T23:00:00.000Z",
    "deviceID":1169,
    "location":"D409",
    "feeders":[
      {
        "feederID":3,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":4,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":5,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":6,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":7,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":8,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":9,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":10,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":11,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":12,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":13,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":14,
        "value":11.422,
        "description":"computer"
      },
      {
        "feederID":15,
        "value":0.258,
        "description":"unclassified"
      },
      {
        "feederID":16,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":17,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":18,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":19,
        "value":0.509,
        "description":"unclassified"
      },
      {
        "feederID":20,
        "value":0.449,
        "description":"unclassified"
      },
      {
        "feederID":21,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":22,
        "value":0.719,
        "description":"hvac"
      },
      {
        "feederID":23,
        "value":7.386,
        "description":"light"
      }
    ],
    "sum":20.772,
    "unit":"kW/h"
  },
  {
    "dateFrom":"2015-07-19T23:00:00.000Z",
    "dateTo":"2015-07-20T23:00:00.000Z",
    "deviceID":1169,
    "location":"D409",
    "feeders":[
      {
        "feederID":3,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":4,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":5,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":6,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":7,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":8,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":9,
        "value":0,
        "description":"unclassified"
      },
      {
        "feederID":10,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":11,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":12,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":13,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":14,
        "value":12.996,
        "description":"computer"
      },
      {
        "feederID":15,
        "value":0.261,
        "description":"unclassified"
      },
      {
        "feederID":16,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":17,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":18,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":19,
        "value":0.64,
        "description":"unclassified"
      },
      {
        "feederID":20,
        "value":0.887,
        "description":"unclassified"
      },
      {
        "feederID":21,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":22,
        "value":0.587,
        "description":"hvac"
      },
      {
        "feederID":23,
        "value":9.393,
        "description":"light"
      }
    ],
    "sum":24.789,
    "unit":"kW/h"
  },
  {
    "dateFrom":"2015-07-20T23:00:00.000Z",
    "dateTo":"2015-07-21T23:00:00.000Z",
    "deviceID":1169,
    "location":"D409",
    "feeders":[
      {
        "feederID":3,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":4,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":5,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":6,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":7,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":8,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":9,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":10,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":11,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":12,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":13,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":14,
        "value":10.563,
        "description":"computer"
      },
      {
        "feederID":15,
        "value":0.261,
        "description":"unclassified"
      },
      {
        "feederID":16,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":17,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":18,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":19,
        "value":0.607,
        "description":"unclassified"
      },
      {
        "feederID":20,
        "value":0.659,
        "description":"unclassified"
      },
      {
        "feederID":21,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":22,
        "value":0.513,
        "description":"hvac"
      },
      {
        "feederID":23,
        "value":12.03,
        "description":"light"
      }
    ],
    "sum":24.661,
    "unit":"kW/h"
  },
  {
    "dateFrom":"2015-07-21T23:00:00.000Z",
    "dateTo":"2015-07-22T23:00:00.000Z",
    "deviceID":1169,
    "location":"D409",
    "feeders":[
      {
        "feederID":3,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":4,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":5,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":6,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":7,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":8,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":9,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":10,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":11,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":12,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":13,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":14,
        "value":13.39,
        "description":"computer"
      },
      {
        "feederID":15,
        "value":0.261,
        "description":"unclassified"
      },
      {
        "feederID":16,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":17,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":18,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":19,
        "value":0.917,
        "description":"unclassified"
      },
      {
        "feederID":20,
        "value":0.515,
        "description":"unclassified"
      },
      {
        "feederID":21,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":22,
        "value":0.67,
        "description":"hvac"
      },
      {
        "feederID":23,
        "value":21.751,
        "description":"light"
      }
    ],
    "sum":37.531,
    "unit":"kW/h"
  },
  {
    "dateFrom":"2015-07-22T23:00:00.000Z",
    "dateTo":"2015-07-23T23:00:00.000Z",
    "deviceID":1169,
    "location":"D409",
    "feeders":[
      {
        "feederID":3,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":4,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":5,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":6,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":7,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":8,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":9,
        "value":0,
        "description":"unclassified"
      },
      {
        "feederID":10,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":11,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":12,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":13,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":14,
        "value":13.612,
        "description":"computer"
      },
      {
        "feederID":15,
        "value":0.339,
        "description":"unclassified"
      },
      {
        "feederID":16,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":17,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":18,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":19,
        "value":1.024,
        "description":"unclassified"
      },
      {
        "feederID":20,
        "value":0.853,
        "description":"unclassified"
      },
      {
        "feederID":21,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":22,
        "value":0.7,
        "description":"hvac"
      },
      {
        "feederID":23,
        "value":15.881,
        "description":"light"
      }
    ],
    "sum":32.434,
    "unit":"kW/h"
  },
  {
    "dateFrom":"2015-07-23T23:00:00.000Z",
    "dateTo":"2015-07-24T23:00:00.000Z",
    "deviceID":1169,
    "location":"D409",
    "feeders":[
      {
        "feederID":3,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":4,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":5,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":6,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":7,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":8,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":9,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":10,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":11,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":12,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":13,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":14,
        "value":11.357,
        "description":"computer"
      },
      {
        "feederID":15,
        "value":0.257,
        "description":"unclassified"
      },
      {
        "feederID":16,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":17,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":18,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":19,
        "value":0.986,
        "description":"unclassified"
      },
      {
        "feederID":20,
        "value":0.484,
        "description":"unclassified"
      },
      {
        "feederID":21,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":22,
        "value":0.426,
        "description":"hvac"
      },
      {
        "feederID":23,
        "value":14.862,
        "description":"light"
      }
    ],
    "sum":28.4,
    "unit":"kW/h"
  },
  {
    "dateFrom":"2015-07-24T23:00:00.000Z",
    "dateTo":"2015-07-25T23:00:00.000Z",
    "deviceID":1169,
    "location":"D409",
    "feeders":[
      {
        "feederID":3,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":4,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":5,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":6,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":7,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":8,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":9,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":10,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":11,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":12,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":13,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":14,
        "value":9.423,
        "description":"computer"
      },
      {
        "feederID":15,
        "value":0.255,
        "description":"unclassified"
      },
      {
        "feederID":16,
        "value":0.001,
        "description":"unclassified"
      },
      {
        "feederID":17,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":18,
        "value":0.002,
        "description":"unclassified"
      },
      {
        "feederID":19,
        "value":0.972,
        "description":"unclassified"
      },
      {
        "feederID":20,
        "value":0.418,
        "description":"unclassified"
      },
      {
        "feederID":21,
        "value":0.003,
        "description":"unclassified"
      },
      {
        "feederID":22,
        "value":0.307,
        "description":"hvac"
      },
      {
        "feederID":23,
        "value":1.415,
        "description":"light"
      }
    ],
    "sum":12.818,
    "unit":"kW/h"
  }
]
 *
 * @apiDescription This API retrieves the energy usage information of a specific Lab
 * which are being monitored for energy usage behavior research.
 *
 * It is referred into kilowatt per hr. (kWh)
 *
 */
router.get('/labs/:labId/energy/daily.json', function (req, res) {
    try {
        var id = req.params.labId;

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }
        // validate day_from, day_to format
        if (!validateDayFormat(req.query.day_from)) {
            throw new Error('400');
        }
        if (!validateDayFormat(req.query.day_to)) {
            throw new Error('400');
        }
        var queries = req.query;

        if (!queries.offset) {
            // set 0 if offset is not exited
            queries.offset = 0;
        }

        if (!queries.limit) {
            // set 0 if offset is not exited
            queries.limit = 100;
        }

        if (!queries.skip) {
            // set 0 if skip is not exited
            queries.skip = 0;
        }

        if (!queries.day_from) {
            // set yesterday string if day_from is empty
            var today = new Date();
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            var yesterdayString = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) +
            '-' + yesterday.getDate();

            queries.day_from = yesterdayString;
        }
        if (!queries.day_to) {
            queries.day_to = queries.day_from;  // set same value as day_from
        }
        // XXX: add below to change GMT to local time
        queries.day_from = queries.day_from + " 00:00:00";
        queries.day_to = queries.day_to + " 00:00:00";

        labObj.retrieveDailyUsages(queries, function (result) {
            if (result != null) {
                // result will be translated to kWh
                for (var i = 0; i < result.length; i++) {
                    var obs = result[i];
                    var feeders = obs.feeders;
                    //console.log(JSON.stringify(feeders));
                    var sum = accumulateFeederUsage(feeders, 'kWh');

                    obs.sum = sum;
                    obs.unit = 'kW/h';

                }
                res.writeHead(200, controller.api.getContentHeader());
                res.end(JSON.stringify(result));
            } else {
                var err = new Error('500')
                res.sendStatus(err.message);
            }
        });
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

function validateDayFormat(dateString) {
    if (!dateString) {
        //XXX: return true when it is omitted
        return true;
    }
    if (/^[0-9][0-9][0-9][0-9]-[0-9][0-9]?-[0-9][0-9]?/.test(dateString)) {
        return true;
    } else {
        false;
    }
}

/**
 * @api {get} api/labs/:labId/energy/total.json Retrieve the total usage measured at a specific time span.
 *
 * @apiName Retrieve the total energy usage information which measured from base_time to to_time.
 * @apiParam {String} labId Lab's unique ID.
 * @apiParam {Number} [base_time=timestamp_of_today's_midnight]  Query parameter to set the base time.
 *   It can be returned by invoking Date().getTime() in JavaScript.
 *   If skipped it will be set as today's midnight
 * @apiParam {Number} [to_time=1_day_more_from_base_time]  Query parameter to set the time to be collected.
 *   It can be returned by invoking Date().getTime() in JavaScript.
 *   If skipped it will be set as 1 day more from the base time
 * @apiParam {Number} [skip=0] Query parameter to set the skipped numbers of items.
 * @apiExample {js} Example usage:
 *     api/labs/marg/energy/total.json?base_time=1430477977029&to_time=1430479977000
 * @apiGroup Lab Energy Usage
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
  {
    "dateFrom":"2015-04-02T07:00:00.000Z",
    "dateTo":"2015-04-02T07:33:20.000Z",
    "deviceID":1168,
    "location":"D410",
    "feeders":[
      {
        "value":0.0005318055555555555,
        "feederID":3
      },
      {
        "value":0.0005967777777777778,
        "feederID":4
      },
      {
        "value":5.167977,
        "feederID":5
      },
      {
        "value":1.6122869722222222,
        "feederID":6
      },
      {
        "value":0.00017716666666666667,
        "feederID":7
      },
      {
        "value":0.0006883611111111112,
        "feederID":8
      },
      {
        "value":0.0007983888888888888,
        "feederID":9
      },
      {
        "value":1.07408875,
        "feederID":10
      },
      {
        "value":1.3434753888888888,
        "feederID":11
      },
      {
        "value":2.584917,
        "feederID":12
      },
      {
        "value":9.474049138888889,
        "feederID":13
      },
      {
        "value":0.057007555555555554,
        "feederID":14
      },
      {
        "value":0.0007699166666666667,
        "feederID":15
      },
      {
        "value":0,
        "feederID":16
      },
      {
        "value":0,
        "feederID":17
      },
      {
        "value":0,
        "feederID":18
      },
      {
        "value":0,
        "feederID":19
      },
      {
        "value":0,
        "feederID":20
      },
      {
        "value":0,
        "feederID":21
      },
      {
        "value":0,
        "feederID":22
      },
      {
        "value":0,
        "feederID":23
      }
    ],
    "sum":21.31736422222222,
    "unit":"kW/h"
  }
]
 *
 *
 * @apiDescription This API retrieves the energy usage information of a specific Lab
 * which are being monitored for energy usage behavior research.
 *
 * It is referred into kilowatt per hr. (kWh)
 *
 */
router.get('/labs/:labId/energy/total.json', function (req, res) {
    try {
        var id = req.params.labId;

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }
        // validate query parameter
        var queries = validateQueryParam(req.query);
        if (queries == null) {
            throw new Error('400');
        }

        labObj.accumulateUsages(queries, function (result) {

            if (result != null) {
                // result will be translated to kWh
                for (var i = 0; i < result.length; i++) {
                    var obs = result[i];
                    var sum = accumulateFeederUsage(obs.feeders, 'kWh');

                    obs.sum = sum;
                    obs.unit = 'kW/h';
                }
                res.writeHead(200, controller.api.getContentHeader());
                res.end(JSON.stringify(result));
            } else {
                var err = new Error('500')
                res.sendStatus(err.message);
            }
        });
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/**
 * @api {post} api/labs/:labId/actuators/notices Posting a notice message
 * @apiName Posting_notice
 * @apiGroup Messaging
 * @apiExample {js} Example usage:
 *     POST /labs/marg/actuators/notices
 *
 *     { "notice" :
 *       {
 *         "dateFrom": 1428591600000,
 *         "message": "It is a good day to save energy!"
 *         }
 *     }
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 202 Accepted
 *
 *
 */
router.post('/labs/:labId/actuators/notices', function (req, res) {
    try {
        var id = req.params.labId;

        // TODO get query parameter
        var notice = req.body.notice;

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        // validate notice
        if (notice == null || notice.message == null) {
            throw new Error('400');
        }

        if (labObj.postMessage('notice', notice)) {
            res.sendStatus('202');
        } else {
            res.sendStatus('500');
        }



    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/**
 * @api {get} api/labs/:labId/actuators/notices/latest retrieve the latest notice message
 * @apiName Getting_notice
 * @apiGroup Messaging
 * @apiExample {js} Example usage:
 *     GET /labs/marg/actuators/notices/latest
 *
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *     { "notice" :
 *       {
 *         "datePublished": 1428591600000,
 *         "dateFrom": 1428591600000,
 *         "message": "It is a good day to save energy!"
 *         }
 *     }
 */
router.get('/labs/:labId/actuators/notices/latest', function (req, res) {
    try {
        var id = req.params.labId;

        // TODO get query parameter
        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        var noticeObj = {};
        labObj.getLatestMessage('notice', function (obj) {
            if (obj) {
                noticeObj.notice = {
                    "datePublished": obj.datePublished,
                    "dateFrom": obj.dateFrom,
                    "message": obj.message
                }
            } else {
                var now = new Date();
                noticeObj.notice = {
                    "datePublished": now,
                    "dateFrom": now,
                    "message": "No notice available"
                }
            }
            // TODO retrieve json data from mongodb
            res.writeHead(200, controller.api.getContentHeader());
            res.end(JSON.stringify(noticeObj));
        });

    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/**
 * @api {post} api/labs/:labId/actuators/tips Posting a tip message
 * @apiName Posting_tip
 * @apiGroup Messaging
 * @apiExample {js} Example usage:
 *     POST /labs/marg/actuators/tips
 *
 *     { "tip" :
 *       {
 *         "dateFrom": 1428591600000,
 *         "message": "Power off your computer when you leave!"
 *         }
 *     }
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 202 Accepted
 *
 *
 */
router.post('/labs/:labId/actuators/tips', function (req, res) {
    try {
        var id = req.params.labId;

        // TODO get query parameter
        var tip = req.body.tip;

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        // validate notice
        if (tip == null || tip.message == null) {
            throw new Error('400');
        }

        if (labObj.postMessage('tip', tip)) {
            res.sendStatus('202');
        } else {
            res.sendStatus('500');
        }

    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/**
 * @api {get} api/labs/:labId/actuators/tips/latest retrieve the latest tip
 * @apiName Getting_tip
 * @apiGroup Messaging
 * @apiExample {js} Example usage:
 *     GET /labs/marg/actuators/tips/latest
 *
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *     { "tip" :
 *       {
 *         "datePublished": 1428591600000,
 *         "dateFrom": 1428591600000,
 *         "message": "Power off your computer when you leave!"
 *         }
 *     }
 */
router.get('/labs/:labId/actuators/tips/latest', function (req, res) {
    try {
        var id = req.params.labId;

        // TODO get query parameter
        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        var tipObj = {};
        labObj.getLatestMessage('tip', function (obj) {
            if (obj) {
                tipObj.tip = {
                    "datePublished": obj.datePublished,
                    "dateFrom": obj.dateFrom,
                    "message": obj.message
                }
            } else {
                var now = new Date();
                tipObj.tip = {
                    "datePublished": now,
                    "dateFrom": now,
                    "message": "No tips available"
                }
            }
            // TODO retrieve json data from mongodb
            res.writeHead(200, controller.api.getContentHeader());
            res.end(JSON.stringify(tipObj));
        });

    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////



/* GET api/labs/:labId/energy/feeders */
router.get('/labs/:labId/energy/feeders', function (req, res) {
    try {
        var id = req.params.labId;

        // TODO get query parameter

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }
        // TODO retrieve json data from mongodb
        res.writeHead(200, controller.api.getContentHeader());
        res.end(JSON.stringify(labObj));
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/* GET api/labs/:labId/energy/feeders/feederId */
router.get('/labs/:labId/energy/feeders/:feederId', function (req, res) {
    try {
        var id = req.params.labId;
        var feederId = req.params.feederId;

        // TODO get query parameter

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        // TODO validate the feederId

        // TODO retrieve json data from mongodb
        res.writeHead(200, controller.api.getContentHeader());
        res.end(JSON.stringify(labObj));
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/* GET api/labs/:labId/energy/feeders/feederId/secs.json */
router.get('/labs/:labId/energy/feeders/:feederId/secs.json', function (req, res) {
    try {
        var id = req.params.labId;
        var feederId = req.params.feederId;

        // TODO get query parameter

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        // TODO validate the feederId

        // TODO retrieve json data from mongodb
        res.writeHead(200, controller.api.getContentHeader());
        res.end(JSON.stringify(labObj));
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/* GET api/labs/:labId/energy/feeders/feederId/quarters.json */
router.get('/labs/:labId/energy/feeders/:feederId/quarters.json', function (req, res) {
    try {
        var id = req.params.labId;
        var feederId = req.params.feederId;

        // TODO get query parameter

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        // TODO validate the feederId

        // TODO retrieve json data from mongodb
        res.writeHead(200, controller.api.getContentHeader());
        res.end(JSON.stringify(labObj));
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/* GET api/labs/:labId/energy/feeders/feederId/hours.json */
router.get('/labs/:labId/energy/feeders/:feederId/hours.json', function (req, res) {
    try {
        var id = req.params.labId;
        var feederId = req.params.feederId;

        // TODO get query parameter

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        // TODO validate the feederId

        // TODO retrieve json data from mongodb
        res.writeHead(200, controller.api.getContentHeader());
        res.end(JSON.stringify(labObj));
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

/* GET api/labs/:labId/energy/feeders/feederId/total.json */
router.get('/labs/:labId/energy/feeders/:feederId/total.json', function (req, res) {
    try {
        var id = req.params.labId;
        var feederId = req.params.feederId;

        // TODO get query parameter

        var labObj = controller.labs.find(id);

        if (labObj == null) {
            throw new Error('404');
        }

        // TODO validate the feederId

        // TODO retrieve json data from mongodb
        res.writeHead(200, controller.api.getContentHeader());
        res.end(JSON.stringify(labObj));
    } catch (err) {
        // return error code here
        res.sendStatus(err.message);
    }
});

module.exports = router;
