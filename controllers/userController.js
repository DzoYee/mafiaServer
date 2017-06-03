const db = require('../db/redis').client;

module.exports =  {
  createUser: (username) => {    
    return db.incr('users_count')
      .then(count => {
        return Promise.all([
            db.hset('users', username, count),
            db.hmset(`user:${count}`, 'name', username)
        ])  
      })
  }
};