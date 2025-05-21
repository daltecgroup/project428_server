import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const checkPermission = (permission) => {
    return (req, res, next) => {
    // Get the token from the request headers
    console.log(permission);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        // Allow all users to access the route
        if (true) {
            next(); // User is an admin, proceed to the next middleware
        } else {
            res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
        }
    });

}
}


export default checkPermission;