const notesModel = require('../model/notesModel');

const createNotes = async (req, res) => {
    const { title, content, isPinned, tag } = req.body;
    const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya

    try {
        const newNotes = await notesModel.create({ title, content, user_id, isPinned, tag });
        res.status(200).json(newNotes);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    };
}

const updateNotes = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such notes' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ error: 'No such notes' })
    }

    res.status(200).json(workout)
};

const deleteNotes = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such notes' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: 'No such notes' })
    }

    res.status(200).json(workout)
};

const getAllNotes = async (req, res) => {
    const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya

    try {
        const notes = await notesModel.find({ user_id }).sort({ createdAt: -1 }).exec();
        res.status(200).json(notes);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};

const getNotesById = async (req, res) => {
    const { id } = req.params
    const user_id = req.user._id;

    try {
        const notes = await notesModel.find({ user_id }).findById(id)
        res.status(200).json(notes);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}

const getFilteredNotes = async (req, res) => {
    const user_id = req.user._id;

    try {
        const filters = req.query;
        const notes = await notesModel.find({ user_id }).sort({ createdAt: -1 });
        console.log(filters);

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
        res.status(400).json(err.message);
    }
}

module.exports = {
    createNotes,
    updateNotes,
    deleteNotes,
    getAllNotes,
    getNotesById,
    getFilteredNotes
};