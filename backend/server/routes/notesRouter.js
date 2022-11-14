const express = require('express');
const requireAuth = require('../middleware/requireAuth')
const controller = require('../controller/notesController');

const route = express.Router();

route.use(requireAuth);

//API for CRUD Task
route.get('/',controller.getAllNotes);
route.get('/:id',controller.getNotesById);
route.get('/filter',controller.getFilteredNotes);
route.post('/',controller.createNotes);
route.put('/:id',controller.updateNotes);
route.delete('/:id',controller.deleteNotes);


module.exports = route