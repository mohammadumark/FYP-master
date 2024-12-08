// models/Symptom.js

const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
},{
  collection: 'Symptoms' 
}
);

module.exports = mongoose.model('Symptom', SymptomSchema);
