var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendfile('index.html');
  console.log('1 request handled ;)');
});

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});
