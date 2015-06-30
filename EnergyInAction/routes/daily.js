var express = require('express');
var router = express.Router();

/* GET daily page. */
router.get('/', function (req, res) {
    res.render('daily', { title: 'Daily Consumption Page' });
});

module.exports = router;