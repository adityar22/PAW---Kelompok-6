const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(req.headers);

    if (!authorization) {
        return res.status(401).json({error: 'Auth token is required'});
    }
    
    const token = authorization.split(" ")[1];
    // console.log(token)

    try{
        const {_id} = jwt.verify(token, process.env.SECRET);
        // console.log(_id);
        //console.log(req.user); --> masih null soalnya belum disertain diassign dari modelUser
        
        // findOne returning document, select returning document with selected attribute
        // req.user instead of user because it's middleware, dan sebelumnya ga ada di req jadi ditambahin sendiri
        req.user = await User.findOne({_id}).select('_id');
        // console.log("Inside try", req.user);

        next();
    }
    catch(err){
        console.log(err);
        res.status(400).json({ error: 'Request is not authorized' });
    }

}

module.exports = requireAuth;