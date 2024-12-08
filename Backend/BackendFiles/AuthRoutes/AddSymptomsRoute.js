// routes/symptoms.js

const express = require('express');
const router = express.Router();
const Symptom = require('../Models/SymptomsListModel');

// Seeding endpoint to populate the database with initial symptoms
router.post('/seed-symptoms', async (req, res) => {
  const symptoms = [
    { name: "Weakness and Tiredness" },
    { name: "Pain in the Abdomen" },
    { name: "Swelling of the abdomen due to a build-up of fluid" },
    { name: "Pain in the right shoulder" },
    { name: "Appetite loss and feeling sick" },
    { name: "Weight loss" },
    { name: "Yellowing of the skin and eyes" }    
  ];

  try {
    await Symptom.insertMany(symptoms);
    res.status(201).send('Symptoms added successfully!');
  } catch (error) {
    res.status(500).send('Failed to add symptoms: ' + error.message);
  }
});

// Route to match selected symptoms with the database
router.post('/match-symptoms', async (req, res) => {
  const { symptoms } = req.body; // Expecting an array of symptom names from the frontend

  if (!symptoms || symptoms.length === 0) {
    return res.status(400).json({ error: "No symptoms provided" });
  }

  try {
    // Find the matching symptoms in the database
    const matchingSymptoms = await Symptom.find({ name: { $in: symptoms } });
    // If all selected symptoms match with the database, proceed
    if (matchingSymptoms.length >0) {
      return res.status(200).json({ message: "Symptoms matched!", matched: true, matchedSymptom:matchingSymptoms.map(Symptom => Symptom.name)});
    } else {
      return res.status(200).json({ message: "Symptoms did not match", matched: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;

