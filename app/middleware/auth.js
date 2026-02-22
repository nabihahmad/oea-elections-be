const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../../config/env");

const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
        
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, jwtSecret);
            
            if (!decoded || !decoded.roles) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            if (requiredRole && decoded.roles && !decoded.roles.includes(requiredRole)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: 'Token validation failed' });
        }
    };
};

module.exports = authMiddleware;