const Redis = require('ioredis');
const client = new Redis(6379);

client.on('ready', function() {
  console.log("Redis is ready");
});

client.on('error', function() {
  console.log("Error is Redis");
});

exports.client = client;
