const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    symptomsChecked: {
        type: Boolean,
        default: false,  // Default to false, meaning the user hasn't checked symptoms
    },
});

module.exports = mongoose.model('PatientUser', UserSchema);
