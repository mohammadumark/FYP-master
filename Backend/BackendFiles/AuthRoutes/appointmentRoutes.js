const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const {
      name,
      doctorName,
      doctorId, // Get doctorId from the request body
      date,
      time,
      location,
      message,
      patientId,
    } = req.body;

    if (!name || !doctorName || !doctorId || !date || !time || !patientId) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      name,
      doctorName,
      doctorId, // Store the doctorId
      date,
      time,
      location,
      message,
      patientId,
    });

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();

    // Respond with success
    res.status(201).json({
      message: "Appointment created successfully.",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment." });
  }
});
// Fetch appointments by doctorId
router.get("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });

    if (!appointments.length) {
      return res.status(404).json({ error: "No appointments found for this doctor." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments." });
  }
});


module.exports = router;
