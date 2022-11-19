const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const controller = require('../controller/eventsController');

const route = express.Router();

route.use(requireAuth);

route.post('/', controller.create);
route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.put('/:id', controller.edit);
route.delete('/:id', controller.delete);

module.exports = route