const db = require('../db/redis').client;
const userController = require('./userController');

const self = module.exports = {
  createRoom: (roomName) => {
    return db.incr('room_count')
    .then(count => {
      return db.hset('rooms', roomName, count);
    });
  },
  hostGame: (socket, data) => {
    self.createRoom(data.roomName)
      .then(() => { 
        return userController.createUser(data.username)
      })
      .then(() => {
        self.joinRoom(data.roomName, data.username)
      });
  },
  joinRoom: (roomName, username) => {
    Promise.all([db.hget('rooms', roomName), db.hget('users', username)])
      .then(data => {
        return db.sadd(`room:${data[0]}`, data[1]);
      })
      .catch(err => console.log("error: ", err));
  },
  joinGame: (socket, data) => {
    userController.createUser(data.username)
      .then(() => {
        self.joinRoom(data.roomName, data.username)
      })
  }
};