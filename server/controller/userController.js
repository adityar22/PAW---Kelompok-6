const User = require('../model/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        loginValidation(email, password);
        const user = await User.login(email, password);

        const token = createToken(user._id);
        const username = user.username;
        const id = user._id;

        res.status(200).json({
            success: true,
            statusCode: res.statusCode,
            message: "Login succesfully",
            data: {
                email,
                username,
                token,
                id
            }
        });
    }
    catch (err) {
        next(err);
    };
}

// signup user
const signupUser = async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        //validate email and password
        signUpValidation(email, username, password);

        // user signup
        const user = await User.signup(email, username, password);

        //create token
        const token = createToken(user._id);
        const id = user._id;

        res.status(200).json({
            success: true,
            statusCode: res.statusCode,
            message: "Sign up succesfully",
            data: {
                email,
                username,
                token,
                id
            }
        });
    }
    catch (err) {
        next(err);
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
const updateUser = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw {
                success: false,
                statusCode: 404,
                message: 'Your id is invalid',
            };
        }

        // if (id !== user.id){
        //     throw {
        //         success: false,
        //         statusCode: 409,
        //         message: 'Cant use same email with another user'
        //     }
        // }


        const updatedUser = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { returnDocument: 'after' }).exec();

        if (!updatedUser) {
            throw {
                success: false,
                statusCode: 404,
                message: 'No such user',
            };
        }

        const token = createToken(updatedUser._id);

        res.status(200).json({
            success: true,
            statusCode: res.statusCode,
            message: "User and token updated succesfully",
            data: {
                email: updatedUser.email,
                username: updatedUser.username,
                token,
                id: updatedUser._id
            }
        });
    }
    catch (err) {
        next(err);
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
        next(err);
    }
};

const getUserById = async (req, res) => {
    // const user_id = req.user._id; // diambil dari requireAuth yang sudah menyimpan id sebelumnya
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const user = await User.find({ _id: id }).exec();

        if (!user) {
            return res.status(404).json({ error: 'No such user' });
        }

        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    loginUser,
    signupUser,
    updateUser,
    getUser,
    getUserById
};