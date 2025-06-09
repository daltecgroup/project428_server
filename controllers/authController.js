import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { userId, pin } = req.body;
        console.log(userId);

        // Check if the user exists
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(400).json({ 
                errorCode: ErrorCode.userNotFound,
                message: 'Pengguna tidak ditemukan' });
        }   
        
        // Check if the password is correct
        const isMatch = await bcrypt.compare(pin, user.pin);
        if (!isMatch) {
            return res.status(400).json({ 
                errorCode: ErrorCode.invalidCredential,
                message: 'PIN salah' });
        }
        
        // Check if the user is active
        if (!user.isActive) {
            return res.status(403).json({ 
                errorCode: ErrorCode.innactiveUser,
                message: 'Status pengguna tidak aktif' });
        }
        
        // Generate tokens
        const accessToken = generateAccessToken({ userId: user.userId, role: user.role });
        const refreshToken = generateRefreshToken({ userId: user.userId, role: user.role });

        console.log(user.role);
        
        
        // Send response
        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                userId: user.userId,
                name: user.name,
                role: user.role,
                imgUrl: user.imgUrl,
            },
        });
    }
    catch (error) {
        res.status(500).json({ 
            errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
}

// @desc    Refresh token
// @route   POST /api/v1/auth/refresh
// @access  Public
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        // Check if the refresh token is provided
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            // Generate a new access token
            const accessToken = generateAccessToken({ userId: user.userId, role: user.role });

            // Send response
            res.status(200).json({ accessToken });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Public
export const logoutUser = async (req, res) => {
    try {
        // Invalidate the refresh token
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        // Here you can implement logic to invalidate the refresh token in your database

        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc   Verify pin
// @route  POST /api/v1/auth/verify-pin
// @access Public
export const verifyPin = async (req, res) => {
    try {
        const { userId, pin } = req.body;

        // Check if the user exists
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const isMatch = await bcrypt.compare(pin, user.pin);    
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check if the user is active
        if (!user.isActive) {
            return res.status(403).json({ message: 'User is inactive' });
        }
        
        // Send response
        res.status(200).json({
            message: 'Pin verified successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

