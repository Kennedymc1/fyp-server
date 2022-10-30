
var { io } = require('socket.io-client');
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var spawn = require('child_process').spawn;
var proc;

const productionUrl = 'http://ec2-18-188-141-169.us-east-2.compute.amazonaws.com/'

const devUrl = 'http://localhost:4001'

const serverUrl = productionUrl
const socket = io(serverUrl)

app.listen(3001, () => console.log(`server listening on port 3001`))




const imagePath = "./stream/image_stream.jpg"


proc = spawn('fswebcam -r 640x480 --no--banner -l 1 -d dev/video0 -i 0 --jpeg 30 ' + imagePath);

console.log('Watching for changes...');

app.set('watchingFile', true);


fs.watchFile(imagePath, function (current, previous) {
    // socket.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    fs.readFile(imagePath, (err, data) => {
        if (err) return

        socket.emit('liveStream', data)
        console.log("image emitted")


    });

})



