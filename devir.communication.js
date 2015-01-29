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
		if (typeof data != "object")
			data = JSON.parse(data);
		console.log("message: " + data.EventName);
		
		socket.broadcast.to(data.EventName).emit(data.EventName , data.EventData);
	});

	socket.on('subscribe', function(data) {
		
		if (typeof data != "object")
			data = JSON.parse(data);
		console.log('subscribe' + data.EventName);
		socket.join(data.EventName);
	});

});