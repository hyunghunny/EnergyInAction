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
    var hoursJob = new CronJob('30 02 * * * *', checkUpdate);
    var quarter1Job = new CronJob('30 17 * * * *', checkUpdate);
    var halfJob = new CronJob('30 32 * * * *', checkUpdate);
    var quarter3Job = new CronJob('30 47 * * * *', checkUpdate);
    hoursJob.start();
    quarter1Job.start();
    halfJob.start();
    quarter3Job.start();
}

function checkUpdate() {   
        
    if (!dbmgr.isConnected()) {
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
            }
        } else {
            console.log('DB is not updated yet. waiting 1 minute to retrieve again.');
            // invoke it again after 1 min. later
            setTimeout(function () {
                checkUpdate();
            }, 60000);
        }
    });
}