import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

    // export the model
    export default mongoose.model('ProductCategory', productCategorySchema);



