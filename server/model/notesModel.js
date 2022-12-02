const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        required: true
    },
    tag: {
        type: Array
    }
}, { timestamps: true });

module.exports = mongoose.model('Notes', notesSchema);
