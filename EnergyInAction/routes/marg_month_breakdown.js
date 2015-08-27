var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('marg_month_breakdown', { title: 'marg_month_breakdown' });
});

module.exports = router;
