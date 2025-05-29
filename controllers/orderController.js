import Order from '../models/orderModel.js';
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Create a new order
// @route   POST /api/v1/orders
// @access  Public
export const createOrder = async (req, res) => {
    try {
        const {
            outlet,
            items,
            total,
        } = req.body;

        // create random number for code, start with ORDER, YYMM then 6 digits random
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with 0 if needed
        const randomDigits = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 random digits
        const code = `ORDER${year}${month}${randomDigits}`;

        // check if the order already exists
        const existingOrder = await Order.findOne({ code });
        if (existingOrder) {
            console.log(ErrorCode.orderAlreadyExist);
            return res.status(400).json({
                errorCode: ErrorCode.orderAlreadyExist,
                message: 'Order with this code already exists'
            });
        }

        console.log(outlet);

        // Create a new product category
        const newOrder = new Order({
            code,
            outlet,
            items,
            total,
        });

        // Save the product category to the database
        await newOrder.save();

        console.log(`Order successfully created: ${newOrder._id}`);
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error',
            error: error.message
        });
    }
}

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Public
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('outlet').populate('items.stock').exec();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get order by id
// @route   GET /api/v1/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({code: req.params.id}).populate('outlet').populate('items.stock').exec();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get orders by outlet
// @route   GET /api/v1/orders/outlet/:id
// @access  Public
export const getOrdersByOutlet = async (req, res) => {
    try {
        const orders = await Order.find({outlet: req.params.id}).populate('outlet').populate('items.stock').exec();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get orders by outlet
// @route   GET /api/v1/orders/outlet/:id/today
// @access  Public
export const getTodayOrdersByOutlet = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of the day
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Set to start of the next day
        const orders = await Order.find({
            outlet: req.params.id,
            createdAt: {
                $gte: today,
                $lt: tomorrow
            }
        }).populate('outlet').populate('items.stock').exec();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Update an order by code
// @route   PUT /api/v1/orders/:id
// @access  Public
export const updateOrderById = async (req, res) => {
    try {
        const { status, items} = req.body;
        const updatedAt = new Date();

        // Find the user by ID and update it
        const order = await Order.findOne(
            { code: req.params.id }
        );
        
        if (!order) {
            return res.status(404).json({ 
                errorCode: ErrorCode.orderNotFound,
                message: 'Pesanan tidak ditemukan' });
            }

        // Find the user by ID and update it
            const updatedOrder = await Stock.findOneAndUpdate(
                { stockId: req.params.id },
                { status, items },
                { new: true }
            );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};