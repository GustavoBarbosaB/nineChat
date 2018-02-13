module.exports = function(app){
  app.get(`/message`,function(request,response){
    var test = [
      {
        message:"Cara isso é um teste!",
        sender:"gustavo.barbosa",
        receiver:"arthur.saad"
      },
      {
        message:"Que massa em cara!",
        sender:"arthur.saad",
        receiver:"gustavo.barbosa"
      },
      {
        message:"Nossa, nem fala brother!",
        sender:"gustavo.barbosa",
        receiver:"arthur.saad"
      }
    ]

    response.send(test);
  });

  app.post(`/message`,function(request,response){
     var post = request.body;
     io.emit(`newMessage`,post);
     response.send(post);
  });

  app.get(`/`,function(request,response){
    response.send(`Hello World!`);
  });
}
