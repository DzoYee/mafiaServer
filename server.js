// server.js

const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const redis = require('redis');
const redisClient = redis.createClient({host: 'localhost', port: 6379});

redisClient.on('ready', function() {
  console.log("Redis is ready");
});

redisClient.on('error', function() {
  console.log("Error is Redis");
});


app.set('port', (process.env.PORT || 3001));

app.use(express.static(__dirname + '/node_modules'));

const mainRoutes = require('./config/routes.js')(app);

io.on('connection', function(client) {  
  console.log('Client connected...');

  client.on('join', function(data) {
      console.log(data);
  });
})

server.listen(app.get('port'), function() {
  console.log('listening on port: ', app.get('port'));
});
