import mongoose from 'mongoose';
import { getJakartaTime } from '../utils/timezone.js';

const productSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    imgUrl: {
        type: String,
        default: 'https://placebear.com/250/250',
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    },
    ingredients: [{
        stock: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock',
            required: true
        },
        qty: {
            type: Number,
            default: 0,
            required: true
        }
    }],
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
productSchema.pre('save', function (next) {
    this.updatedAt = getJakartaTime();
    next();
});

// export the model
export default mongoose.model('Product', productSchema);



