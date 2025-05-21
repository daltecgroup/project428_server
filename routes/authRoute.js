import express from 'express';
import { loginUser, refreshToken, logoutUser, verifyPin } from '../controllers/authController.js';

const router = express.Router();

// Login user
router.post('/login', loginUser);

// Refresh token
router.post('/refresh', refreshToken);

// Logout user
router.post('/logout', logoutUser);

// Verify pin
router.post('/verify-pin', verifyPin);

export default router;