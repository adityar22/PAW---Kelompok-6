const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/taskController');

//API for CRUD Task
route.post('/',controller.create);
route.get('/',controller.find);
route.get('/:id',controller.find);
route.get('/filter',controller.filtering);
route.put('/:id',controller.update);
route.delete('/:id',controller.delete);

/**
 * @description Root Route
 * @method GET/
 */
route.get('/', services.homepage);

/**
 * @description view task
 * @method GET/dashboard
 */
 route.get('/dashboard', services.dashboard);

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

/**
 * @description edit task
 * @method GET/notebook
 */
 route.get('/notebook',services.notebook);


module.exports = route