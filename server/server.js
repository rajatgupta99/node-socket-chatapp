const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const message = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var publicPath = path.join(__dirname, '..', '/public');
var PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connect', (socket) =>  {
  console.log("New User Connected!");

  socket.on('join', (params, callback)  =>  {
        if(!isRealString(params.name) || !isRealString(params.room)){
          return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.broadcast.to(params.room).emit('newUserJoined', message.generateMessage("Admin", `<li class='newuserjoined'><i class='fal fa-user'></i> ${params.name} joined this room</li>`));
  });

  socket.on('createMesssage', (data, callback) =>  {
    console.log(data);
    var author = users.getUser(socket.id);
    io.emit('newMessage', message.generateMessage(author.name, data.text));
    callback("Message Delivered :)");
  });

  socket.on('createLocationMessage', (data) =>  {
    io.emit('newLocationMessage', message.generateLocationMessage('Admin', data.latitude, data.longitude));
  })

  socket.on('disconnect', ()  =>  {
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));

      io.to(user.room).emit('newUserJoined', message.generateMessage("Admin", `<li class='newuserjoined'><i class='fal fa-user'></i> ${user.name} left this room</li>`));
    }
  });
});


server.listen(PORT, () =>  {
    console.log(`Listening on PORT: ${PORT}`);
});
