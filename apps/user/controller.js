'use strict';
var express = require ('express'),
    router = express.Router(),
    User = require ("./models").User;

router.route('/ingresar/')
    .get (function (req,res)
    {
        res.render('user/login.html')
    });

router.route('/registrar/')
    .get (function (req,res)
    {
        res.render('user/register.html')
    })
    .post(function (req,res)
    {
        var user = new User({
           username :req.body.username,
           password : req.body.password
        });
        user.save(function (err)
        {
            if(err){
                console.log(err);
            };
            res.redirect("/ingresar/");
        })
        console.log(req.body);
    })


module.exports = router;