import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    deactivateUserById,
    reactivateUserById,
    updateUserRoleById
} from '../controllers/userController.js';
import permission from '../middleware/permission.js';

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUserById);

// Delete a user by ID
router.delete('/:id', deleteUserById);

// Deactivate a user by ID
router.patch('/:id/deactivate', deactivateUserById);

// Reactivate a user by ID
router.patch('/:id/reactivate', reactivateUserById);

// Update user role by ID
router.patch('/:id/role', updateUserRoleById);

export default router;