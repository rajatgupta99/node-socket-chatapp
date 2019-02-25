var socket = io();

function scrollToBottom(){
  //Selectors
  var messages = $('.allmessages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  console.log("CONNECTED TO SERVER");
  $('#user-status').html('').append("<span class='current-user-status'><i class='fas fa-circle online'></i> Online</span>");
});

socket.on('disconnect', function(){
  console.log("DISCONNECTED FROM SERVER");
  $('#user-status').html('').append("<span class='current-user-status'><i class='fas fa-circle offline'></i> Offline</span>");
});

socket.on('newMessage', function(data){
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var template = $('#messsage-template').html();
  var html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  });

  $('.allmessages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(data){
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var template = $('#location-messsage-template').html();
  var html = Mustache.render(template, {
    from: data.from,
    createdAt: formattedTime,
    text: 'My current location',
    url: data.url
  });

  $('.allmessages').append(html);
  scrollToBottom();
});

socket.on('fromAdmin', function(data){
  $('.welcomeMessage').append(data.text);
  console.log(data);
});

socket.on('newUserJoined', function(data){
  $('.allmessages').append(data.text);
  console.log(data);
});

socket.on('userDisconnected', function(data){
  console.log(data);
})

var uid = Math.random();

$('#message-form').on('submit', function(e){
  e.preventDefault();
  var text = $('[name=message]').val().trim();

  if(text !== ""){
    socket.emit('createMesssage', {
      from: uid,
      text: text
    }, function(data){
      $('[name=message]').val('');
      console.log(data);
    })
  }
});

var locationButton = $('#send-location');
locationButton.on('click', function(e){
  e.preventDefault();
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(`Latitude: ${position.coords.latitude}`);
    console.log(`Longitude: ${position.coords.longitude}`);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    locationButton.removeAttr('disabled').text('Share Location');
  }, function(){
      locationButton.removeAttr('disabled').text('Share Location');
      alert('Unable to fetch location');
  });
});
