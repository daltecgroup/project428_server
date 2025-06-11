import express from 'express';
import {
    createTopping,
    getAllToppings,
    updateToppingById,
    updateToppingImage,
    deleteToppingById
} from '../controllers/toppingController.js';

const router = express.Router();

// Create a new topping
router.post('/', createTopping);

// Get all toppings
router.get('/', getAllToppings);

// Update topping by Id
router.put('/:id', updateToppingById);

// Update topping image by Id
router.put('/:id/image', updateToppingImage);

// Delete topping by Id
router.delete('/:id', deleteToppingById)

export default router;