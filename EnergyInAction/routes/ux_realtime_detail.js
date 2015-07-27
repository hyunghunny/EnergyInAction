var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('ux_realtime_detail', { title: 'ux_realtime_detail' });
});

module.exports = router;
