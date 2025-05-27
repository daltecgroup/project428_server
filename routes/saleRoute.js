import express from 'express';
import {
    createSale, getAllSalesByOutlet, getSaleById
} from '../controllers/saleController.js';

const router = express.Router();

// Create a new sale
router.post('/', createSale);

// Get all sales by outlet
router.get('/outlet/:id', getAllSalesByOutlet);

// Get sale by id
router.get('/:id', getSaleById);

export default router;