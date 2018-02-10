var app = require(`./config/express`)();
var http = require(`http`).Server(app);
var io = require(`socket.io`)(http);

app.set(`io`,io);

///socket.io/socket.io.js
io.on(`connection`,function(socket){
  console.log(`Um usuario foi conectado!`);

  socket.on('disconnect', function(){
    console.log('Um usuario foi disconectado!');
  });

  socket.on(`chat-message`, function(msg){
    io.sockets.emit(`message`,msg);
    console.log(msg);
  });

});

http.listen(process.env.PORT || 3000,function(){
  console.log(`Servidor funcionando!`);
});
