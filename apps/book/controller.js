'use strict';
var express = require("express"),
    router = express.Router(),
    formidable = require('formidable'),
    path = require('path'),
    Book = require ('./models').Book,
    fs = require('fs'), 
    slug = require('slug'),
    isLoggedIn = require('../user/middlewares').isLoggedIn;

// router.use(isLoggedIn); con esto todas las rutas de libros estan protejidas

router.route('/libro/:book_slug')
    .get(function (req,res)
    {
        Book.findOne({slug:req.params.book_slug}).exec()
            .then(function (book) {
                res.render('book/book_detail.html', {book : book});
            });
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
        form.uploadDir = path_file; // lugar donde lo vamos a subir
        form.parse(req, function (err,fields,files)
        {
            console.log(files);
            console.log(fields);
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

        form.on('end', function (fields, files) {
            var file_name = this.openedFiles[0].path;
            var new_file_name = this.openedFiles[0].name;
            fs.rename(file_name, path_file + '/' + new_file_name, function (err, stats){
                if (err) {console.log(err)};
                res.redirect('/admin/crear-libro/');
            });
        });

    });
module.exports = router;