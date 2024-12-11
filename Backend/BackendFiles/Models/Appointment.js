// Appointment model
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    doctorName: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, default: "Not provided" },
    message: { type: String, default: "No message" },
    patientId: { type: String, required: true },
    email: { type: String, required: true }, // Added email
    status: { type: String, enum: ["pending", "accepted", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
