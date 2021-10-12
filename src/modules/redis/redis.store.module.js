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
  }

  close() {
    this.redisClient.quit();
  }

  storeData(key, value) {
    this.redisClient.set(key, value);
    logger.info(`REDIS: Stored ${value} with key ${key}.`);
  }

  readData(key) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (error, value) => {
        if (error) { reject(error); }
        const readedValue = value ? value.toString() : null;
        logger.info(`REDIS: Readed data ${readedValue} with key ${key}.`);
        resolve(readedValue);
      });
    });
  }

  removeData(key) {
    this.redisClient.del(key);
    logger.info(`REDIS: Removed data with key ${key}.`);
  }

  getKeys(pattern) {
    return new Promise((resolve, reject) => {
      this.redisClient.keys(pattern, (error, result) => {
        if (error) { reject(error); }
        resolve(result);
      });
    });
  }

  async getAllDataFromPattern(pattern) {
    const allKeys = await this.getKeys(pattern);
    const readPromises = [];

    for (let i = 0; i < allKeys.length; i += 1) {
      readPromises.push(this.readData(allKeys[i]));
    }

    return Promise.all(readPromises);
  }

  async removeAllDataWithKeyPattern(pattern) {
    const allKeys = await this.getKeys(pattern);
    const removeKeys = [];

    for (let i = 0; i < allKeys.length; i += 1) {
      removeKeys.push(this.removeData(allKeys[i]));
    }

    return Promise.all(removeKeys);
  }
};
