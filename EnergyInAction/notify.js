var config = require('./config');
var socketIo = require('socket.io');
var CronJob = require('cron').CronJob;
var currentSocket = null;

var DBManager = require('./dbmgr');
var dbmgr = new DBManager(config.mongodb);


exports.connect = function (server, cb) {
    var io = socketIo.listen(server);
    //io.set('log level', 2); // to reduce log messages

    io.sockets.on('connection', function (socket) {
        //console.log('socket connected');
        currentSocket = socket;
        socket.on('disconnect', function () {
            console.log('socket is disconnected');
            currentSocket = null;
        });
        cb(socket);
    });


}

exports.emit = function (msg, socket) {
    if (socket == null && currentSocket != null) {
        socket = currentSocket;
    }
    
    if (socket != null) {
        socket.emit('update', msg);
    }
    
}

exports.start = function () {
    
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


var isProcessing = false;

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

// check DB has been updated and emit it 
function emitLatestUpdate() {
    var collection = config.collection.quarters;
    dbmgr.findLatest(collection, function (result) {
        
        var lastUpdated = new Date(result.dateTo);
        var now = new Date();
        var difference = 900000; // 15 min
        console.log(now + ":" + lastUpdated);

        if (difference > now.getTime() - lastUpdated.getTime()) {
            if (currentSocket) {
                currentSocket.emit('update', lastUpdated);
                console.log('update has been emitted.');
            } else {
                console.log('no socket connected!');
            }
            isProcessing = false;
        } else {
            console.log('DB is not updated yet. waiting 1 minute to retrieve again.');
            // invoke it again after 1 min. later
            setTimeout(function () {
                checkUpdate('retry');
            }, 60000);
        }
    });
}