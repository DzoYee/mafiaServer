const db = require('../db/redis').client;

module.exports =  {
  createUser: (username) => {
    db.incr('users_count')
      .then(count => {
        console.log('createUser');
        return Promise.all([
          db.hset('users', username, count),
          db.hmset(`user:${count}`, 'name', username)
        ])
      })
  }
};