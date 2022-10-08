const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true,
        unique: true
    },
    userPassword:{
        type: String,
        required:true
    }
})

const userDB = mongoose.model('userDB',schema);

module.exports = userDB;