import mongoose from 'mongoose';

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
    });

    // export the model

    export default mongoose.model('Update', updateSchema);



