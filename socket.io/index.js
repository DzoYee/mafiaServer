let io = require('socket.io');
const roomController = require('../controllers/roomController');

const socketConection = socket => {
  console.log('socket connection by : ', socket.id);
  socket.emit('message', {message: 'SocketConnection!'});

  socket.on('action', function(action) {
    switch (action.type) {
      case "server/hello": {
        console.log('Got hello data!', action.data);
        socket.emit('action', {type:'message', data:'good day!'});
        break;
      }

      case "server/host_room": {
        console.log("host_room: ", action.data);
        roomController.hostGame(socket, action.data);
        break;
      }

      case "server/join_room": {
        console.log("join_room: ",action.data);
        roomController.joinGame(socket, action.data);
        break;
      }
    }
  });
  
};

const startIo = server => {
  io = io.listen(server);
  const packtchat = io.of('/packtchat');
  packtchat.on('connection', socketConection);
  return io;
};

exports.startIo = startIo;

