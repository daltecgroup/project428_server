import express from 'express';
import { createOrder, 
    getOrders, 
    getOrderById, 
    getOrdersByOutlet, 
    getTodayOrdersByOutlet,
    updateOrderById,
    deleteOrdertById
} from '../controllers/orderController.js';

const router = express.Router();

// Create order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Get order by id
router.get('/:id', getOrderById);

// Get orders by outlet
router.get('/outlet/:id', getOrdersByOutlet);

// Get todays order by outlet
router.get('/outlet/:id/today', getTodayOrdersByOutlet);

// Update order by id
router.put('/:id', updateOrderById);

// Update order by id
router.delete('/:id', deleteOrdertById);

export default router;