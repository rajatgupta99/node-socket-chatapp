var socket = io();

socket.on('connect', function(){
  console.log("CONNECTED TO SERVER");
});

socket.on('disconnect', function(){
  console.log("DISCONNECTED FROM SERVER");
});

socket.on('newEmail', function (data) {
  console.log(data);
});

socket.on('newMessage', function(data){
  console.log(data);
});
