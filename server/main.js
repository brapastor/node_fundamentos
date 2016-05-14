'use strict';

var http = require('http'),
    port = process.env.PORT || 8000;


var server = http.createServer(function (req,res)
{
    res.writeHead(200, {'content_type' : 'text/plain'});
    res.end("hola mundo");
    console.log("haciendo una peticion");
});


// //cada vez que hago una recarga de pagina ejecuta esto
// server.on('request', function (req,res) {
//     console.log("estoy haciendo una peticion");
// })

server.listen(port, function ()
{
    console.log("Servidor escuchando al puerto " + port);
});