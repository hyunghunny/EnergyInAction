﻿var config = require('./config');

var DBManager = require('./dbmgr');
var dbmgr = new DBManager(config.mongodb);

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
                "href": "/api/labs/" + array[i].id + "/energy/secs.json",
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
    var collection = 'site73_hour'; //'site73_1sec'; // use 1 sec data
    this.deviceID = '';
    this.location = '';
    this.feeders = []; // initialize feeder list
    
    var self = this;
    // get feeder list at db
    if (dbmgr.dbOpened == false) {
        dbmgr.open(function (result) {
           
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

    var collection = 'site73_hour'; //'site73_1sec'

    var self = this;
    
    if (dbmgr.dbOpened == false) {
        console.log('database is not opened.');
        cb(null);
    } else {
        queries.startDate = new Date(queries.base_time);
        queries.endDate = new Date(queries.to_time - (queries.to_time % 3600000)); // truncate hours only

        
        dbmgr.aggregateFeeders('site73_hour', self.id, queries, function (results) {
            var hoursResults = results;
            queries.startDate = new Date(queries.endDate);
            queries.endDate = new Date(queries.to_time);

            dbmgr.aggregateFeeders('site73_1sec', self.id, queries, function (results) {
                
                var secsResults = results;
                var returnObj = {};
                returnObj["dateFrom"] = queries.startDate;
                returnObj["dateTo"] = queries.endDate;
                
                var mergedResults = [];
                // results returns { _id: , value: } form
                for (var i = 0; i < hoursResults.length; i++) {
                    var hourResult = hoursResults[i];
                    var mergedResult = hourResult;
                    for (var j = 0; j < secsResults.length; j++) {
                        var secResult = secsResults[j];
                        if (secResult._id === mergedResult._id) {
                            mergedResult.value = hoursResults[i].value + secResult.value; // XXX: add hours value and secs value
                    
                        }
                    }
                    
                    mergedResult.feederID = mergedResult._id;
                    delete mergedResult._id;
                    mergedResults.push(mergedResult);
                }
                returnObj["deviceID"] = self.deviceID;
                returnObj["location"] = self.location;
                returnObj["feeders"] = mergedResults;
                var returnArray = [];
                returnArray.push(returnObj);
                    cb(returnArray);
            });
        });

    }

}


LabEnergyManager.prototype.retrieveUsages = function (type, queries, cb) {
    
    // type can be one of follows: secs, quarters, hours, total
    var collection = null;
    switch (type) {
        case 'secs':
            collection = 'site73_1sec';
            break;
        case 'quarters':
            collection = 'site73_15min';
            break;
        case 'hours':
            collection = 'site73_hour';
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
        
        // set default filters to disable all
        var filters = {
            "ux" : false,
            "marg" : false,
            "hcc" : false
        }
        delete filters[this.id]; // enable a specific lab information only
        
        if (dbmgr.dbOpened == false) {
            dbmgr.open(function (result) {
                if (result) {
                    dbmgr.find(collection, queries, filters, cb);
                }
            })
        } else {
            dbmgr.find(collection, queries, filters, cb);
        }
        
            

    }
}

// TODO: add API handlers 

exports.labs = new SiteManager([
    new LabEnergyManager("ux", "UX Lab.", "User Experience Lab."),
    new LabEnergyManager("marg", "MARG Lab.", "Music and Audio Research Group"),
    new LabEnergyManager("hcc", "HCC Lab.", "Human Centered Computing Laboratory")
]);
