// const socketIO = require('socket.io');

// module.exports = (server) => {
//   const io = socketIO(server);
//   io.on('connection', function(socket) {
//     console.log('Socket Server Opened By: ' + socket.id);

//     socket.on('action', function(action) {
//       switch (action.type) {
//         case "server/hello": {
//           console.log('Got hello data!', action.data);
//           socket.emit('action', {type:'message', data:'good day!'});
//         }

//         case "server/host_room": {
//           // roomController.hostRoom(action.data.roomNumber);
//         }
//       }
//     });
//   });
// }

