const mongoose = require('mongoose');
const UserImagesModel = new mongoose.Schema({
    email: 
    { type: String,
      required: true,
      unique: true 
    },
    image: 
    { type: Buffer,
      required: true
    }
}, {
    collection: 'UserImages' // Explicitly sets the collection name to 'LoginDetails'
});

module.exports = mongoose.model('UserImages', UserImagesModel);
