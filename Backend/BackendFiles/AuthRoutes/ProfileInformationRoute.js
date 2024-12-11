const express = require("express");
const router = express.Router();
const Profile = require("../Models/ProfileInfromation.js"); // Assuming Profile is the Mongoose model

// POST endpoint to save or update user information
router.post("/user-info", async (req, res) => {
  const { username, gender, dob, age, weight, height, blood, email } = req.body;

  try {
    // Save or update user information
    const updatedProfile = await Profile.findOneAndUpdate(
      { email }, // Search for a document with the provided email
      { username, gender, dob, age, weight, height, blood }, // Update these fields
      { new: true, upsert: true } // Create if not exists, return updated document
    );

    res.status(200).json({
      message: "User information saved or updated successfully!",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to save or update user information",
      details: error.message,
    });
  }
});
// Add a new GET endpoint to fetch user information
router.get("/user-info", async (req, res) => {
  const { email } = req.query;

  try {
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch user information",
      details: error.message,
    });
  }
});


module.exports = router;