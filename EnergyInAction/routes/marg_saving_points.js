var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('marg_saving_points', { title: 'marg_saving_points' });
});

module.exports = router;
