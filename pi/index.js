
var { io } = require('socket.io-client');
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var spawn = require('child_process').spawn;
const { exec } = require('child_process');
var proc;

const productionUrl = 'http://ec2-18-188-141-169.us-east-2.compute.amazonaws.com/'

const devUrl = 'http://localhost:4001'

const serverUrl = productionUrl
const socket = io(serverUrl)

app.listen(3001, () => console.log(`server listening on port 3001`))




const imagePath = "./stream/image_stream.jpg"


exec('fswebcam -c ./webcam.conf', (err, stdout, stderr) => {
    if (err) {
        console.log({ err })
        return;
    }
});

// proc = spawn('fswebcam', args);

// proc.on("error", error => console.log({ error }))
// proc.on("data", data => console.log({ data }))


console.log('Watching for changes...');

app.set('watchingFile', true);


fs.watchFile(imagePath, { interval: 500 }, function (current, previous) {
    fs.readFile(imagePath, (err, data) => {
        if (err) return

        socket.emit('liveStream', data)
        console.log("image emitted")


    });

})



