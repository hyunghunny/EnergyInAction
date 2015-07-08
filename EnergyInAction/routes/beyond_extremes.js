var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('beyond_extremes', { title: 'Electricity Consumption Plot' });
});

module.exports = router;
