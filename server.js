'use strict';

//CREANDO EL SERVIDOR
//region SERVIDOR
var express = require("express"), //requiriendo express
    server = express(), //creando el servidor
    swig = require("swig"), //motor de plantilla
    port = process.env.PORT || 8000;
// endregion

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