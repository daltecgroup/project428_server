import mongoose from 'mongoose';

const stockHistorySchema = new mongoose.Schema({
    stock: {
        type: String,
        required: true,
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

    // export the model

    export default mongoose.model('StockHistory', stockHistorySchema);



