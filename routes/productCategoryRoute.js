import express from 'express';
import {
    createProductCategory,
    getAllProductCategory,
    getProductCategoryById,
    deleteProductCategoriesById,
    updateProductCategoryById,
    deactivateProductCategoryById,
    reactivateProductCategoryById,
} from '../controllers/productCategoryController.js';

const router = express.Router();

// Create a new product category
router.post('/', createProductCategory);

// Get all product category
router.get('/', getAllProductCategory);

// Get a product category by ID
router.get('/:id', getProductCategoryById);

// Update a product category by ID
router.put('/:id', updateProductCategoryById);

// Delete a product category by ID
router.delete('/:id', deleteProductCategoriesById);

// Deactivate a product category by ID
router.patch('/:id/deactivate', deactivateProductCategoryById);

// Reactivate a product category by ID
router.patch('/:id/reactivate', reactivateProductCategoryById);

export default router;