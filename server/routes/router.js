const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const usercontroller = require('../controller/user-controller');
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

//API for CRUD Task
route.post('/api/tasks',controller.create);
route.get('/api/tasks',controller.find);
route.get('/api/tasks/search/:key',controller.search);
route.put('/api/tasks/:id',controller.update);
route.delete('/api/tasks/:id',controller.delete);

//API for CRUD User
route.post('/api/tasks/auth/register',usercontroller.createUser);
route.post('/api/tasks/auth/register',usercontroller.authUser);
route.put('/api/tasks/auth/register',usercontroller.editUser);

module.exports = route