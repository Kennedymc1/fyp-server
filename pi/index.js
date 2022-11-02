
var { io } = require('socket.io-client');
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var spawn = require('child_process').spawn;
const { exec } = require('child_process');
var gpio = require('rpi-gpio');

let cameraRunning = false

var proc;

const productionUrl = 'http://ec2-18-188-141-169.us-east-2.compute.amazonaws.com/'

// const devUrl = 'http://localhost:4001'

const serverUrl = productionUrl
const socket = io(serverUrl)

app.listen(3001, () => console.log(`server listening on port 3001`))


exec('fswebcam -c ./webcam.conf');


const imagePath = "./stream/image_stream.jpg"

// exec('fswebcam -c ./webcam.conf');

console.log('Watching for changes...');

app.set('watchingFile', true);


fs.watchFile(imagePath, { interval: 500 }, function (current, previous) {
    fs.readFile(imagePath, (err, data) => {
        if (err) return
        if (cameraRunning) {
            socket.emit('liveStream', data)
            console.log("image emitted")
        }
    });

})



socket.on("trigger", (data) => {
    console.log({ data })
    cameraRunning = false
})



gpio.setup(12, gpio.DIR_IN, gpio.EDGE_BOTH)



gpio.on('change', function (channel, value) {
    // console.log('Channel ' + channel + ' value is now ' + value);
    if (channel === 12 && value) {
        if (!cameraRunning) {
            console.log("camera set to true")
            cameraRunning = true
        }
    }
});

