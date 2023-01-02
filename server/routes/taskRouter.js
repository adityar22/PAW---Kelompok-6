const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const controller = require('../controller/taskController');

const route = express.Router()

route.use(requireAuth);

//API for CRUD Task
route.post('/',controller.create);
route.get('/',controller.getTask);
route.get('/:id',controller.findById);
route.get('/filter',controller.filtering);
route.put('/:id',controller.update);
route.delete('/:id',controller.delete);

module.exports = route