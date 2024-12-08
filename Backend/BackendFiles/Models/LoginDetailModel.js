const mongoose = require('mongoose');
const LoginDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // This stores the ObjectId of the referenced User document
        ref: 'User', // References the 'User' model
        required: true, // Ensures that this field is mandatory
    },
    loginTime: {
        type: Date,
        default: Date.now, // Automatically sets the current date and time when the document is created
    },
    ipAddress: {
        type: String, // Stores the IP address of the user at the time of login
        required: true,
    },
    deviceDetails: {
        type: String, // Optional field to store details about the device used to log in
    },
}, {
    collection: 'LoginDetails' // Explicitly sets the collection name to 'LoginDetails'
});

module.exports = mongoose.model('LoginDetail', LoginDetailsSchema);
