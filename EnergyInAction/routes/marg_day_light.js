var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('marg_day_light', { title: 'marg_day_light' });
});

module.exports = router;
