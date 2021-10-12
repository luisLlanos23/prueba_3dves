const app = require('express').Router();
const controller = require('./controller');
const endpointValidator = require('../../libraries/middlewares/endpoint-validator');
const {
  insertSchema, readUsers, updateUsers, deleteUser,
} = require('./schema');

app.post('/', endpointValidator(insertSchema), controller.insert);
app.get('/', endpointValidator(readUsers), controller.read);
app.get('/email/:email', endpointValidator(readUsers), controller.read);
app.get('/user_id/:userId', endpointValidator(readUsers), controller.read);
app.get('/username/:username', endpointValidator(readUsers), controller.read);
app.get('/level/:level', endpointValidator(readUsers), controller.read);
app.put('/:userId', endpointValidator(updateUsers), controller.update);
app.delete('/:userId', endpointValidator(deleteUser), controller.remove);

module.exports = app;
