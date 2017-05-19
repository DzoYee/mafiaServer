// server.js

const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('port', (process.env.PORT || 3001));

app.use(express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(client) {  
  console.log('Client connected...');

  client.on('join', function(data) {
      console.log(data);
  });
})

server.listen(app.get('port'), function() {
  console.log('listening on port: ', app.get('port'));
});
