var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('daily_flow', { title: 'Daily Consumption Flow Page' });
});

module.exports = router;