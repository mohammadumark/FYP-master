const mongoose = require('mongoose');

// Define the schema
const SymptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate symptom names
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model('Symptom', SymptomSchema);