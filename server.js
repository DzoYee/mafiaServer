// server.js

const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Redis = require('ioredis');
const client = new Redis(6379);

exports.client = client;

client.on('ready', function() {
  console.log("Redis is ready");
});

client.on('error', function() {
  console.log("Error is Redis");
});


app.set('port', (process.env.PORT || 3001));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/node_modules'));

const mainRoutes = require('./config/routes.js')(app);

io.on('connection', function(socket) {
  console.log('Socket Server Opened By: ' + socket.id);

  socket.on('action', function(action) {
    if(action.type === 'server/hello') {
      console.log('Got hello data!', action.data);
      socket.emit('action', {type:'message', data:'good day!'});
    }
  });
});

server.listen(app.get('port'), function() {
  console.log('listening on port: ', app.get('port'));
});
