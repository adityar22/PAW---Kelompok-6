const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    taskID:{
        type: Number,
        required: true,
        unique: true
    },
    taskName:{
        type: String,
        required: true
    },
    taskDescription:{
        type: String,
        required: true
    },
    taskTime:{
        // type: Date,
        type: String,
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