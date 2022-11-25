const User = require('../model/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        loginValidation(email, password);
        const user = await User.login(email, password);

        const token = createToken(user._id);
        const username = user.username;
        const id = user._id;

        res.status(200).json({ message: "Login succesfully", id, email, username, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    };
}

// signup user
const signupUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        //validate email and password
        signUpValidation(email, username, password);

        // user signup
        const user = await User.signup(email, username, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({ message: "Sign up succesfully", email, username, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

}

const signUpValidation = (email, username, password) => {
    if (!email || !username || !password) {
        throw Error('All field must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }
}

const loginValidation = (email, password) => {
    if (!email || !password) {
        throw Error('All field must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
}

// Update user
const updateUser = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user' })
        }
        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { returnDocument: 'after' }).exec();

        if (!user) {
            return res.status(404).json({ error: 'No such user' });
        }

        res.status(200).json({
            message: "User updated succesfully",
            data: user
        })
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getUser = async (req, res) => {
    // const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya

    try {
        const user = await User.find().exec();

        if (!user) {
            return res.status(404).json({ error: 'No such user' });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    // const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya
    const id = mongoose.Types.ObjectId(req.params.id);

    try {
        const user = await User.find({ _id: id }).exec();

        if (!user) {
            return res.status(404).json({ error: 'No such user' });
        }

        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    loginUser,
    signupUser,
    updateUser,
    getUser,
    getUserById
};