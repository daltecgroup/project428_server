import express from 'express';
import { createOrder, getOrders, getOrderById, getOrdersByOutlet } from '../controllers/orderController.js';

const router = express.Router();

// Create order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Get order by id
router.get('/:id', getOrderById);

// Get orders by outlet
router.get('/outlet/:id', getOrdersByOutlet);

export default router;