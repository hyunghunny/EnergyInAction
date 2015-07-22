var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('live_com', { title: 'live_com' });
});

module.exports = router;
