import Stock from '../models/stockModel.js';
import User from '../models/userModel.js';
import StockHistory from '../models/stockHistoryModel.js';
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Create a new stock
// @route   POST /api/v1/stocks
// @access  Public
export const createStock = async (req, res) => {
    try {

        const { userId, stockId, name, unit, price, isActive } = req.body;

        // Check if the stock already exists
        const existingStock = await Stock.findOne({ stockId });
        if (existingStock) {
            console.log(ErrorCode.stockAlreadyExist)
            return res.status(400).json({
                errorCode: ErrorCode.stockAlreadyExist,
                message: 'Kode Stok sudah terdaftar'
            });
        }

        // check if author exist
        const existingUser = await User.findOne({ _id: userId });
        if (!existingUser) {
            console.log(ErrorCode.userNotFound);
            return res.status(400).json({
                errorCode: ErrorCode.userNotFound,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Create a new stock
        const newStock = new Stock({
            stockId,
            name,
            unit,
            price,
            isActive,
        });


        // Create a new stock history
        const content = `Stok ${name} dibuat dengan harga awal IDR ${price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} oleh ${existingUser.name}.`;
        const newStockHistory = new StockHistory({
            stock: newStock._id,
            author: {
                userRef: userId,
                name: existingUser.name
            },
            content
        });

        // Save the stock to the database
        await newStock.save();

        // Save stock history to the database
        await newStockHistory.save();

        console.log(`Stock successfully created: ${newStock.stockId}`);
        console.log(`Stock History successfully created: ${newStockHistory.content}`);
        res.status(201).json(newStock);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error',
            error: error.message
        });
    }
}

// @desc    Get all stocks
// @route   GET /api/v1/stocks
// @access  Public
export const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message
        });
    }
};

// @desc    Get a stock by ID
// @route   GET /api/v1/stocks/:id
// @access  Public
export const getStockById = async (req, res) => {
    try {
        const stock = await Stock.findOne({ stockId: req.params.id });
        if (!stock) {
            return res.status(404).json({
                errorCode: ErrorCode.stockNotFound,
                message: 'Stok tidak ditemukan'
            });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message
        });
    }
}

// @desc    Update a stock by ID
// @route   PUT /api/v1/stocks/:id
// @access  Public
export const updateStockById = async (req, res) => {
    try {
        const { userId, name, unit, price } = req.body;
        const updatedAt = new Date();

        const user = await User.findOne({
            _id: userId
        });

        if (!user) {
            return res.status(404).json({
                errorCode: ErrorCode.userNotFound,
                message: 'Pengguna tidak ditemukan'
            });
        }

        // Find the stock by ID
        const stock = await Stock.findOne(
            { _id: req.params.id }
        );

        const oldPrice = stock.price;
        const oldName = stock.name;

        if (!stock) {
            return res.status(404).json({
                errorCode: ErrorCode.stockNotFound,
                message: 'Stok tidak ditemukan'
            });
        }
        // Find the stock by ID and update it
        const updatedStock = await Stock.findOneAndUpdate(
            { _id: req.params.id },
            { name, unit, price, updatedAt },
            { new: true }
        );

        var content;
        var newStockHistory;

        // Create a new stock history for name change
        if ((name != stock.name) && name != null) {
            content = `Nama diubah dari "${oldName}" menjadi "${name}" oleh ${user.name}.`;
            newStockHistory = new StockHistory({
                author: {
                    userRef: user._id,
                    name: user.name,
                },
                stock: updatedStock._id,
                content
            });
            newStockHistory.save();
            console.log(content);
        }

        // Create a new stock history for name change
        if ((price != stock.price) && price != null) {
            content = `Harga diubah dari IDR ${oldPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} menjadi IDR ${price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} oleh ${user.name}`;
            newStockHistory = new StockHistory({
                author: {
                    userRef: user._id,
                    name: user.name,
                },
                stock: updatedStock._id,
                content
            });
            newStockHistory.save();
            console.log(content);
        }

        res.status(200).json(updatedStock);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a stock by ID
// @route   DELETE /api/v1/stocks/:id
// @access  Public
export const deleteStockById = async (req, res) => {
    try {
        const stock = await Stock.findOneAndDelete({ stockId: req.params.id });
        if (!stock) {
            return res.status(404).json({
                errorCode: ErrorCode.stockNotFound,
                message: 'Stock not found'
            });
        }
        res.status(200).json({

            message: 'Stock deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Deactivate a stock by ID
// @route   PUT /api/v1/stocks/:id/deactivate
// @access  Public
export const deactivateStockById = async (req, res) => {
    try {
        const stock = await Stock.findOneAndUpdate(
            { _id: req.params.id },
            { isActive: false },
            { new: true }
        );

        if (!stock) {
            return res.status(404).json({
                errorCode: ErrorCode.stockNotFound,
                message: 'Stock not found'
            });
        }

        res.status(200).json({ message: 'Stock deactivated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Reactivate a stock by ID
// @route   PUT /api/v1/stocks/:id/reactivate
// @access  Public
export const reactivateStockById = async (req, res) => {
    try {
        const stock = await Stock.findOneAndUpdate(
            { _id: req.params.id },
            { isActive: true },
            { new: true }
        );

        if (!stock) {
            return res.status(404).json({
                errorCode: ErrorCode.stockNotFound,
                message: 'Stock not found'
            });
        }

        res.status(200).json({ message: 'Stock reactivated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Get all history of a stock
// @route   GET /api/v1/stocks/:id/history
// @access  Public
export const getAllStocksHistory = async (req, res) => {
    console.log(req.params.id);
    try {
        const history = await StockHistory.find({ stock: req.params.id });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message
        });
    }
};