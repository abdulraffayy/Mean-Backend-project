const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Authenticate Token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};

// Authorize Roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ message: 'Access Forbidden' });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
