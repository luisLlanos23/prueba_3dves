const webServer = require('./app');
const logger = require('./src/libraries/tools/logger');

require('./src/models/sql');
require('./src/providers/redis/redis.service')(webServer);

// try {
//   require('./src/services/publish_server/publish_server.service').publish();
//   require('./src/pm/storages_assembly/storage_assembly.pm')();
// } catch (error) { logger.log(error); }
