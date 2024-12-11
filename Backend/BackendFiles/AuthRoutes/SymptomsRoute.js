const express = require('express');
const router = express.Router();
const Symptom = require('../Models/Symtoms');
const User = require('../Models/UserModel');

// POST endpoint to add a new symptom
router.post('/add', async (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    // Create a new symptom
    const symptom = new Symptom({ name });
    await symptom.save();
    res.status(201).json({ message: 'Symptom added successfully', symptom });
  } catch (error) {
    if (error.code === 11000) { // Handle duplicate name error
      res.status(400).json({ error: 'Symptom name must be unique' });
    } else {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }
});

// GET endpoint to fetch all symptoms
router.get('/', async (req, res) => {
  try {
    const symptoms = await Symptom.find().select('name -_id'); // Fetch only the name field
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});


router.post('/match', async (req, res) => {
    const { email, symptoms } = req.body;
  
    if (!email || !symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: 'Email and symptoms are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      console.log('Received email:', email);
      console.log('Received symptoms:', symptoms);
  
      
  
      // Fetch matching symptoms from the database
      const matchedSymptoms = await Symptom.find({
        name: { $in: symptoms }
      });
  
      console.log('Matched Symptoms:', matchedSymptoms);
  
      // Update symptomsChecked status if any symptoms are matched or provided
      if (matchedSymptoms.length > 0 ) {
        user.symptomsChecked = true;
        await user.save();
      }
  
      res.status(200).json({
        message: 'Symptoms matched successfully',
        matchedSymptoms,
        symptomsChecked: user.symptomsChecked,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  module.exports=router;