import express from 'express';
import { signup, login, getProfile, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const { sign } = 'jsonwebtoken';

const router = express.Router();

// Register a new user
router.post('/signup', signup);

// Login user
router.post('/login', login);

// Get user profile
router.get('/profile', protect, getProfile);

// User LogOut
router.post('/logout', protect, logout);

export default router;