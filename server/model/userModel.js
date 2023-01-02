const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.statics.signup = async function (email, username, password) {

    const isExist = await this.findOne({ email });

    if (isExist) throw Error('Email already in use');

    // makin lama, makin aman tapi prosesnya makin lama karena nambahin saltnya makin panjang
    const salt = await bcrypt.genSalt(2);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, username, password: hash });

    return user;
}

userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email });
    if (!user) throw {
        success: false,
        statusCode: 400,
        message: 'Incorrect Email for login',
    };

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw {
        success: false,
        statusCode: 400,
        message: 'Incorrect Password',
    };

    return user;
}

module.exports = mongoose.model('User', userSchema);