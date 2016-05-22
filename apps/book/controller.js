'use strict';
var express = require("express"),
    router = express.Router(),
    formidable = require('formidable'),
    path = require('path'),
    Book = require ('./models').Book,
    slug = require('slug'),
    isLoggedIn = require('../user/middlewares').isLoggedIn;

// router.use(isLoggedIn); con esto todas las rutas de libros estan protejidas

router.route('/libro/:book_slug')
    .get(function (req,res)
    {
        res.render('book/book_detail.html');
    })

router.route('/admin/crear-libro')
    .get(isLoggedIn,function(req,res)
    {
        res.render('book/create_book.html')
    })
    .post(isLoggedIn, function (req,res)
    {
        var form = new formidable.IncomingForm();
        var path_file = path.join(__dirname, '..','..','media','books');
        form.uploadDir = path_file;
        form.parse(req, function (err,fields,files)
        {
            // console.log(files);
            // console.log(fields);
            var book = new Book({
               title : fields.title,
               slug: slug(fields.title.toLowerCase()),
                summary : fields.summary,
               author : fields.author,
                image : req.MEDIA_URL + '/books/' + files.image.name

            });
            book.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                };
            });
        });

    });
module.exports = router;