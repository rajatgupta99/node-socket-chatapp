const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
var publicPath = path.join(__dirname, '..', '/public');
var PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connect', (socket) =>  {
  console.log("New User Connected!");

  socket.on('createMesssage', (data) =>  {
    console.log(data);
  });

  var newMessageData = {
    "from": "Server",
    "text": "You have a new message",
    "createdAt": new Date().getTime()
  };

  socket.emit('newMessage', newMessageData);

  socket.on('disconnect', ()  =>  {
    console.log('USER DISCONNECTED');
  });
});


server.listen(PORT, () =>  {
    console.log(`Listening on PORT: ${PORT}`);
});
