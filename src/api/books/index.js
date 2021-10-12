const app = require('express').Router();
const controller = require('./controller');
const endpointValidator = require('../../libraries/middlewares/endpoint-validator');
const { createBooks, readBooksByAuthor, readBooksByCategory } = require('./schema');

app.post('/', endpointValidator(createBooks), controller.createBooks);
app.get('/', controller.readBooks);
app.get('/author/:author?', endpointValidator(readBooksByAuthor), controller.readBook);
app.get('/category/:category?', endpointValidator(readBooksByCategory), controller.readBook);

module.exports = app;
