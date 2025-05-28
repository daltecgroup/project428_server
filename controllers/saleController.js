import Sale from '../models/saleModel.js';
import Stock from '../models/stockModel.js';
import Outlet from '../models/outletModel.js';
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Create a new sale
// @route   POST /api/v1/sales/
// @access  Public
export const createSale = async (req, res) => {
    try {
        const {
            code, 
            items, 
            finalPrice, 
            basePrice, 
            saving, 
            paid, 
            change,
            outlet, 
            cashier, 
            paymentMethod, 
            promoUsed,
        } = req.body;


        // Create a new sale
        const newSale = new Sale({
           code, 
            items, 
            finalPrice, 
            basePrice, 
            saving, 
            paid, 
            change,
            outlet, 
            cashier, 
            paymentMethod, 
            promoUsed,
        });
        
        // Save the sale to the database
        await newSale.save();

        console.log(`Sale successfully created: ${newSale.code}`);
        res.status(201).json(newSale);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error',
            error: error.message
        });
    }
}

// @desc    Get all sales by outlet
// @route   GET /api/v1/sales/outlet/:id/today
// @access  Public
export const getTodaySalesByOutlet = async (req, res) => {
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sales = await Sale.find({
            outlet: req.params.id,
            createdAt: {
                $gte: today
            }
        }).populate('cashier').populate('outlet').populate('items.product').populate('items.product.category').exec();
res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get all today's sales by outlet
// @route   GET /api/v1/sales/outlet/:id
// @access  Public
export const getAllSalesByOutlet = async (req, res) => {
    try {
        const sales = await Sale.find({outlet: req.params.id}).populate('cashier').populate('outlet').populate('items.product').populate('items.product.category').exec();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};


// @desc    Get sales by id
// @route   GET /api/v1/sales/:id
// @access  Public
export const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findOne({code: req.params.id}).populate('cashier').populate('outlet').populate('items.product').populate('items.product.category').exec();
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};