var config = require('./config');
var socketIo = require('socket.io');
var CronJob = require('cron').CronJob;

var DBManager = require('./dbmgr');
var dbmgr = new DBManager(config.mongodb);
var socketServer = null;
var fs = require('fs');
var csvFileName = 'lab_display_state_log.csv';

exports.connect = function (server, cb) {
    socketServer = socketIo.listen(server);

    socketServer.sockets.on('connection', function (socket) {
        console.log('socket connected');
        cb(socket);
    });
}

exports.isConnected = function () {
    if (socketServer) {
        return true;
    } else {
        return false;
    }
}

exports.emit = function (msg, socket) {
    if (socket == null && socketServer != null) {
        socketServer.sockets.emit('update', msg);
    } else if (socket != null) {
        socket.emit('update', msg);
    } else {
        console.log('no socket available. please connect first');
    }

}

exports.start = function (server) {
    socketServer = socketIo.listen(server);

    socketServer.sockets.on('connection', function (socket) {
        //console.log('socket client connected');
        // add updated event listener to broadcast
        socket.on('updated', function (obj) {
            // echoing to clients
            console.log('page updated: ' + obj);
<<<<<<< HEAD
            
            // skip airport IP
            if ((obj.id).indexOf('147.47.120.217') == -1) {
                var csvStream = fs.createWriteStream(csvFileName, { 'flags': 'a' }); 
=======

            if ((obj.id).indexOf('147.47.120.217') == -1) {
                var csvStream = fs.createWriteStream(csvFileName, { 'flags': 'a' });
>>>>>>> Bobby
                var timestamp = new Date(obj.date).getTime();
                var id = obj.id;
                var state = obj.state;
                var logMsg = timestamp + ',' + id + ',' + state;
                console.log('write log:' + logMsg);
                // save as a csv file
                csvStream.write(logMsg + '\n');
                csvStream.end();
            }
            // broadcast messages to check page health
            socketServer.sockets.emit('updated', '[' + new Date(obj.date).toLocaleString() + '] ' + obj.id  + ' is ' + obj.state);
        });
    });

    var hoursJob = new CronJob('30 02 * * * *', function () {
        checkUpdate('hour');
    }, null, false);
    var quarter1Job = new CronJob('30 17 * * * *', function () {
        checkUpdate('15min');
    }, null, false);
    var halfJob = new CronJob('30 32 * * * *', function () {
        checkUpdate('30min');
    }, null, false);
    var quarter3Job = new CronJob('30 47 * * * *', function () {
        checkUpdate('45min');
    }, null, false);

    console.log('register event handlers...');
    hoursJob.start();
    quarter1Job.start();
    halfJob.start();
    quarter3Job.start();
}

function checkUpdate(type) {
    console.log('try to check DB updated when ' + type);
    if (!dbmgr.isConnected()) {
        console.log('try to connect DB...');
        dbmgr.connect(function (result) {
            if (result) {
                emitLatestUpdate();
            }
        })
    } else {
        emitLatestUpdate();
    }
}

var previousUpdated = null;

// check DB has been updated and emit it
function emitLatestUpdate() {
    var collection = config.collection.quarters;
    dbmgr.findLatest(collection, function (result) {

        var lastUpdated = new Date(result.dateTo);
        var now = new Date();
        var difference = 900000; // 15 min
        console.log(now + ":" + lastUpdated);

        if (difference > now.getTime() - lastUpdated.getTime()) {
            if (socketServer) {
                if (previousUpdated != lastUpdated) {
                    socketServer.sockets.emit('update', lastUpdated);
                    console.log('update has been emitted to everyone.');

                } else {
                    console.log('skip to emit due to duplication');
                }
                previousUpdated = lastUpdated;
            } else {
                console.log('no socket connected!');
                // XXX:reconnection required here
            }

        } else {
            console.log('DB is not updated yet. waiting 1 minute to retrieve again.');
            // invoke it again after 1 min. later
            setTimeout(function () {
                checkUpdate('retry');
            }, 60000);
        }
    });
}
