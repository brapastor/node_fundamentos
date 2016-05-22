'use strict';

//CREANDO EL SERVIDOR
//region SERVIDOR
var express = require("express"), //requiriendo express
    server = express(), //creando el servidor
    swig = require("swig"), //motor de plantilla
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    RedisStore = require('connect-redis')(session),
    port = process.env.PORT || 8000;
// endregion

//BodyParser
server.use(bodyParser.urlencoded({ extended: false })); //post

//connect flash
server.use(flash());

//cookie
server.use(cookieParser());

//sessiones
server.use(session({
    store: new RedisStore({
        host:'127.0.0.1',
        port:6379,
        db: 1
    }),
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


//creando un local un moddlewar //que esta variable este en todos los templates
server.use(function (req, res,next)
{
    server.locals.user = req.user;
    next();
});

if(process.env.NODE_ENV === 'dev'){
    console.log("estoy en desarrollo");
    require('./config/server/local')(server);
}

if(process.env.NODE_ENV === 'prod'){
    console.log("estoy en produccion");
    require('./config/server/prod')(server);

}
//enlazamos el server a los enrutadores mandandole como parametro el server
require('./routers/index')(server);
