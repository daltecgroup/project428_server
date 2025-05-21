import express from 'express';
import {
    createStock,
    getAllStocks,
    getStockById,
    updateStockById,
    deleteStockById,
    deactivateStockById,
    reactivateStockById,
    getAllStocksHistory
} from '../controllers/stockController.js';

const router = express.Router();

// Create a new user
router.post('/', createStock);

// Get all stocks
router.get('/', getAllStocks);

// Get a stock by ID
router.get('/:id', getStockById);

// Update a stock by ID
router.put('/:id', updateStockById);

// Delete a stock by ID
router.delete('/:id', deleteStockById);

// Deactivate a stock by ID
router.patch('/:id/deactivate', deactivateStockById);

// Reactivate a stock by ID
router.patch('/:id/reactivate', reactivateStockById);

// Get all stocks history
router.get('/:id/history', getAllStocksHistory);

export default router;