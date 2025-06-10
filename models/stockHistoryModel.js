import mongoose from 'mongoose';
import { getJakartaTime } from '../utils/timezone.js';

const stockHistorySchema = new mongoose.Schema({
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true,
    },
    author: {
        userRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true
        }
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Update timestamp on save
stockHistorySchema.pre('save', function (next) {
    this.updatedAt = getJakartaTime();
    next();
});

// export the model

export default mongoose.model('StockHistory', stockHistorySchema);



