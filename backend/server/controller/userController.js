const User = require('../model/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        loginValidation(email, password);

        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({ email, token });
    }
    catch(err){
        res.status(400).json({ error: err.message });
    };
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        //validate email and password
        signUpValidation(email, password);

        // user signup
        const user = await User.signup(email, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

}

const signUpValidation = (email, password) => {
    if (!email || !password) {
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

module.exports = {
    loginUser,
    signupUser
};