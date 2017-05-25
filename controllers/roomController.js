const db = require('../db/redis').client;
const socket = require('../server').socket;

module.exports = {
  hostRoom: (roomNumber) => {
    db.set('rooms', roomNumber).then(result => {
      console.log(socket);
      // socket.emit('action', {type:'message', data: 'roomNumber'});
    });
  },
  joinRoom: (roomNumber) => {

  },
  assignPlayers: () => {

  },
  leaveRoom: () => {

  },
  getAllPlayers: () => {
    
  }
};