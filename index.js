const webServer = require('./app');
const logger = require('./src/libraries/tools/logger');

require('./src/models/sql');
require('./src/providers/redis/redis.service')(webServer);
