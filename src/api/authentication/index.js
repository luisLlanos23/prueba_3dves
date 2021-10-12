const app = require('express').Router();
const controller = require('./controller');
const valid = require('../../libraries/tools/joi');

app.post('/login', valid, controller.authenticateUser);

module.exports = app;
