var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

var users = [];

var PORT = 8080;

eval(fs.readFileSync('./public/javascript/User.js').toString());

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res){
	res.sendFile('/home/delwiv/dev/git/tuto_node_chat/index.html');
  // console.log('1 request handled ;)');
});

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(readFileSync('/home/delwiv/dev/git/tuto_node_chat/index.html'));
// }).listen(3000, "0.0.0.0");


io.on('connection', function(socket){
    // console.log('a user connected');

    socket.on('addUser', function(user){
    	// socket.user = userName;
    	console.log(user.name + ' has joined.');
    	user.id = socket.id;
    	users.push(user);
    	console.log(users);
    	socket.emit('chat message', user.name, 'You have joined the chat, welcome and don\'t feed the troll (about how shitty Apple is).');
    	socket.broadcast.emit('chat message', user.name, 'Info : ' + user.name + ' has joined the chat.');
    	updateClients();
    });
    
    
    socket.on('state changed', function(user){
    	console.log('state changed: ' + user.name + ' : ' + user.status);
    	users[getIndex(users, user.name)].status = user.status;
    	updateClients();    	
    });
    
    socket.on('chat message', function(userName, msg){
    	console.log('message from ' + userName + ' : ' + msg);
    	users[getIndex(users, userName)].status = "inactive";
    	var date = new Date().toLocaleTimeString();
    	io.emit('chat message', userName, date, msg);
    	updateClients();
    });
    
    updateClients = function(){
    	io.emit('update', users);
    }

    socket.on('disconnect', function(){
		debugger;
		console.log('user ' + socket.id + ' left.');
		for( var i = 0; i < users.length; i++ ){
			if(users[i].id === socket.id){
				socket.broadcast.emit('chat message', users[i].name, 'Info : ' + users[i].name + ' has left the chat.');
				users.splice(i, 1);
			}
		}
		updateClients();
	});

});






server.listen(port = PORT, function(){
	console.log('listening on localhost:' + PORT);
});

// module.exports = app;