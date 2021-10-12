const redis = require('redis');
const { EventEmitter } = require('events');
const config = require('../../../config/config');
const logger = require('../../libraries/tools/logger');

module.exports = class RedisModule extends EventEmitter {
  constructor() {
    super();
    this.connect();
  }

  connect() {
    this.redisClient = redis.createClient({
      host: config.redis.redisHost,
    });

    this.redisClient.on('connect', () => {
      logger.info('REDIS: Client connected.');
    });

    this.redisClient.on('error', (msg) => {
      if (msg.code) {
        logger.error('REDIS: client disconnected.');
      } else {
        logger.error(`REDIS: ${msg}.`);
      }
    });

    this.redisClient.on('message', (channel, message) => {
      this.emit('message', { channel, message });
      logger.info(`REDIS: message sended to channel ${channel}`);
    });
  }

  close() {
    this.redisClient.quit();
  }

  emitData(channel, message) {
    this.redisClient.publish(channel, message);
    logger.info(`REDIS: published message ${message} in channel ${channel}.`);
  }

  subscribe(channel) {
    this.redisClient.subscribe(channel);
    logger.info(`REDIS: subscribed to channel ${channel}.`);
  }
};
