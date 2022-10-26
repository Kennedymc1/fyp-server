'use strict'

// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
var io = require('socket.io-client');
var socket = io.connect('https://project.dirtservers.com', {reconnect: true});
var fs = require('fs');
// var path = require('path');

var spawn = require('child_process').spawn;
var proc;

// app.use('/', express.static(path.join(__dirname, 'stream')));


// var sockets = {};

// io.on('connection', function (socket) {

    // sockets[socket.id] = socket;
    // console.log("Total clients connected : ", Object.keys(sockets).length);

    socket.on('disconnect', function () {
        // delete sockets[socket.id];

        // no more sockets, kill the stream
        // if (Object.keys(sockets).length == 0) {
            // app.set('watchingFile', false);
            if (proc) proc.kill();
            fs.unwatchFile('./stream/image_stream.jpg');
        // }
    });


    /////
    startStreaming(io);


// });


// function stopStreaming() {
//   if (Object.keys(sockets).length == 0) {
//     app.set('watchingFile', false);
//     if (proc) proc.kill();
//     fs.unwatchFile('./stream/image_stream.jpg');
//   }
// }

function startStreaming(io) {

    // if (app.get('watchingFile')) {
        socket.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
        // return;
    // }

    var args = ["-w", "640", "-h", "480", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "50"];
    proc = spawn('raspistill', args);

    console.log('Watching for changes...');

    // app.set('watchingFile', true);

    fs.watchFile('./stream/image_stream.jpg', function (current, previous) {
        socket.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    })

}

