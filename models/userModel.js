import mongoose from 'mongoose';
import { getJakartaTime } from '../utils/timezone.js';
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
        default: getJakartaTime,
    },
    updatedAt: {
        type: Date,
        default: getJakartaTime,
    },
    lastSeen: {
        type: Date,
        default: getJakartaTime,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    deletedBy: {
        type: String,
        default: null
    }
});

// Update timestamp on save
userSchema.pre('save', function (next) {
    this.updatedAt = getJakartaTime();
    next();
});

// export the model

export default mongoose.model('User', userSchema);



