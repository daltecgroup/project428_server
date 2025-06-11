import mongoose from 'mongoose';
import { getJakartaTime } from '../utils/timezone.js';

const attendaceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['clock-in', 'clock-out'],
    },
    imgUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Update timestamp on save
attendaceSchema.pre('save', function (next) {
    this.createdAt = getJakartaTime();
    next();
});

// export the model
export default mongoose.model('Attendance', attendaceSchema);



