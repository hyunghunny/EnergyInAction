var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('live', { title: 'live' });
});

module.exports = router;
