const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const compression = require('compression');
const minify = require('express-minify');
const config = require('./config/config');
const logger = require('./src/libraries/tools/logger');

const app = express();

const api = require('./src/api/routes');

const webPort = config.webServicePort;
const nodeEnv = process.env.NODE_ENV;

app.set('port', webPort || 3000);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (nodeEnv === 'production') {
  app.use(compression());
  app.use(minify());
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  return next();
});

app.use('/api', api);

const server = http.createServer(app);

server.listen(webPort, '0.0.0.0', () => {
  logger.info(`Express Server Running on Port ${webPort}`);
});

module.exports = server;
