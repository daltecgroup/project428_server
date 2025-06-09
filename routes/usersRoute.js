import express from 'express';
import {
    createUser,
    getAllUsers,
    getLatestUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    deactivateUserById,
    reactivateUserById,
    updateUserRoleById,
    updateUserImageById
} from '../controllers/userController.js';
import permission from '../middleware/permission.js';

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get latest users
router.post('/latest', getLatestUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUserById);

// Update user image by ID
router.put('/:id/image', updateUserImageById);

// Delete a user by ID
router.delete('/:id', deleteUserById);

// Deactivate a user by ID
router.put('/:id/deactivate', deactivateUserById);

// Reactivate a user by ID
router.put('/:id/reactivate', reactivateUserById);

// Update user role by ID
router.put('/:id/role', updateUserRoleById);

export default router;