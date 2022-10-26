const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const db = require('./db')
const config = require('./config')
const dotenv = require('dotenv');

const { context } = require('./libs/auth');
const app = require('./api');


dotenv.config();




var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
 
var spawn = require('child_process').spawn;
var proc;
 
app.use('/', express.static(path.join(__dirname, 'stream')));
 


 
var sockets = {};
 
/**
 * ON CONNECTION ESTABLISHED
 */
io.on('connection', function(socket) {
 
  sockets[socket.id] = socket;
  console.log("Total clients connected : ", Object.keys(sockets).length);
 
  socket.on('disconnect', function() {
    delete sockets[socket.id];
 
    // no more sockets, kill the stream
    if (Object.keys(sockets).length == 0) {
      app.set('watchingFile', false);
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  });
 
  socket.on('start-stream', function() {
    startStreaming(io);
  });
 
});
 
/**
 * STARTING THE SERVER
 */
http.listen(4000, function() {
  console.log('listening on *:4000');
});
 
function stopStreaming() {
  if (Object.keys(sockets).length == 0) {
    app.set('watchingFile', false);
    if (proc) proc.kill();
    fs.unwatchFile('./stream/image_stream.jpg');
  }
}
 
function startStreaming(io) {
 
  if (app.get('watchingFile')) {
    io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    return;
  }
 
  var args = ["-w", "640", "-h", "480", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "50"];
  proc = spawn('raspistill', args);
 
  console.log('Watching for changes...');
 
  app.set('watchingFile', true);
 
  fs.watchFile('./stream/image_stream.jpg', function(current, previous) {
    io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
  })
 
}


// /*##########################################################
//  * to install all the needed dependencies,in cmd run npm install
//  ###########################################################*/

// process.env.PWD = process.cwd()

// db.connect()

// /**
//  * SETTING UP APOLLO SERVER
//  */
// const server = new ApolloServer({
//   cors: true,
//   typeDefs,
//   resolvers,
//   context: context,

//   playground: process.env.SERVER_PLAYGROUND,
// });

 

// server.applyMiddleware({
//   app,
// })


// app.listen(config.port, () => console.log(`🚀  Server ready at ${config.port}`))


