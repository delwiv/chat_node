var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res){
  res.sendFile('/home/delwiv/dev/git/tuto_node_chat/index.html');
  // console.log('1 request handled ;)');
});

io.on('connection', function(socket){
    var connectedUsers = [];
    console.log('a user connected');
    socket.on('disconnect', function(username){
        
    });
    socket.on('userLeft', function(username){
    	console.log('user ' + username + ' disconnected');
    	io.emit('user left', userName);
    });
    socket.on('state changed', function(msg){
        console.log('state changed: ' + msg);
    });
    socket.on('chat message', function(msg){
        console.log('message : ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('user identified', function(userName){
        connectedUsers[connectedUsers.length] = userName;
        io.emit('new user', userName);
    });

});


http.listen(3000, function(){
  console.log('listening on localhost:3000');
});

// module.exports = app;