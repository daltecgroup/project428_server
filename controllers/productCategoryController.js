import Category from '../models/productCategoryModel.js';
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Create a new product category
// @route   POST /api/v1/product-categories
// @access  Public
export const createProductCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the product category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            console.log(ErrorCode.productCategoryAlreadyExist)
            return res.status(400).json({
                errorCode: ErrorCode.productCategoryAlreadyExist,
                message: 'Nama Kategori sudah terdaftar'
            });
        }

        // Create a new product category
        const newCategory = new Category({
            name,
            isActive: false,
        });

        // Save the product category to the database
        await newCategory.save();

        console.log(`Product Category successfully created: ${newCategory._id}`);
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error',
            error: error.message
        });
    }
}

// @desc    Get all product category
// @route   GET /api/v1/product-categories
// @access  Public
export const getAllProductCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get a product category by ID
// @route   GET /api/v1/product-categories/:id
// @access  Public
export const getProductCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        if (!category) {
            return res.status(404).json({ 
                errorCode: ErrorCode.productCategoryNotFound,
                message: 'Kategori Produk tidak ditemukan' });
        }
        res.status(200).json(category);
    } catch (error) {   
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
}

// @desc    Delete a product category by ID
// @route   DELETE /api/v1/product-categories/:id
// @access  Public
export const deleteProductCategoriesById = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id });
        if (!category) {
            return res.status(404).json({ 
                errorCode: ErrorCode.productCategoryNotFound,
                message: 'Product Category not found' });
        }
        res.status(200).json({ 
            
            message: 'Product Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Deactivate a product category by ID
// @route   PATCH /api/v1/product-categories/:id/deactivate
// @access  Public
export const deactivateProductCategoryById = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { isActive: false },
            { new: true }
        );     

        if (!category) {
            return res.status(404).json({ 
                errorCode: ErrorCode.productCategoryNotFound,
                message: 'Product Category not found' });
        }

        res.status(200).json({ message: 'Product Category deactivated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Reactivate a product category by ID
// @route   PATCH /api/v1/product-categories/:id/reactivate
// @access  Public
export const reactivateProductCategoryById = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { isActive: true },
            { new: true }
        );     

        if (!category) {
            return res.status(404).json({ 
                errorCode: ErrorCode.productCategoryNotFound,
                message: 'Product Category not found' });
        }

        res.status(200).json({ message: 'Product Category reactivated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Update a stock by ID
// @route   PUT /api/v1/procuct-categories/:id
// @access  Public
export const updateProductCategoryById = async (req, res) => {
    try {
        const { name} = req.body;

        // Find the user by ID and update it
        const category = await Category.findOne(
            { _id: req.params.id }
        );
        
        if (!category) {
            return res.status(404).json({ 
                errorCode: ErrorCode.productCategoryNotFound,
                message: 'Kategori Produk tidak ditemukan' });
            }
        // Find the product category by ID and update it
            const updatedCategory = await Category.findOneAndUpdate(
                { _id: req.params.id },
                { name},
                { new: true }
            );

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};