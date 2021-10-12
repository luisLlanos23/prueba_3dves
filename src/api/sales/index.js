const app = require('express').Router();
const controller = require('./controller');
const endpointValidator = require('../../libraries/middlewares/endpoint-validator');
const { payment, allSales } = require('./schema');

app.post('/', endpointValidator(payment), controller.payment);
app.get('/', endpointValidator(allSales), controller.readSales);

module.exports = app;
