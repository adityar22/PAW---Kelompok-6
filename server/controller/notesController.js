const notesModel = require('../model/notesModel');
const mongoose = require('mongoose');

const getAllNotes = async (req, res, next) => {
    try {
        const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya
        const notes = await notesModel.find({ user_id }).sort({ isPinned: -1, createdAt: -1 }).exec();

        if (!notes) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Notes is empty',
              };
        }

        res.status(200).json({
            success: true, 
            message: 'Your all notes is found!',
            data: notes
        });
    }
    catch (err) {
        next(err);
    }
};

const getNotesById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Your note id is not valid',
              };
        }

        const user_id = req.user._id;
        const notes = await notesModel.find({ user_id }).findOne({ _id: id }).exec();

        if (!notes) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Note is not found',
              };
        }

        res.status(200).json({
            success: true, 
            message: 'Note is found!',
            data: notes
        });
    }
    catch (err) {
        next(err);
    }
}

const getFilteredNotes = async (req, res, next) => {
    const user_id = req.user._id;

    try {
        const filters = req.query;
        const notes = await notesModel.find({ user_id }).sort({ createdAt: -1 }).exec();

        if (!notes) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Note is not found',
              };
        }

        const filteredNotes = notes.filter(data => {
            let isValid = true;
            for (key in filters) {
                console.log(key, data[key], filters[key]);
                isValid = isValid && data[key] == filters[key];
            }
            return isValid;
        })

        res.status(200).json({
            success: true, 
            message: 'Note is found!',
            data: filteredNotes
        });
    }
    catch (err) {
        next(err);
    }
}

const createNotes = async (req, res, next) => {
    
    try {
        const { title, content, isPinned, tag } = req.body;
        const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya
        const newNotes = await notesModel.create({ title, content, user_id, isPinned, tag });

        res.status(200).json({
            success: true, 
            message: 'New note is added succesfully!',
            data: newNotes
        });
    }
    catch (err) {
        next(err);
    };
}

const updateNotes = async (req, res, next) => {
    if (!req.body) {
        throw {
            success: false,
            statusCode: 404,
            message: 'Your data to update is empty',
          };
    }

    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Your note id is not valid',
              };
        }

        const notes = await notesModel.findOneAndUpdate({ _id: id }, { ...req.body }, { returnDocument: 'after' }).exec();

        if (!notes) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Note that you want to update is not found',
              };
        }

        res.status(200).json({
            success: true, 
            message: 'Note is updated succesfully!',
            data: notes
        });
    }
    catch (err) {
        next(err);
    }
};

const deleteNotes = async (req, res, next) => {
    
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Your note id is not valid',
              };
        }

        const notes = await notesModel.findOneAndDelete({ _id: id }).exec();

        if (!notes) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Note that you want to delete is not found',
              };
        }

        res.status(200).json({
            success: true, 
            message: 'Note is deleted succesfully!',
            data: notes
        });
    }
    catch (err) {
        next(err);
    }


};

module.exports = {
    createNotes,
    updateNotes,
    deleteNotes,
    getAllNotes,
    getNotesById,
    getFilteredNotes
};