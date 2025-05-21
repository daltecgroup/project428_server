import Outlet from '../models/outletModel.js'
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Get current outlet by user Id
// @route   GET /api/v1/operator/:id/outlet
// @access  Public
export const getOperatorOutletById = async (req, res) => {
    try {
        const outlet = await Outlet.findOne({operator: req.params.id});
        if (!outlet) {
            return res.status(404).json({ 
                errorCode: ErrorCode.outletNotFound,
                message: 'Outlet tidak ditemukan' });
        }
        res.status(200).json(outlet);
    } catch (error) {   
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
}