const jwt = require('jsonwebtoken')
const {unAuthenticatedError} = require('../errors/index')

const Authentication = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user= {userId: payload.userId};
        next();
    } catch (error) {
        throw new unAuthenticatedError('Authentication invalid')
    }
};

module.exports = Authentication;
