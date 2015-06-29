var express = require('express');
var router = express.Router();

// Get controller module.
var controller = require('../control');

/**
 * @api {get} api Listing API
 * @apiName Listing_API
 * @apiGroup Billboard
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
 * @api {get} api/labs Listing Lab Information
 * @apiName Listing_Lab_Information
 * @apiGroup Lab Information
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
 *         "href":"/api/labs/ux/energy/secs.json",
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
 *         "href":"/api/labs/marg/energy/secs.json",
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
 *         "href":"/api/labs/hcc/energy/secs.json",
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
 * @api {get} api/labs:labId Show the Lab Information
 * @apiParam {String} labId Lab's unique ID.
 * @apiName Show_the_Lab_Information
 * @apiGroup Lab Information
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {"id":"ux",
 *  "name":"UX Lab.",
 *  "description":"User Experience Lab.",
 *  "api":[{"href":"/api/labs/ux/secs.json","type":"ItemList"},
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
 * @api {get} api/labs:labId Show the Lab Energy Information
 * @apiParam {String} labId Lab's unique ID.
 * @apiName Show_the_Lab_Information
 * @apiGroup Lab Information
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {"id":"ux",
 *  "name":"UX Lab.",
 *  "description":"User Experience Lab.",
 *  "api":[{"href":"/api/labs/ux/secs.json","type":"ItemList"},
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



/**
 * @api {get} api/labs/:labId/energy/secs.json Retrieve the_energy usage information which measured per one second
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
 */
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
                    var sum = visitFeeders(obs[id].feeders);
                    obs.deviceID = obs[id].deviceID;
                    obs.location = obs[id].location;
                    obs.feeders = obs[id].feeders;
                    delete obs[id];
                    obs.sum = sum;
                    obs.unit = 'mW/s';
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
 * visit all feeders for accumulate the power usages and unit transformation
 * 
 * @return the accumulated power usage
 */
function visitFeeders(feeders, unitType) {
    var sum = 0.0;
    var unit = 1;
    switch (unitType) {
        case 'mWh':
            unit = 3600;
            break;
        case 'kWh':
            unit = (3600 * 1000000);
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
    var base_time = Number(queries.base_time);
    var to_time = Number(queries.to_time);
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
 * @api {get} api/labs/:labId/energy/quarters.json Retrieve the energy usage information which measured per 15 mins
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
 *     api/labs/:labId/energy/quarters.json?base_time=1430477977029&skip=100 
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
            throw new Error('404');
        }
        labObj.retrieveUsages('quarters', queries, function (result) {
            
            if (result != null) {
                // result will be translated to mWh (/ 3600)
                for (var i = 0; i < result.length; i++) {
                    var obs = result[i];
                    var sum = visitFeeders(obs[id].feeders, 'mWh');
                    obs.deviceID = obs[id].deviceID;
                    obs.location = obs[id].location;
                    obs.feeders = obs[id].feeders;
                    delete obs[id];
                    obs.sum = sum;
                    obs.unit = 'mW/h';
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
 * @api {get} api/labs/:labId/energy/hours.json Retrieve the energy usage information which measured per hours
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
            throw new Error('404');
        }

        labObj.retrieveUsages('hours', queries, function (result) {
            if (result != null) {
                // result will be translated to kWh
                for (var i = 0; i < result.length; i++) {
                    var obs = result[i];
                    var sum = visitFeeders(obs[id].feeders, 'kWh');
                    obs.deviceID = obs[id].deviceID;
                    obs.location = obs[id].location;
                    obs.feeders = obs[id].feeders;
                    delete obs[id];
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
 * @api {get} api/labs/:labId/energy/total.json Retrieve the total energy usage information which measured from base_time to to_time.
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
 *  TODO
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
            throw new Error('404');
        }

        labObj.accumulateUsages(queries, function (result) {
            
            if (result != null) {
                // result will be translated to kWh
                for (var i = 0; i < result.length; i++) {
                    var obs = result[i];
                    var sum = visitFeeders(obs.feeders, 'kWh');
                  
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