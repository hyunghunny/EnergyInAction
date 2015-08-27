var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('marg_weeklyTrend', { title: 'marg_weeklyTrend' });
});

module.exports = router;
