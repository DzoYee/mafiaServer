const db = require('../db/redis').client;
const userController = require('./userController');
const io = require('../socket.io/index.js');

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
        return self.joinRoom(data.roomName, data.username)
      })
      .then(data => {
        console.log("hostGame: ", data);
        socket.emit('message', {message: data});
      })
  },
  joinRoom: (roomName, username) => {
    return Promise.all([db.hget('rooms', roomName), db.hget('users', username)])
      .then(data => {
        if (data[0] && data[1]) {
          console.log("data: ", data);
          return db.sadd(`room:${data[0]}`, data[1]);
        } else {
          console.log('room does not exist');
        }
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