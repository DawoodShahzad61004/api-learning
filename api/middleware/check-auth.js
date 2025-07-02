import jwt from 'jsonwebtoken';

function checkAuth (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        // Assuming the token is sent as "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

export default checkAuth;