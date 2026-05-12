const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Auth header:", authHeader);
    console.log("Extracted token:", token);
    

    if (!token) {
        return res.status(401).json({success: false, message: 'Access token is missing'});
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({success: false, message: 'Invalid access token'});
        }
        req.user = user;
        console.log(user);
        next();
    });
}

function authorizeRoles(...allowedRoles) {
    console.log("Allowed roles for this route:", allowedRoles);
    

    return (req, res, next) => {
        console.log("User role:", req.user.role);

        
        if (!req.user || !allowedRoles.includes(req.user.role?.toLowerCase())) {
            return res.status(403).json({success: false, message: 'Forbidden: insufficient permissions'});
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles
};