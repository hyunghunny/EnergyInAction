var mongodb = require('mongodb');

var MongoDBManager = function (options) {
    
    this.url = 'mongodb://' + options.host + ':' + options.port + '/' + options.dbName;
    this.defaultLimit = options.limit | 100;

    this.database = null;

    process.on('exit', function (code) {
        // close database on exit.
        db.close();
    });

}
MongoDBManager.prototype.isConnected = function () {
    if (this.database) {
        return true;
    } else {
        return false;
    }
}

MongoDBManager.prototype.connect = function (cb) {
    var self = this;
    var client = mongodb.MongoClient;
    client.connect(this.url, function (err, db) {
        if (err) {
            console.log(err);
            self.database = db;
            cb(false);
        } else {
            console.log('database opened properly.');
            self.database = db;
            cb(true);
        }
 
    });
}

MongoDBManager.prototype.disconnect = function () {
    if (this.database) {
        this.database.close();
        this.database = null;
        console.log('data base is disconnected properly.');
    }
}

MongoDBManager.prototype.insert = function (collectionName, obj) {
    if (this.database === null) {
        console.log('database is not opened: invoke open() before insert()');
        return;
    }
    
    this.database.collection(collectionName, function (err, collection) {
        if (err) {
            console.log(err);
        } else {
            collection.insert(obj, function (err, result) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

MongoDBManager.prototype.aggregateFeeders = function (collectionName, labId, queries, callback) {
    
     
    if (this.database == null) {
        console.log('database is not opened: invoke open() before find()');
        callback(new Error("database is not opened."));
        return;
    }
  
    if (queries.startDate != null && queries.endDate != null) {
  
        console.log("Aggregate " + labId + " feeders" + " at " + queries.startDate.toLocaleString() + " ~ " + queries.endDate.toLocaleString());
    } else {
        callback([]); // empty result
        return;
    }

    this.database.collection(collectionName, function (err, collection) {
        if (err) {
            console.log(err);
        } else {
            var feeders = labId + ".feeders";
            var feedersKey = "$" + feeders;
            var feederIDKey = "$" + feeders + ".feederID";
            var feederValueKey = "$" + feeders + ".value";
            var feederDescriptionKey = "$" + feeders + ".description";
            var projectObj = {}  
            projectObj[feeders] = 1; // XXX: javaScript confused that feeders is the key name or the variable.
//            console.log('aggregate data from ' + queries.startDate + ' until ' + queries.endDate);
            collection.aggregate([
                { "$match": { "dateFrom" : {
                            "$gte": queries.startDate, 
                            "$lt": queries.endDate 
                        }
                    }
                },
                { "$project": projectObj },
                { "$unwind": feedersKey },
                { "$group": { _id : feederIDKey, "value" : { "$sum" : feederValueKey }} },
                { "$sort" : { _id : 1 }}],
                function (err, result) {
                if (err) {
                    console.log(err);
                    callback([]);
                } else {
                    callback(result);
                }
                
            });
        }
    });

}


MongoDBManager.prototype.find = function (collectionName, queries, callback) {
   
    if (this.database == null) {
        console.log('database is not opened: invoke open() before find()');
        callback(new Error("database is not opened."));
        return;
    }

    var options = {};
    var dbquery = {};
    if (queries.limit != null) {
        options.limit = queries.limit;
    } else {
        options.limit = this.defaultLimit;
    }
    
    if (queries.skip != null) {
        options.skip = queries.skip;
    }
    
    if (queries.startDate != null && queries.endDate != null) {
               
        dbquery.dateFrom = {
            $gte: queries.startDate, 
            $lt: queries.endDate  
        }
        //console.log("Find " + queries.startDate + " ~ " + queries.endDate);
    } else if (queries.startDate != null) {

        dbquery.dateFrom = {
            $gte: queries.startDate
        }
    } else if (queries.endDate != null) {
        
        dbquery.dateFrom = {
            $lt: queries.endDate  
        }
    } else {
        callback([]); // empty result
        return;
    }
    
    // inquiry only for 
    if (queries.type != null) {
        dbquery.type = queries.type;
        dbquery.labId = queries.labId;
    }
    
    // filter out _id attribute in default;
    options._id = false;
    
    this.database.collection(collectionName, function (err, collection) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(dbquery) + ', ' + JSON.stringify(options));
            collection.find(dbquery, options)
                .sort({ dateFrom : 1 })
                .toArray(function (err, result) {
                    if (err) {
                    console.log(err);
                    callback([]);
                } else {
                    callback(result);
                }
                    
            });
        }
    });
 
}

MongoDBManager.prototype.findLatest = function (collectionName, callback) {
    if (this.database == null) {
        console.log('database is not opened: invoke open() before find()');
        callback(new Error("database is not opened."));
        return;
    }
    this.database.collection(collectionName, function (err, collection) {
        if (err) {
            console.log(err);
        } else {
            collection.find({}, { _id: false })
                .sort({ dateFrom : -1 })
                .limit(1)
                .toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result != null && result.length == 1) {
                    callback(result[0]);
                } else {
                    callback(0); // XXX:unexpected return from mongodb
                }        
            });
        }
    });
}


module.exports = MongoDBManager;