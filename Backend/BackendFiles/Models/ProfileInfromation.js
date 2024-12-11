// models/User.js
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  blood: { type: String, required: true },
  email: {
    type: String, required: true,unique: true
},
});

module.exports = mongoose.model("Profile", ProfileSchema);