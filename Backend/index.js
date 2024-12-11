// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./BackendFiles/AuthRoutes/AuthFile');
const symptomRoutes = require('./BackendFiles/AuthRoutes/SymptomsRoute');
const UploadImagesRoute = require('./BackendFiles/AuthRoutes/UploadImagesRoute');
const appointmentRoutes = require('./BackendFiles/AuthRoutes/appointmentRoutes');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;  // Ensure the correct port is being used

app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Use the authentication router
app.use('/api/auth', authRouter);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/upload', UploadImagesRoute);
app.use('/api/appointments', appointmentRoutes); 

// Create a database connection
mongoose.connect('mongodb://localhost:27017/lt')
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
