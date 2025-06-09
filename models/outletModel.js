import mongoose from 'mongoose';

const outletSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    operator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    spvarea: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    address: {
        province: String,
        regency: String,
        district: String,
        village: String,
        street: String,
    },
    imgUrl: {
        type: String,
        default: '',
    },
    foundedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
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
outletSchema.pre('save', function (next) {
    this.updatedAt = getJakartaTime();
    next();
});

// export the model
export default mongoose.model('Outlet', outletSchema);



