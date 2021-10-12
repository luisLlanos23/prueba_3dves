/* eslint-disable no-console */
const { exec } = require('child_process');
const sequelize = require('./sequelize');
const logger = require('../src/libraries/tools/logger');

sequelize.init();

let sqlInitScripts = {};

try {
  sqlInitScripts = require('../sql-scripts.json');
} catch (error) {
  throw new Error(error);
}

(Object.keys(sqlInitScripts)).forEach(async (dbName) => {
  await new Promise((resolve) => {
    exec(sqlInitScripts[dbName].createDb, (error, stdout, stderr) => {
      if (error || stderr) { throw (error || stderr); }
      logger.info(`> Sequalize Log: ${stdout}`);
      resolve();
    });
  });

  await new Promise((resolve) => {
    exec(sqlInitScripts[dbName].migrateTables, (error, stdout, stderr) => {
      if (error || stderr) { throw (error || stderr); }
      logger.info(`> Sequalize Log: ${stdout}`);
      resolve();
    });
  });

  await new Promise((resolve) => {
    exec(sqlInitScripts[dbName].addSeeds, (error, stdout, stderr) => {
      if (error || stderr) { throw (error || stderr); }
      logger.info(`> Sequalize Log: ${stdout}`);
      resolve();
    });
  });
});
