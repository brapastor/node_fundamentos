'use strict';

var express = require("express"),
    router = express.Router(); //enrutador

router.route('/')
    .get(function (req, res)
    {
        console.log(req.user);
        res.render('main/index.html');
    });

//permite utilizar este archivo en otro lugar
module.exports = router;
