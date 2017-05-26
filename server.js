// server.js

const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('./socket.io');

const allowOrigins = "http://localhost:* http://127.0.0.1:*";
const path = '/stomp';

const roomController = require('./controllers/roomController.js');

app.set('port', (process.env.PORT || 3001));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/node_modules'));

const mainRoutes = require('./config/routes.js')(app);

server.listen(app.get('port'), function() {
  console.log('listening on port: ', app.get('port'));
});

io.startIo(server);