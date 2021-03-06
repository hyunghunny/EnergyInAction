﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var timeout = require('connect-timeout');

// add to response open API
var apis = require('./routes/api');

// add demo pages
//var daily = require('./routes/daily');
//var daily_flow = require('./routes/daily_flow');
//var beyond_extremes = require('./routes/beyond_extremes');

/////////////
// MARG set
////////////
// 1. Month
var marg_month           = require('./routes/marg_month');
var marg_month_breakdown = require('./routes/marg_month_breakdown');

// 2. week
var marg_week           = require('./routes/marg_week');
var marg_week_breakdown = require('./routes/marg_week_breakdown');

// 3. Day
var marg_day       = require('./routes/marg_day');
var marg_day_com   = require('./routes/marg_day_com');
var marg_day_hvac  = require('./routes/marg_day_hvac');
var marg_day_light = require('./routes/marg_day_light');

// 4. Realtime
var marg_realtime           = require('./routes/marg_realtime');
var marg_realtime_breakdown = require('./routes/marg_realtime_breakdown');

// 5. Smile
var marg_smile           = require('./routes/marg_smile');

// 6. meter
var marg_meter  = require('./routes/marg_meter');

// 7. comparison
var marg_comparison_winter  = require('./routes/marg_comparison_winter');
var marg_comparison_winter_breakdown  = require('./routes/marg_comparison_winter_breakdown');

// 8. points
var marg_saving_points  = require('./routes/marg_saving_points');


/////////////
// HCC set
/////////////
var hcc_realtime           = require('./routes/hcc_realtime');
var hcc_realtime_breakdown = require('./routes/hcc_realtime_breakdown');

/////////////
// UX set
/////////////
var ux_realtime = require('./routes/ux_realtime');
var ux_realtime_breakdown = require('./routes/ux_realtime_breakdown');

var app = express();


app.use(timeout('10s')); // set timeout as 10 secs
//app.use(haltOnTimeout);

// to support CORS
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', apis);
//app.use('/daily', daily);
//app.use('/daily_flow', daily_flow);
//app.use('/beyond_extremes', beyond_extremes);


function haltOnTimeout(req, res, next) {
    console.log('halt on timeout: ' + req.timedout);
    if (!req.timedout) {
        next();
    } else {
        console.log('Timeout occurred. program will be terminated');
        var err = new Error('504')
        res.sendStatus(err.message);
        
        process.exit(1);
    }
} 


/////////////
// MARG set
////////////
// 1. Month
app.use('/marg_month', marg_month);
app.use('/marg_month_breakdown', marg_month_breakdown);

// 2. Week
app.use('/marg_week', marg_week);
app.use('/marg_week_breakdown', marg_week_breakdown);

// 3. Day
app.use('/marg_day', marg_day);
app.use('/marg_day_com', marg_day_com);
app.use('/marg_day_hvac', marg_day_hvac);
app.use('/marg_day_light', marg_day_light);

// 4. Realtime
app.use('/marg_realtime', marg_realtime);
app.use('/marg_realtime_breakdown', marg_realtime_breakdown);

// 5. Smile
app.use('/marg_smile', marg_smile);

// 6. meter
app.use('/marg_meter', marg_meter);

// 7. comparison
app.use('/marg_comparison_winter', marg_comparison_winter);
app.use('/marg_comparison_winter_breakdown', marg_comparison_winter_breakdown);

// 8. points
app.use('/marg_saving_points', marg_saving_points);


/////////////
// HCC set
////////////
app.use('/hcc_realtime', hcc_realtime);
app.use('/hcc_realtime_breakdown', hcc_realtime_breakdown);


/////////////
// UX set
////////////
app.use('/ux_realtime', ux_realtime);
app.use('/ux_realtime_breakdown', ux_realtime_breakdown);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// create http server at port 3000
var http = require('http');
var config = require('./config');

var server = http.createServer(app).listen(config.server.port, function () {
    console.log("Express server listening on port " + config.server.port);
});

//server.timeout = 10000; // set timeout as 10 secs

// attach realtime notifier
var notifier = require('./notify.js');
notifier.start(server);

module.exports = app;
