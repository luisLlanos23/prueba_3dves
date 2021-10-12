const app = require('express').Router();
const controller = require('./controller');
const endpointValidator = require('../../libraries/middlewares/endpoint-validator');
const { createBooks } = require('./schema');

app.post('/', endpointValidator(createBooks), controller.createBooks);
app.get('/', controller.readBooks);

module.exports = app;
