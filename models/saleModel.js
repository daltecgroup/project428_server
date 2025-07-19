import mongoose from 'mongoose';
import { getJakartaTime } from '../utils/timezone.js';

const saleSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    items: [{ 
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
        },
        type: {type: String},
        name: {type: String},
        qty: {type: Number},
        price: {type: Number},
        finalPrice: {type: Number},
        totalFinalPrice: {type: Number},
        discount: {type: Number},
        saving: {type: Number},
        totalSaving: {type: Number}
    }],
    finalPrice: {
        type: Number,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    saving: {
        type: Number,
        default: 0,
        required: true,
    },
    paid: Number,
    change: {
        type: Number,
        default: 0
    },
    outlet:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Outlet',
            required: true
    },
    cashier: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
    paymentMethod: {
        type: String,
        default: 'cash'
    },
    promoUsed: {
        type: Number,
        default: 0
    },
    printHistory:[{
        author: String,
        time: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

    // Update timestamp on save
    saleSchema.pre('save', function (next) {
        this.updatedAt = getJakartaTime();
        next();
    });

    // export the model
    export default mongoose.model('Sale', saleSchema);



