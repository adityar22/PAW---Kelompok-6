const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    eventUser:{
        type: String,
        required: true
    },
    eventName:{
        type: String,
        required: true
    },
    eventDesc:{
        type: String,
        required: true
    },
    eventStart:{
        type: Date,
        required:true
    },
    eventEnd:{
        type: Date,
        required:true
    }
})

const eventsDB = mongoose.model('eventsDB',schema);

module.exports = eventsDB;