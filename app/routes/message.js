module.exports = function(app){
  app.get(`/message`,function(request,response){

    // var connection = app.infra.connectionFactory();
    // var produtosDao = new app.infra.LivrosDAO(connection);
    //
    // produtosDao.lista(function(error,results){
    //   response.send(results);
    // });
    //
    // connection.end();
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
}
