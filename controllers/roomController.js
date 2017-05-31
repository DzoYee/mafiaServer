const db = require('../db/redis').client;
const userController = require('./userController');

const self = module.exports = {
  createRoom: (roomName) => {
    db.incr('room_count')
      .then(count => {
        return db.hset('rooms', roomName, count)
          .then(() => console.log('createRoom'));
      })
  },
  hostRoom: (socket, data) => {
    let createRoomPromise = new Promise((resolve, reject) => {
      resolve(self.createRoom(data.roomName));
    });

    let createUserPromise = new Promise((resolve, reject) => {
      resolve(userController.createUser(data.username));
    });

    createRoomPromise
      .then(() => {
        return db.hget('rooms', data.roomName)
      })
      .then(data => {
        console.log(data);
      });
    

    // Promise.all([createRoomPromise, createUserPromise])  
      // .then(() => {
      //   return db.hget('rooms', data.roomName)
      // })
      // .then(data => {
      //   console.log(data);
      // });
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