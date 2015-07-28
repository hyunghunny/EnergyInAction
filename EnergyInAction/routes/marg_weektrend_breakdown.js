var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('marg_weektrend_breakdown', { title: 'marg_weektrend_breakdown' });
});

module.exports = router;
