var socket = io();

socket.on('connect', function(){
  console.log("CONNECTED TO SERVER");
});

socket.on('disconnect', function(){
  console.log("DISCONNECTED FROM SERVER");
});

socket.on('newMessage', function(data){
  var li = $("<li></li>");
  li.text(`${data.from}: ${data.text}`);
  $('.allmessages').append(li);
  console.log(data);
});

socket.on('fromAdmin', function(data){
  $('.welcomeMessage').append(data.text);
  console.log(data);
});

socket.on('newUserJoined', function(data){
  console.log(data);
});

socket.on('userDisconnected', function(data){
  console.log(data);
})

var uid = Math.random();

$('#message-form').on('submit', function(e){
  e.preventDefault();
  var text = $('[name=message]').val().trim();
  $('[name=message]').val('');

  if(text !== ""){
    socket.emit('createMesssage', {
      from: uid,
      text: text
    }, function(data){
      console.log(data);
    })
  }
});
