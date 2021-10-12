const io = require('socket.io');
const RedisMessagesModule = require('../../modules/redis/redis.messages.module');

module.exports = async (server) => {
  const redisClient = new RedisMessagesModule();

  const socket = io(server);
  redisClient.subscribe('emmit');

  redisClient.on('message', (data) => {
    const { channel, message } = data;
    const { dest, msg } = JSON.parse(message);

    if (channel === 'emmit') {
      socket.emit(dest, msg);
    }
  });
};
