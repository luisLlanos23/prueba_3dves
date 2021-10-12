const config = require('../config');

module.exports = {
  readall: {
    database : 'readall',
    username : config.SqlDatabase.username,
    password : config.SqlDatabase.password,
    host     : config.SqlDatabase.host,
    port     : config.SqlDatabase.port,
    dialect  : 'mysql',
  },
};
