import mongoose from 'mongoose';

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
    });

    // export the model
    export default mongoose.model('Order', orderSchema);