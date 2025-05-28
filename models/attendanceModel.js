import mongoose from 'mongoose';

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
    imgUrl:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// export the model
export default mongoose.model('Attendance', attendaceSchema);



