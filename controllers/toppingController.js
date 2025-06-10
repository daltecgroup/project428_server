import Topping from '../models/toppingModel.js';
import { ErrorCode } from '../constants/errorCode.js';
import { getJakartaTime } from '../utils/timezone.js';

// @desc    Create a new topping
// @route   POST /api/v1/toppings
// @access  Public
export const createTopping = async (req, res) => {
    try {
        const { code, name, price, ingredients } = req.body;

        // Check if the topping already exists
        const existingTopping = await Topping.findOne({
            $or: [
                { code }, { name }
            ]
        });

        if (existingTopping) {
            console.log(ErrorCode.toppingAlreadyExist)
            return res.status(400).json({
                errorCode: ErrorCode.toppingAlreadyExist,
                message: 'Topping sudah terdaftar'
            });
        }

        // Create a new product category
        const newTopping = new Topping({
            code,
            name,
            price,
            ingredients,
        });

        // Save the product category to the database
        await newTopping.save();

        console.log(`Topping successfully created: ${newTopping._id}`);
        res.status(201).json(newTopping);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error',
            error: error.message
        });
    }
}

// @desc    Get all toppings
// @route   GET /api/v1/toppings
// @access  Public
export const getAllToppings = async (req, res) => {
    try {
        const toppings = await Topping.find({isDeleted: false});
        res.status(200).json(toppings);
    } catch (error) {
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message
        });
    }
};

// @desc    Update topping by Id
// @route   PUT /api/v1/toppings/:id
// @access  Public
export const updateToppingById = async (req, res) => {
    try {
        const { name, price, isActive } = req.body;

        // Check if topping exist
        const topping = await Topping.findOne(
            { _id: req.params.id }
        );
        
        if (!topping) {
            return res.status(404).json({ 
                errorCode: ErrorCode.toppingNotFound,
                message: 'Topping tidak ditemukan' });
            }
        // Find topping by ID and update it
            const updatedTopping = await Topping.findOneAndUpdate(
                { _id: req.params.id },
                { name, price, isActive, updatedAt: getJakartaTime() },
                { new: true }
            );

        res.status(200).json(updatedTopping);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a topping image
// @route   PUT /api/v1/toppings/:id/image
// @access  Public
export const updateToppingImage = async (req, res) => {
    try {
        // make imgUrl from req.file
        const imgUrl = req.file ? req.file.filename : null;

        // Check if topping exist
        const topping = await Topping.findOne(
            { _id: req.params.id }
        );
        
        if (!topping) {
            return res.status(404).json({ 
                errorCode: ErrorCode.toppingNotFound,
                message: 'Topping tidak ditemukan' });
            }
        // Find topping by ID and update it
            const updatedTopping = await Topping.findOneAndUpdate(
                { _id: req.params.id },
                { imgUrl, updatedAt: getJakartaTime() },
                { new: true }
            );

        res.status(200).json(updatedTopping);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};