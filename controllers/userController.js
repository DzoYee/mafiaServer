const db = require('../db/redis').client;

module.exports =  {
  createUser: (username) => {      
    return new Promise((resolve, reject) => {
      db.incr('users_count')
        .then(count => {
          Promise.all([
              db.hset('users', username, count),
              db.hmset(`user:${count}`, 'name', username)
            ])  
            .then(data => {
              resolve();
            })
        })
    })
  }
};