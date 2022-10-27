
var { io } = require('socket.io-client');
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var spawn = require('child_process').spawn;
var proc;

const productionUrl = 'https://project.dirtservers.com'

const devUrl = 'http://localhost:4001'

const serverUrl = productionUrl
const socket = io(serverUrl)

app.listen(3001, () => console.log(`server listening on port 3001`))





var args = ["-w", "640", "-h", "480", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "50", "-n"];
proc = spawn('raspistill', args);

console.log('Watching for changes...');

app.set('watchingFile', true);

const imagePath = './stream/image_stream.jpg'

fs.watchFile(imagePath, function (current, previous) {
    console.log("image changed")
    // socket.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    fs.readFile(imagePath, (err, data) => {
        if (err) return

        const base64 = _arrayBufferToBase64(data)
        console.log({ base64 })
        console.log("feed recieved")
        const processedData = "data:image/png;base64, " + base64


        socket.emit('liveStream', processedData)

    });

})

function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}



