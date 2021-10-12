/* eslint-disable func-names */
const { createLogger, format, transports } = require('winston');

module.exports = (function () {
  const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.printf((message) => `[${message.timestamp}] ${String(message.level).toUpperCase()} | ${message.message}`),
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: `${__dirname}/../../../log-api.log`,
      }),
    ],
  });

  function info(msg) {
    logger.info(msg);
  }

  function error(msg) {
    logger.error(msg);
  }

  function debug(msg) {
    logger.debug(msg);
  }

  function warn(msg) {
    logger.warn(msg);
  }

  return {
    info,
    error,
    debug,
    warn,
  };
}());
