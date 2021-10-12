const RedisModule = require('../../modules/redis/redis.messages.module');

const redisInstance = new RedisModule();

module.exports = {
  startInstance: (recipient, message) => {
    redisInstance.emitObject('emmit', recipient, message);
  },
};
