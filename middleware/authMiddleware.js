const jwt = require('jsonwebtoken');

const authMiddleware = (roles) => {
    return (req, res, next) => {

        // Extract token from cookie
        const token = req.cookies.token;

        // Check if token is present
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if user has required role
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'User not authorized' });
            }

            // Attach user ID to request for further use
            req.user = decoded;

            next();
        } catch (error) {
            console.error('Error verifying token:', error.message);
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = authMiddleware;
