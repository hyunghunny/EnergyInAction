var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('marg_smile', { title: 'marg_smile' });
});

module.exports = router;
