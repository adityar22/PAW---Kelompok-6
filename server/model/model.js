const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    taskName:{
        type: String,
        required: true
    },
    taskDescription:{
        type: String,
        required: true
    },
    taskTime:{
        type: Date,
        required:true
    },
    taskPriority:{
        type: String,
        required: true
    },
    taskStat:{
        type: String,
        required: true
    }
})

const taskDB = mongoose.model('taskDB',schema);

module.exports = taskDB;