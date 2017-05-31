const db = require('../db/redis').client;
const userController = require('./userController');

const self = module.exports = {
  createRoom: (roomName) => {
    // return new Promise((resolve, reject) => {
    return db.incr('room_count')
    // })
    .then(count => {
      return db.hset('rooms', roomName, count);
    });
    
  },
  hostRoom: (socket, data) => {
    self.createRoom(data.roomName)
      .then(userController.createUser(data.username))
      .then(self.joinRoom(data.roomName, data.username));

  },
  joinRoom: (roomName, username) => {
    Promise.all([db.hget('rooms', roomName),db.hget('users', username)])
      .then(data => {
        console.log(data);
      });
  },
  joinRoomPromise: (roomName) => {
    return new Promise((resolve, reject) => {
      db.hget('rooms', roomName)
        .then(data => {trace(data)});  
    })
  },
  joinRoomCallback: (roomName) => {
    db.hget('rooms', roomName, (err, data) => {
      console.log(data);
      console.log(err);
    })
  },
  getAllPlayers: () => {
    
  }
};