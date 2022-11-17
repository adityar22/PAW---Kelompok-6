const notesModel = require('../model/notesModel');
const mongoose = require('mongoose');

const getAllNotes = async (req, res) => {
    const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya

    try {
        const notes = await notesModel.find({ user_id }).sort({ createdAt: -1 }).exec();

        if (!notes) {
            return res.status(404).json({ error: 'No such notes' });
        }

        res.status(200).json(notes);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getNotesById = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const user_id = req.user._id;

    console.log(id);

    try {
        const notes = await notesModel.find({ user_id }).findOne({ _id: id }).exec();

        if (!notes) {
            return res.status(404).json({ error: 'No such notes' });
        }

        res.status(200).json(notes);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getFilteredNotes = async (req, res) => {
    const user_id = req.user._id;

    try {
        const filters = req.query;
        const notes = await notesModel.find({ user_id }).sort({ createdAt: -1 }).exec();

        if (!notes) {
            return res.status(404).json({ error: 'No such notes' });
        }

        const filteredNotes = notes.filter(data => {
            let isValid = true;
            for (key in filters) {
                console.log(key, data[key], filters[key]);
                isValid = isValid && data[key] == filters[key];
            }
            return isValid;
        })

        res.status(200).json(filteredNotes);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const createNotes = async (req, res) => {
    const { title, content, isPinned, tag } = req.body;
    const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya

    try {
        const newNotes = await notesModel.create({ title, content, user_id, isPinned, tag });
        res.status(200).json({
            message: "Notes created succesfully",
            data: newNotes
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    };
}

const updateNotes = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such notes' })
        }

        const notes = await notesModel.findOneAndUpdate({ _id: id }, { ...req.body }, { returnDocument: 'after' }).exec();

        if (!notes) {
            return res.status(404).json({ error: 'No such notes' });
        }

        res.status(200).json({
            message: "Notes updated succesfully",
            data: notes
        })
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteNotes = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such notes' });
        }

        const notes = await notesModel.findOneAndDelete({ _id: id }).exec();

        if (!notes) {
            return res.status(404).json({ error: 'No such notes' });
        }

        res.status(200).json({
            message: "Notes deleted succesfully",
            data: notes
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
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