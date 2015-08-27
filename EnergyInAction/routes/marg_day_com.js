var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('marg_day_com', { title: 'marg_day_com' });
});

module.exports = router;
