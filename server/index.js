var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("client"));

app.get("/hola-mundo", function(req,res){
    res.status(200).send("Hola mundo")
})

var messages = [{
    id: 1,
    text: "Binvenido al chat privado hecho por Eloy Ribes Leon",
    nickname: "Bot - Bot"

}];

io.on("connection", function(socket){
    console.log("El cliente con IP: " +socket.handshake.address+ "se ha conectado");

    socket.emit("messages", messages);

    socket.on("add-message", function(data){
        messages.push(data);

        io.sockets.emit("messages", messages);
    });


});

server.listen(3000, function(){
    console.log("Servidor está funcionando en http://192.168.1.26:3000");
});