import express from 'express';
import {
    createOutlet,
    getAllOutlets,
    getOutletById,
    updateOutletById,
    updateOutletImageById,
    deleteOutletById,
    deactivateOutletById,
    reactivateOutletById,
} from '../controllers/outletController.js';

const router = express.Router();

// Create a new outlet
router.post('/', createOutlet);

// Get all outlets
router.get('/', getAllOutlets);

// Get a outlet by ID
router.get('/:id', getOutletById);

// Update a outlet by ID
router.put('/:id', updateOutletById);

// Update a outlet image by ID
router.put('/:id/image', updateOutletImageById);

// Delete a outlet by ID
router.delete('/:id', deleteOutletById);

// Deactivate a outlet by ID
router.put('/:id/deactivate', deactivateOutletById);

// Reactivate a outlet by ID
router.put('/:id/reactivate', reactivateOutletById);

export default router;