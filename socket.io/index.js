let io = require('socket.io');
const roomController = require('../controllers/roomController');

const socketConection = socket => {
  socket.on('GetMe', () => {});
  socket.on('StartGame', () => {});
  socket.on('JoinRoom', () => {});
  socket.on('AddRoom', (r) => {});
  socket.on('disconnect', () => {});
};

const startIo = server => {
  io = io.listen(server);
  const packtchat = io.of('/packtchat');
  packtchat.on('connection', socketConection);

  // packtchat.on('connection', function(socket) {


  //   socket.on('action', function(action) {
  //     switch (action.type) {
  //       case "server/hello": {
  //         console.log('Got hello data!', action.data);
  //         socket.emit('action', {type:'message', data:'good day!'});
  //       }

  //       case "server/host_room": {
  //         roomController.hostRoom(action.data.roomNumber);
  //       }
  //     }
  //   });
  // });
  return io;
};

exports.startIo = startIo;

