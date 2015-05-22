var config = require('./config');

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


// TODO: add API handlers 

exports.labs = new SiteManager([
    new LabEnergyManager("ux", "UX Lab.", "User Experience Lab."),
    new LabEnergyManager("marg", "MARG Lab.", "Music and Audio Research Group"),
    new LabEnergyManager("hcc", "HCC Lab.", "Human Centered Computing Laboratory")
]);


var LabEnergyManager = function (id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;

    this.feeders = []; // initialize feeder list
    // TODO: get feeder list at db
}

LabEnergyManager.prototype.retrieveUsages = function (type, queries, cb) {
    // TODO:query db with a specific type
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
        case 'total':
            // TODO: aggregate following collections:
            collections = ['site73_1sec', 'site73_15min', 'site73_hour'];
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
        filters[this.id] = true; // enable a specific lab information only

        dbmgr.find(collection, queries, filters, cb);
            
)
    }
}