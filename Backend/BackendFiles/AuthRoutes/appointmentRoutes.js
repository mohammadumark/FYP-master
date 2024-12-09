// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/appointments', async (req, res) => {
  try {
    const { doctorId, patientId, name, doctorName, date, time, location, message } = req.body;

    const newAppointment = new Appointment({
      doctorId,
      patientId,
      name,
      doctorName,
      date,
      time,
      location,
      message,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment created successfully', data: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
});

module.exports = router;
