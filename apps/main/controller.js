'use strict';

var express = require("express"),
    router = express.Router(); //enrutador

router.route('/')
    .get(function (req, res)
    {
        res.render('main/index.html');
    });

//permite utilizar este archivo en otro lugar
module.exports = router;
