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
    productCategorySchema.pre('save', function (next) {
        this.updatedAt = getJakartaTime();
        next();
    });

    // export the model
    export default mongoose.model('ProductCategory', productCategorySchema);



