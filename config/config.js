const crypto = require('crypto');

const environmentVariables = {
  production: {
    webServicePort : 8081,
    authentication : {
      username   : '3dves',
      password   : '3dves',
      rememberme : true,
    },
    session: {
      secret    : crypto.randomBytes(48).toString('base64'),
      jwtSecret : 'StRoNGs3crE7',
    },
    redis: {
      redisHost: 'localhost',
    },
    SqlDatabase: {
      host     : 'localhost',
      port     : 3306,
      username : 'root',
      password : 'meinsm',
    },
  },
  development: {
    webServicePort : 8081,
    authentication : {
      username   : '3dves',
      password   : '3dves',
      rememberme : true,
    },
    session: {
      secret    : 'keyboard cat',
      jwtSecret : 'StRoNGs3crE7',
    },
    redis: {
      redisHost: 'localhost',
    },
    SqlDatabase: {
      host     : 'localhost',
      port     : 3306,
      username : 'root',
      password : 'meinsm',
    },
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports = environmentVariables.production;
} else {
  module.exports = environmentVariables.development;
}
