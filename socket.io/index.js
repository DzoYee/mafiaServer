let io = require('socket.io');
const roomController = require('../controllers/roomController');

const socketConection = socket => {
  console.log('socket connection by : ', socket.id);
  socket.emit('message', {message: 'SocketConnection!'});
  socket.on('GetMe', () => {});
  socket.on('StartGame', () => {});
  socket.on('JoinRoom', roomController.hostRoom);
  socket.on('HostRoom', (r) => {});
  socket.on('disconnect', () => {});

  socket.on('action', function(action) {
    switch (action.type) {
      case "server/hello": {
        console.log('Got hello data!', action.data);
        socket.emit('action', {type:'message', data:'good day!'});
      }

      case "server/host_room": {
        console.log(action.data);
        roomController.hostRoom(socket, action.data);
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

