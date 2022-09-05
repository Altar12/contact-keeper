const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({msg: 'no token, authorisation denied'});
    }
    try {
        const payload = await jwt.verify(token, config.get('jwtSecret'));
        req.user = payload.user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({msg: 'invalid token, authorisation denied'});
    }

};

module.exports = auth;