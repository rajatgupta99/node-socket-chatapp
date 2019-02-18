const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const message = require('./utils/message');

var app = express();
var publicPath = path.join(__dirname, '..', '/public');
var PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connect', (socket) =>  {
  console.log("New User Connected!");

  socket.emit('fromAdmin', message.generateMessage("Admin", "Welcome to the node chat app!"));

  socket.broadcast.emit('newUserJoined', message.generateMessage("Admin", "New User Joined"));

  socket.on('createMesssage', (data) =>  {
    console.log(data);
    io.emit('newMessage', message.generateMessage(data.from, data.text));

    // socket.broadcast.emit('newMessage', {
    //     from: data.from,
    //     text: data.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', ()  =>  {
    console.log('USER DISCONNECTED');

    socket.broadcast.emit('userDisconnected', message.generateMessage("Admin", "A user disconnectd from the app."));
  });
});


server.listen(PORT, () =>  {
    console.log(`Listening on PORT: ${PORT}`);
});
