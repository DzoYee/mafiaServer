const db = require('../db/redis').client;
const userController = require('./userController');

const self = module.exports = {
  createRoom: (roomName) => {
    db.incr('room_count')
      .then(count => {
        db.hset('rooms', count, roomName)
      });
  },
  hostRoom: (socket, data) => {
    userController.createUser(data.username)
    .then(self.createRoom(data.roomNumber))
    .then(result => {
      console.log('created room number: ', data.roomNumber);
      socket.emit('host_room', {type:'message', data: 'roomNumber'});
    })
    // .then(console.log(socket.get('name')));

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