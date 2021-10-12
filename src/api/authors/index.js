const app = require('express').Router();
const controller = require('./controller');
const endpointValidator = require('../../libraries/middlewares/endpoint-validator');
const {
  createAuthor, readAuthorById, updateAuthorById, removeAuthorById,
} = require('./schema');

app.post('/', endpointValidator(createAuthor), controller.createAuthors);
app.get('/', controller.readAuthors);
app.get('/:id', endpointValidator(readAuthorById), controller.readAuthorById);
app.put('/:id', endpointValidator(updateAuthorById), controller.updateAuthor);
app.delete('/:id', endpointValidator(removeAuthorById), controller.removeAuthor);

module.exports = app;
