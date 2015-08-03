var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('hcc_realtime_breakdown', { title: 'hcc_realtime_breakdown' });
});

module.exports = router;
