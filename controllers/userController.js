const db = require('../db/redis').client;

module.exports =  {
  createUser: (username) => {
    return db.incr('users_count')
      .then(count => {
        db.hset('users', count, username)
      });
    //   , (err, count) => {
    //   db.hset('users', count, username)
    // });
  }
};