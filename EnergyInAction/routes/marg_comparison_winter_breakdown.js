﻿var express = require('express');
var router = express.Router();

/* GET daily flow page. */
router.get('/', function (req, res) {
    res.render('marg_comparison_winter_breakdown', { title: 'marg_comparison_winter_breakdown' });
});

module.exports = router;
