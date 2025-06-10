import mongoose from 'mongoose';
import { getJakartaTime } from '../utils/timezone.js';

const toppingSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: [{
        stock: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            enum: ['weight', 'volume', 'pcs'],
            default: 'weight',
            required: true
        },
        price: {
            type: Number,
            default: 0,
            required: true
        },
        qty: {
            type: Number,
            default: 0,
            required: true
        }
    }],
    imgUrl: {
        type: String,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
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
toppingSchema.pre('save', function (next) {
    this.updatedAt = getJakartaTime();
    next();
});

// export the model
export default mongoose.model('Topping', toppingSchema);



