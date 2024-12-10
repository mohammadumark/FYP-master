// Appointment route
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const {
      name,
      doctorName,
      doctorId,
      date,
      time,
      location,
      message,
      patientId,
    } = req.body;

    if (!name || !doctorName || !doctorId || !date || !time || !patientId) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    const newAppointment = new Appointment({
      name,
      doctorName,
      doctorId,
      date,
      time,
      location,
      message,
      patientId,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully.",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment." });
  }
});

// Update appointment status (accepted/cancelled)
router.patch("/:appointmentId/status", async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body; // accepted or cancelled

    if (!["accepted", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true } // Return the updated appointment
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.status(200).json({
      message: `Appointment ${status} successfully.`,
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ error: "Failed to update appointment status." });
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
