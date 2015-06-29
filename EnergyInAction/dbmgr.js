var mongodb = require('mongodb');

var MongoDBManager = function (options) {
    var dbServer = new mongodb.Server(
        options.host, 
        options.port, 
        { auto_reconnect: true }
    );

    this.defaultLimit = options.limit | 100;

    this.db = new mongodb.Db(options.dbName, 
    dbServer, 
    { w: 1 }
    );

    // flag to check db connection
    this.dbOpened = false;
    
    //this.open(function (result) { }); // automatically open the database

    process.on('exit', function (code) {
        // close database on exit.
        db.close();
    });

}

MongoDBManager.prototype.open = function (cb) {
    var self = this;
    this.db.open(function (err, connection) {
        if (err) {
            console.log(err);
            self.dbOpened = false;
            cb(false);
        } else {
            console.log('database opened properly.');
            self.dbOpened = true;
            cb(true);
        }
 
    });
}

MongoDBManager.prototype.insert = function (collectionName, obj) {
    if (this.dbOpened === false) {
        console.log('database is not opened: invoke open() before insert()');
        return;
    }
    
    this.db.collection(collectionName, function (err, collection) {
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
    
     
    if (this.dbOpened == false) {
        console.log('database is not opened: invoke open() before find()');
        callback(new Error("database is not opened."));
        return;
    }
  
    if (queries.startDate != null && queries.endDate != null) {
  
        console.log("Aggregate " + labId + "feeders" + " at " + queries.startDate + " ~ " + queries.endDate);
    } else {
        callback([]); // empty result
        return;
    }

    this.db.collection(collectionName, function (err, collection) {
        if (err) {
            console.log(err);
        } else {
            var feeders = labId + ".feeders";
            var feedersKey = "$" + feeders;
            var feederIDKey = "$" + feeders + ".feederID";
            var feederValueKey = "$" + feeders + ".value";
            var projectObj = {}  
            projectObj[feeders] = 1; // XXX: javaScript confused that feeders is the key name or the variable.

            collection.aggregate([
                { "$match": { "dateFrom" : {
                            "$gt": queries.startDate, 
                            "$lt": queries.endDate 
                        }
                    }
                },
                { "$project": projectObj },
                { "$unwind": feedersKey },
                { "$group": { _id : feederIDKey, "value" : { "$sum" : feederValueKey } } },
                { "$sort" : { _id : 1 }}],
                function (err, result) {
                if (err) {
                    console.log(err);
                }
                callback(result);
            });
        }
    });

}


MongoDBManager.prototype.find = function (collectionName, queries, filters, callback) {
    
    if (this.dbOpened == false) {
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
        //TODO:validate dateString later
        
        dbquery.dateFrom = {
            $gt: queries.startDate, 
            $lt: queries.endDate  
        }
        console.log("Find " + queries.startDate + " ~ " + queries.endDate);
    } else {
        callback([]); // empty result
        return;
    }
    
    // filter out _id attribute in default;
    filters._id = false;
    
    this.db.collection(collectionName, function (err, collection) {
        if (err) {
            console.log(err);
        } else {
            
            collection.find(dbquery, filters, options)
                .sort({ dateFrom : 1 })
                .toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    callback(result);
            });
        }
    });
 
}

MongoDBManager.prototype.findLatest = function (collectionName, callback) {
    if (this.dbOpened == false) {
        console.log('database is not opened: invoke open() before find()');
        callback(new Error("database is not opened."));
        return;
    }
    this.db.collection(collectionName, function (err, collection) {
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