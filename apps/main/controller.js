'use strict';

var express = require("express"),
    router = express.Router(), //enrutador
    Book = require('../book/models').Book;

router.route('/')
    .get(function (req, res)
    {
        console.log(req.user);
        Book.find().exec()
            .then(function (books) {
                res.render('main/index.html',{books:books});
            })
        // res.render('main/index.html');
    });

//permite utilizar este archivo en otro lugar
module.exports = router;
