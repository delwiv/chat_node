var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');

var users = [];

eval(fs.readFileSync('./public/javascript/User.js').toString());

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res){
	res.sendFile('/home/delwiv/dev/git/tuto_node_chat/index.html');
  // console.log('1 request handled ;)');
});

io.on('connection', function(socket){
    // console.log('a user connected');

    socket.on('addUser', function(user){
    	// socket.user = userName;
    	console.log(user.name + ' has joined.');
    	users.push(user);
    	console.log(users);
    	io.emit('chat message', 'Info : ' + user.name + ' joined the chat.');
    	updateClients();
    });
    
    
    socket.on('state changed', function(user){
    	console.log('state changed: ' + user.name + ' : ' + user.status);
    	users[getIndex(users, user.name)].status = user.status;
    	debugger;
    	updateClients();    	
    });
    
    socket.on('chat message', function(userName, msg){
    	console.log('message from ' + userName + ' : ' + msg);
    	users[getIndex(users, userName)].status = "inactive";
    	io.emit('chat message', userName + ' : ' + msg);
    	updateClients();
    });
    
    updateClients = function(){
    	debugger;
    	io.emit('update', users);
    }

});

io.on('disconnect', function(){
	debugger;
	for( var i = 0; i < users.length; i++ ){
		if(users[i] == socket.user){
			console.log('a user diconnected');
			io.emit('chat message', 'Info : ' + users[i] + ' has left the chat.');
			delete users[users[i]];
		}
	}
	updateClients();
});



http.listen(3000, function(){
	console.log('listening on localhost:3000');
});

// module.exports = app;