var config = require('./config');

var DBManager = require('./dbmgr');
var dbmgr = new DBManager(config.mongodb);
var labInfo = require('./lab_info.js');

/*************************************************************************/
// APIs
var APIManager = function (contentType) {
    this.contentType = contentType;
};

APIManager.prototype.getBillboard = function () {
    if (this.contentType == 'application/json') {
        var apiObj = {
            "api": [
                {
                    "href": "/api/labs",
                    "type": "ItemList"
                }]
        }
        return JSON.stringify(apiObj);
    }
    // TODO: add more content type here.
}

APIManager.prototype.getContentHeader = function () {
    return { "Content-Type": this.contentType };
}

exports.api = new APIManager('application/json');


var SiteManager = function (array) {
    this.labs = array;
    this.api = [];
    for (var i = 0; i < array.length; i++) {
        var apiObj = {
            "href": "/api/labs/" + array[i].id,
            "type": "ItemList"
        }
        this.api.push(apiObj);


        // add api property in each lab object
        var lab = array[i];
        var labApiObj = [
            {
                "href": "/api/labs/" + array[i].id + "/energy/latest.json",
                "type": "ItemList"
            },
            {
                "href": "/api/labs/" + array[i].id + "/energy/quarters.json",
                "type": "ItemList"
            },
            {
                "href": "/api/labs/" + array[i].id + "/energy/hours.json",
                "type": "ItemList"
            },
            {
                "href": "/api/labs/" + array[i].id + "/energy/total.json",
                "type": "ItemList"
            },
            {
                "href": "/api/labs/" + array[i].id + "/energy/feeders",
                "type": "ItemList"
            }
        ];
        lab.api = labApiObj;


    }
}

/*
 * Find a lab with a id which is monitored
 */
SiteManager.prototype.find = function (id) {
    var labObj = null;
    var labList = this.labs;
    for (var i = 0; i < labList.length; i++) {
        if (labList[i].id == id) {
            labObj = labList[i];
            return labObj;
        }
    }
    return null;
}


var LabEnergyManager = function (id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    var collection = config.collection.quarters;  // use 15 min data
    this.deviceID = '';
    this.location = '';
    this.feeders = []; // initialize feeder list

    var self = this;
    // get feeder list at db
    if (!dbmgr.isConnected()) {
        dbmgr.connect(function (result) {
            if (result) {
                dbmgr.findLatest(collection, function (result) {

                    var labObj = result[self.id];
                    self.deviceID = labObj.deviceID;
                    self.location = labObj.location;

                    for (var i = 0; i < labObj.feeders.length; i++) {
                        var feederObj = labObj.feeders[i];
                        delete feederObj.value;
                        self.feeders.push(feederObj);
                    }
                })
            }
        })
    }

}

LabEnergyManager.prototype.accumulateUsages = function (queries, cb) {

    var self = this;

    if (dbmgr.dbOpened == false) {
        console.log('database is not opened.');
        cb(null);
    } else {
        queries.startDate = new Date(queries.base_time);
        queries.endDate = new Date(queries.to_time - (queries.to_time % 900000)); // truncate quarters only
        //console.log('accumulate data from ' + queries.startDate.toLocaleString() + ' to ' + queries.endDate.toLocaleString());
        var id = this.id;
        dbmgr.aggregateFeeders(config.collection.hours, self.id, queries, function (results) {

            var returnObj = {};
            returnObj["dateFrom"] = queries.startDate;
            returnObj["dateTo"] = queries.endDate; // XXX: If there is insufficient observations, this timestamp is not valid.
            returnObj["deviceID"] = self.deviceID;
            returnObj["location"] = self.location;

            var feeders = [];
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var feeder = {};
                feeder.feederID = result._id;
                feeder.value = result.value;
                feeder.description = labInfo.labs.getDescription(self.id, result._id);
                feeders.push(feeder);
            }
            returnObj["feeders"] = feeders;
            
            excludeFeeders(id, returnObj); // XXX:exclude some feeders

            cb(returnObj);

        });

    }

}

/*
 * return date as YYYY-MM-dd [Sun-Sat]
 */
function dateToSimpleString(date) {
    var dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    switch (date.getDay()) {
        case 0:
            dateString = dateString + ' [Sun]';
            break;
        case 1:
            dateString = dateString + ' [Mon]';
            break;
        case 2:
            dateString = dateString + ' [Tue]';
            break;
        case 3:
            dateString = dateString + ' [Wed]';
            break;
        case 4:
            dateString = dateString + ' [Thu]';
            break;
        case 5:
            dateString = dateString + ' [Fri]';
            break;
        case 6:
            dateString = dateString + ' [Sat]';
            break;
    }
    return dateString;
}


LabEnergyManager.prototype.retrieveDailyUsages = function(queries, cb) {
    var offset = queries.offset;
    var skip = queries.skip; // set start day by adding skip numbers

    var dayFrom = new Date(queries.day_from);
    dayFrom.setDate(dayFrom.getDate() + skip);
    dayFrom.setHours(dayFrom.getHours() + offset);
//    console.log(dayFrom);

    var dayTo = new Date(queries.day_to);
    dayTo.setHours(dayTo.getHours() + offset);

    var limit = queries.limit; // limit iteration
    var self = this;
    var results = [];
    var count = 0;

    for (var i = 0; i < limit; i++) {
        var queries = {}
        var startDate = new Date(dayFrom);
        startDate.setDate(startDate.getDate() + i);
        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1); // increase 1 day  after startDate

        queries.base_time = startDate.getTime();

        if (queries.base_time <= dayTo.getTime()) {

            queries.to_time = endDate.getTime();

            //console.log("From " + startDate.toLocaleDateString() + " to " + endDate.toLocaleDateString());

            var accumluateAsync = function (queries) {
                // repeat accumulateUsages() day by day
                self.accumulateUsages(queries, function(result) {
                    //console.log(JSON.stringify(result));
                    results.push(result);
                    if (results.length == count) {
                        // sort array before passing it
                        results.sort(function (a, b) {
                            return a.dateFrom.getTime() - b.dateFrom.getTime();
                        });
                        cb(results);

                    }
                });
            }(queries);

            queries.base_time = queries.to_time; // set next day
            count = count + 1;
        } else {
            break;
        }

    }


}

LabEnergyManager.prototype.postMessage = function (type, messageObj) {

    var now = new Date();
    var postObj = {
        "_id" : parseInt(now.getTime()),
        "type" : type,
        "labId": this.id,
        "message" : messageObj.message,
        "datePublished" : now
    };

    if (messageObj.dateFrom) {
        postObj.dateFrom = new Date(messageObj.dateFrom);
    } else {
        postObj.dateFrom = new Date();
    }

    dbmgr.insert(config.collection.messages, postObj);
    return true;
}

LabEnergyManager.prototype.getLatestMessage = function (type, cb) {
    var collection = config.collection.messages;

    var queries = {};
    queries.endDate = new Date(); // set now
    queries.limit = 10; // XXX: how many messages will be required?

    queries.labId = this.id;
    queries.type = type;

    if (dbmgr.dbOpened == false) {
        console.log('data base is not opened');
        cb(null);
    } else {
        dbmgr.find(collection, queries, function (msgs) {
            var size = msgs.length;
            // TODO:Sort with datePublished ascending order and return the 1st element
            var array = msgs;
            array.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.datePublished) - new Date(a.datePublished);
            });
            cb(array[0]);
        });
    }
}


LabEnergyManager.prototype.retrieveUsages = function (type, queries, cb) {

    var collection = null;
    switch (type) {
   //     case 'secs': // XXX: This API will be deprecated!
   //         collection = config.collection.secs;
   //         break;
        case 'quarters':
            collection = config.collection.quarters;
            break;
        case 'hours':
            collection = config.collection.hours;
            break;
        default:
            // ERROR: unknown type
            cb(null);
            return;
    }
    if (collection != null) {
        // translate timestamp into ISODate add startDate and endDate into queries
        queries.startDate = new Date(queries.base_time);
        queries.endDate = new Date(queries.to_time);
        console.log(type + ' data from ' + queries.startDate + ' to ' + queries.endDate);
        
        // set default filters to disable all
        var filters = {
            "ux" : false,
            "marg" : false,
            "hcc" : false
        }
        delete filters[this.id]; // enable a specific lab information only
        queries.filters = filters;

        var id = this.id;
            
        dbmgr.find(collection, queries, function (data) {
            for (var i = 0; i < data.length; i++) {
                var obs = data[i];
                if (obs[id]) {
                    obs.deviceID = obs[id].deviceID;
                    obs.location = obs[id].location;
                    obs.feeders = obs[id].feeders;

                    excludeFeeders(id, obs);

                    // remove all labs
                    delete obs['marg'];
                    delete obs['hcc'];
                    delete obs['ux'];

                } else {
                    console.log('invalid result: ' + JSON.stringify(obs))
                }
                
            }
            
            cb(data);
        });

    }
}

LabEnergyManager.prototype.realtimeUsages = function (queries, cb) {
    var encored_loader = require('./encored_data_loader.js');
    var labId = this.id;
    encored_loader.getLatest(queries.labId, function (obs) {
        excludeFeeders(labId, obs);       
        cb(obs);
    })
}

// XXX: below function is an alternative implementation to skip some feeders.
// USE IT UNDER A CAUTION!
function excludeFeeders(labId, obs) {
    //console.log(labId);
    if (labId == 'hcc') {

        var feeders = obs.feeders;
            
        var validFeeders = [];
        for (var i = 0; i < feeders.length; i++) {
            var feeder = feeders[i];
            switch (feeder.feederID) {
                case 6:
                case 11:
                    console.log('skipping ' + feeder.feederID + ' feeder of HCC');
                    break;
                default:
                    validFeeders.push(feeder);
                    break;
            }
        }
        obs.feeders = validFeeders;
        //console.log(JSON.stringify(obs.feeders));        
        
    }
}

// TODO: add API handlers

exports.labs = new SiteManager([
    new LabEnergyManager("ux", "UX Lab.", "User Experience Lab."),
    new LabEnergyManager("marg", "MARG Lab.", "Music and Audio Research Group"),
    new LabEnergyManager("hcc", "HCC Lab.", "Human Centered Computing Laboratory")
]);
