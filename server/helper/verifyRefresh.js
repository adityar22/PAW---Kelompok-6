const jwt = require('jsonwebtoken');

const verifyRefresh = (email, refreshToken) => {
    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        return decoded.email === email;
    }
    catch(error) {
        return false;
    }
}

module.exports = { verifyRefresh }