import Outlet from '../models/outletModel.js';
import { ErrorCode } from '../constants/errorCode.js';

// @desc    Create a new outlet
// @route   POST /api/v1/outlets
// @access  Public
export const createOutlet = async (req, res) => {
    try {

        const { code, name, isActive, owner, operator, address, imgUrl, foundedAt } = req.body;

        // Check if the outlet already exists
        const existingOutlet = await Outlet.findOne({ code });
        if (existingOutlet) {
            console.log(ErrorCode.outletAlreadyExist)
            return res.status(400).json({
                errorCode: ErrorCode.outletAlreadyExist,
                message: 'Kode Outlet sudah terdaftar'
            });
        }

        // Create a new outlet
        const newOutlet = new Outlet({
            code,
            name,
            isActive,
            owner,
            operator,
            address,
            imgUrl,
            foundedAt
        });

        // Save the outlet to the database
        await newOutlet.save();

        console.log(`Outlet successfully created: ${newOutlet.code}`);
        res.status(201).json(newOutlet);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorCode: ErrorCode.serverError,
            message: 'Server error',
            error: error.message
        });
    }
}

// @desc    Get all outlet
// @route   GET /api/v1/outlets
// @access  Public
export const getAllOutlets = async (req, res) => {
    try {
        const outlets = await Outlet.find().populate('owner','userId name imgUrl').populate('operator','userId name imgUrl').populate('spvarea','userId name role imgUrl').exec();
        res.status(200).json(outlets);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get a outlet by ID
// @route   GET /api/v1/outlets/:id
// @access  Public
export const getOutletById = async (req, res) => {
    try {
        const outlet = await Outlet.findOne({ code: req.params.id }).populate('owner','userId name role imgUrl').populate('operator','userId name role imgUrl').populate('spvarea','userId name role imgUrl').exec();
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

// @desc    Update a outlet by ID
// @route   PUT /api/v1/outlets/:id
// @access  Public
export const updateOutletById = async (req, res) => {
    try {
        const {name, owner, operator, spvarea, address, imgUrl, foundedAt} = req.body;
        const updatedAt = new Date();

        // Find the outlet by ID and update it
        const outlet = await Outlet.findOne(
            { code: req.params.id }
        );
        
        if (!outlet) {
            return res.status(404).json({ 
                errorCode: ErrorCode.outletNotFound,
                message: 'Outlet tidak ditemukan' });
            }

        // Find the user by ID and update it
            const updatedOutlet = await Outlet.findOneAndUpdate(
                { code: req.params.id },
                { name, owner, operator, spvarea, address, imgUrl, foundedAt},
                { new: true }
            ).populate('owner','userId name role imgUrl').populate('operator','userId name role imgUrl').populate('spvarea','userId name role imgUrl').exec();

        res.status(200).json(updatedOutlet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a outlet image by ID
// @route   PUT /api/v1/outlets/:id/image
// @access  Public
export const updateOutletImageById = async (req, res) => {
    try { 
        const updatedAt = new Date();

        // make imgUrl from req.file
        const imgUrl = req.file ? req.file.filename : null;

        // Find the outlet by ID and update it
        const outlet = await Outlet.findOne(
            { code: req.params.id }
        );
        
        if (!outlet) {
            return res.status(404).json({ 
                errorCode: ErrorCode.outletNotFound,
                message: 'Outlet tidak ditemukan' });
            }

        // Find the outlet by ID and update it
            const updatedOutlet = await Outlet.findOneAndUpdate(
                { code: req.params.id },
                { imgUrl, updatedAt},
                { new: true }
            ).populate('owner','userId name role imgUrl').populate('operator','userId name role imgUrl').populate('spvarea','userId name role imgUrl').exec();

        res.status(200).json(updatedOutlet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a outlet by ID
// @route   DELETE /api/v1/outlets/:id
// @access  Public
export const deleteOutletById = async (req, res) => {
    try {
        const outlet = await Outlet.findOneAndDelete({ code: req.params.id });
        if (!outlet) {
            return res.status(404).json({ 
                errorCode: ErrorCode.outletNotFound,
                message: 'Outlet not found' });
        }
        res.status(200).json({ 
            
            message: 'Outlet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Deactivate a outlet by ID
// @route   PUT /api/v1/outlets/:id/deactivate
// @access  Public
export const deactivateOutletById = async (req, res) => {
    try {
        const outlet = await Outlet.findOneAndUpdate(
            { code: req.params.id },
            { isActive: false },
            { new: true }
        );     

        if (!outlet) {
            return res.status(404).json({ 
                errorCode: ErrorCode.outletNotFound,
                message: 'Outlet not found' });
        }

        res.status(200).json({ message: 'Outlet deactivated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Reactivate a outlet by ID
// @route   PUT /api/v1/outlets/:id/reactivate
// @access  Public
export const reactivateOutletById = async (req, res) => {
    try {
        const outlet = await Outlet.findOneAndUpdate(
            { code: req.params.id },
            { isActive: true },
            { new: true }
        );     

        if (!outlet) {
            return res.status(404).json({ 
                errorCode: ErrorCode.outletNotFound,
                message: 'Outlet not found' });
        }

        res.status(200).json({ message: 'Outlet reactivated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}