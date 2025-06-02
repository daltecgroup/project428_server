import mongoose from 'mongoose';
import { Roles } from '../constants/roles.js';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: Array,
        default: [Roles.operator],
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    imgUrl: {
        type: String,
        default: null, // Replace with your default image URL
    },
    phone: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    lastSeen: {
        type: Date,
        default: Date.now,
    },
    });

    // export the model

    export default mongoose.model('User', userSchema);



