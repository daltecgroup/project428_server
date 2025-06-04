// Create a new user
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Update from '../models/updateModel.js';
import { ErrorCode } from '../constants/errorCode.js';

const salt = await bcrypt.genSalt(10);

// @desc    Create a new user
// @route   POST /api/v1/users
// @access  Public
export const createUser = async (req, res) => {
    try {
        const { userId, name, role, pin } = req.body;

        // hash the pin
        const hashedPin = await bcrypt.hash(pin, salt);

        // Check if the user already exists
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            console.log(ErrorCode.userAlreadyExist)
            return res.status(400).json({ 
                errorCode: ErrorCode.userAlreadyExist,
                message: 'ID pengguna sudah terdaftar' });
        }

        // Create a new user
        const newUser = new User({
            userId,
            name,
            role,
            pin: hashedPin,
        });

        // Save the user to the database
        await newUser.save();
        console.log(`User successfully created: ${newUser._id}`)

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
};

// @desc    Get a user by ID
// @route   GET /api/v1/users/:id
// @access  Public
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.id });
        if (!user) {
            return res.status(404).json({ 
                errorCode: ErrorCode.userNotFound,
                message: 'Pengguna tidak ditemukan' });
        }
        res.status(200).json(user);
    } catch (error) {   
        res.status(500).json({ errorCode: ErrorCode.serverError,
            message: 'Server error', error: error.message });
    }
}

// @desc    Update a user by ID
// @route   PUT /api/v1/users/:id
// @access  Public
export const updateUserById = async (req, res) => {
    try {
        const { userId, name, role, phone, pin, isActive} = req.body;
        const updatedAt = new Date();

        const existingUser = await User.findOne({userId});

        if(existingUser && existingUser._id != req.params.id){
            return res.status(404).json({ message: 'ID Pengguna sudah terdaftar' });
        }

        // Check if pin is provided and hash it
        let newPin;
        if (pin) {
            newPin = await bcrypt.hash(pin, salt);
        } else {
            const existingPin = await User.findOne({ _id: req.params.id});
            newPin = existingPin.pin; // Use the existing pin if not provided
        }
        
        // Find the user by ID and update it
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            { userId, name, role, phone, updatedAt, pin: newPin, isActive },
            { new: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a user by ID
// @route   DELETE /api/v1/users/:id
// @access  Public
export const deleteUserById = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ userId: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Deactivate a user by ID
// @route   PUT /api/v1/users/:id/deactivate
// @access  Public
export const deactivateUserById = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { userId: req.params.id },
            { isActive: false },
            { new: true }
        );     

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deactivated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Reactivate a user by ID
// @route   PUT /api/v1/users/:id/reactivate
// @access  Public
export const reactivateUserById = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { userId: req.params.id },
            { isActive: true },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User reactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Update user role by ID
// @route   PATCH /api/v1/users/:id/role
// @access  Public
export const updateUserRoleById = async (req, res) => {
    try {
        const { role } = req.body;

        // Find the user by ID and update the role
        const updatedUser = await User.findOneAndUpdate(
            { userId: req.params.id },
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Update a user image by ID
// @route   PUT /api/v1/users/:id/image
// @access  Public
export const updateUserImageById = async (req, res) => {
    try { 
        const updatedAt = new Date();

        // make imgUrl from req.file
        const imgUrl = req.file ? req.file.filename : null;

        // Find user by ID and update it
        const user = await User.findOne(
            { _id: req.params.id }
        );
        
        if (!user) {
            return res.status(404).json({ 
                errorCode: ErrorCode.userNotFound,
                message: 'Pengguna tidak ditemukan' });
            }

        // Find user by ID and update it
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { imgUrl, updatedAt},
                { new: true }
            );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




