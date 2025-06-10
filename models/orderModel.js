import mongoose from 'mongoose';
import { getJakartaTime } from '../utils/timezone.js';

const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    outlet:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Outlet'
        },
    items:[{
            stock: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Stock',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                default: 0,
                required: true
            },
            price: {
                type: Number,
                default: 0,
                required: true,
            },
            accepted: {
                type: Boolean,
                default: false,
            }
        }],
    total: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        enum: ['ordered', 'processed', 'ontheway', 'accepted', 'returned', 'failed'],
        default: 'ordered'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Boolean,
        default: null
    },
    deletedBy: {
        type: String,
        default: null
    }
    });

    // Update timestamp on save
    orderSchema.pre('save', function (next) {
        this.updatedAt = getJakartaTime();
        next();
    });

    // export the model
    export default mongoose.model('Order', orderSchema);