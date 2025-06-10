import express from 'express';
import {
    createTopping,
    getAllToppings,
    updateToppingById
} from '../controllers/toppingController.js';

const router = express.Router();

// Create a new topping
router.post('/', createTopping);

// Get all toppings
router.get('/', getAllToppings);

// Update topping by Id
router.put('/:id', updateToppingById);

export default router;