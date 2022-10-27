const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios')
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }


});



/**
 * io connection
 */

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("liveStream", (data) => {

    console.log({ data })
    //send the same data out
    socket.emit('livestream', data)
    return
  }
  )
})

server.listen(process.env.SOCKET_PORT, () => {
  console.log('listening socket microservice on port ' + process.env.SOCKET_PORT);
});