import mongoose from 'mongoose';
import { getJakartaTime } from '../utils/timezone.js';

const updateSchema = new mongoose.Schema({
    operation: {
        type: String,
        required: true,
        unique: true,
    },
    updatedAt: {
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
    updateSchema.pre('save', function (next) {
        this.updatedAt = getJakartaTime();
        next();
    });

    // export the model
    export default mongoose.model('Update', updateSchema);



