'use strict';

var config = function (server){
    console.log("estoy en prodccion pero en otro archivo");
    server.use(function (req,res,next)
    {
        req.MEDIA_URL = "http://localhost:8000/media";
        next();
    })
};

module.exports = config;
