var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var app = express();
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

var server = http.createServer(app).listen(6888);
var io = socketio.listen(server, {log:false, origins:'*:*'});
console.log('socket ready');

io.sockets.on("connection", function(socket) {
	console.log('connected');
	socket.on('message', function(data) {
		var jsonData = JSON.parse(data);
		console.log("message: " + jsonData.EventName);
		console.log('data: ' + jsonData.EventData);
		socket.broadcast.emit(jsonData.EventName , jsonData.EventData);
	});
});



