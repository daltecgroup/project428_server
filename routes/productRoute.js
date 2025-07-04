import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProductById
} from '../controllers/productController.js';

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get a product by ID
router.get('/:id', getProductById);

// Delete a stock by ID
router.delete('/:id', deleteProductById);

export default router;