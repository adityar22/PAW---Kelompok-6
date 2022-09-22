const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
/**
 * @description Root Route
 * @method GET/
 */
route.get('/', services.homeRoutes);

/**
 * @description add task
 * @method GET/add_task
 */
route.get('/add_task', services.add_task);

/**
 * @description edit task
 * @method GET/edit_task
 */
route.get('/edit_task',services.edit_task);

//API
route.post('/api/tasks',controller.create);
route.get('/api/tasks',controller.find);
route.put('/api/tasks/:taskID',controller.update);
route.delete('/api/tasks/:taskID',controller.delete);

module.exports = route