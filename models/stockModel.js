import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    stockId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        default: 'weight'
    },
    price: {
        type: Number,
        required: true,
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
    });

    // export the model

    export default mongoose.model('Stock', stockSchema);



