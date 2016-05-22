'use strict';
var mongoose= require('../../config/mongoose'),
    bookSchema = require("./schemas").bookSchema; //traigo el esquema ed usuario

var models ={
    Book : mongoose.model('book', bookSchema)
};

module.exports = models;