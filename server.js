'use strict';

//CREANDO EL SERVIDOR
//region SERVIDOR
var express = require("express"), //requiriendo express
    server = express(), //creando el servidor
    swig = require("swig"), //motor de plantilla
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    port = process.env.PORT || 8000;
// endregion

//BodyParser
server.use(bodyParser.urlencoded({ extended: false }));

//cookie
server.use(cookieParser());

//sessiones
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//PASSPORT
require ("./config/passport")(server);

//motor de plantilla
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({cache:false});



//STATIC FILES
server.use(express.static(__dirname + '/public'));

//Escuchando servidor
//region LISTEN
server.listen(port,function()
{
    console.log("servidor escuchando el puerto " + port);
});
//endregion

//enlazamos el server a los enrutadores mandandole como parametro el server
require('./routers/index')(server);