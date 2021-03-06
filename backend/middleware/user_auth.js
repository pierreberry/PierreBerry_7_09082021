'use strict'
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.tokenAccountId = decodedToken.accountId;
        
        if (!req.tokenAccountId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch(error) { res.status(401).send( error ) }
};