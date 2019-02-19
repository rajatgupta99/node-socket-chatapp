var socket = io();

socket.on('connect', function(){
  console.log("CONNECTED TO SERVER");
  $('#user-status').html('').append("<span class='current-user-status'><i class='fas fa-circle online'></i> Online</span>");
});

socket.on('disconnect', function(){
  console.log("DISCONNECTED FROM SERVER");
  $('#user-status').html('').append("<span class='current-user-status'><i class='fas fa-circle offline'></i> Offline</span>");
});

socket.on('newMessage', function(data){
  var li = $("<li></li>");
  li.text(`${data.from}: ${data.text}`);
  $('.allmessages').append(li);
  console.log(data);
});

socket.on('newLocationMessage', function(data){
  var li = $(`<li class="locationBox"></li>`);
  var a = $(`<a href='' target='_blank'><i class="far fa-map-marked-alt locationIcon"></i></a>`);

  li.text(`${data.from} shared the location  `);
  a.attr('href', data.url);
  li.append(a);

  $('.allmessages').append(li);
  console.log(data);
})

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
