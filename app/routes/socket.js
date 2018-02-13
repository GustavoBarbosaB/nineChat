module.exports = function(io){
  var numUsers = 0;

  io.on('connection', function (socket) {
    console.log(`Usuário `+socket.username+` conectado!`);
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
      if (addedUser) return;

      // we store the username in the socket session for this client
      socket.username = username;
      ++numUsers;
      addedUser = true;
      socket.emit('login', {
        numUsers: numUsers
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
      if (addedUser) {
        --numUsers;

        console.log(`Usuário `+socket.username+` desconectado!`);

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });

  return io;
}

/*
///socket.io/socket.io.js
io.on(`connection`,function(socket){
  console.log(`Um usuario foi conectado!`);

  socket.on('disconnect', function(){
    console.log('Um usuario foi disconectado!');
  });

  socket.on(`message`, function(msg){
    io.sockets.emit(`message`,msg);
    console.log(msg);
  });

});
  return io;
}
*/
