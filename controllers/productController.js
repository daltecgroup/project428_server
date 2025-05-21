import Product from '../models/productModel.js';
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Public
export const createProduct = async (req, res) => {
    try {
        const product = JSON.parse(req.body.product);
        const { 
            code, 
            name, 
            price, 
            discount, 
            description, 
            category, 
            ingredients, 
            isActive 
        } = product;

        // make imgUrl from req.file
        const imgUrl = req.file ? req.file.path : null;

        // Check if the product already exists
        const existingProduct = await Product.findOne({ code });
        if (existingProduct) {
            console.log(ErrorCode.productAlreadyExist)
            return res.status(400).json({
                errorCode: ErrorCode.productAlreadyExist,
                message: 'Kode Produk sudah terdaftar'
            });
        }
        

        // Create a new product
        const newProduct = new Product({
            code, 
            name, 
            price, 
            discount, 
            description, 
            category,
            imgUrl,
            ingredients,
            isActive
        });

        // Save the product to the database
        await newProduct.save();

        console.log(`Product successfully created: ${newProduct._id}`);
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: error,
            error: error.message
        });
    }
}

// @desc    Get all product
// @route   GET /api/v1/products
// @access  Public
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('ingredients.stock').exec();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get a product by ID
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ code: req.params.id }).populate('category').populate('ingredients.stock').exec();
        if (!product) {
            return res.status(404).json({ 
                errorCode: ErrorCode.productNotFound,
                message: 'Product tidak ditemukan' });
        }
        res.status(200).json(product);
    } catch (error) {   
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
}


// @desc    Update a product by ID
// @route   PUT /api/v1/procuct-categories/:id
// @access  Public


// @desc    Delete a product by ID
// @route   DELETE /api/v1/products/:id
// @access  Public
export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ code: req.params.id });
        if (!product) {
            return res.status(404).json({ 
                errorCode: ErrorCode.productNotFound,
                message: 'Product not found' });
        }
        res.status(200).json({ 
            
            message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// @desc    Deactivate a product by ID
// @route   PATCH /api/v1/products/:id/deactivate
// @access  Public


// @desc    Reactivate a product by ID
// @route   PATCH /api/v1/products/:id/reactivate
// @access  Public




