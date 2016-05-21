'use strict';
var mongoose= require('../../config/mongoose'),
    userSchema = require("./schemas").userSchema; //traigo el esquema ed usuario

var models ={
    User : mongoose.model('user', userSchema)
};

module.exports = models;