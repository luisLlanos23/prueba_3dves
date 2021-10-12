const app = require('express').Router();
const controller = require('./controller');
const endpointValidator = require('../../libraries/middlewares/endpoint-validator');
const { createCategory, updateCategoryById, removeCategory } = require('./schema');

app.post('/', endpointValidator(createCategory), controller.createCategory);
app.get('/', controller.readCategory);
app.put('/:id', endpointValidator(updateCategoryById), controller.updateCategory);
app.delete('/:id', endpointValidator(removeCategory), controller.removeCategory);

module.exports = app;
