// imageUploadRoute.js
const express = require('express');
const multer = require('multer');
const ImageModel = require('../Models/UserImages'); // Adjust path as needed

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a valid image file (jpg, jpeg, or png)'));
    }
    cb(null, true);
  },
});

// Define the upload route

router.post('/upload-image', upload.single('image'), async (req, res) => {
  console.log('req.body:', req.body); // Log body contents
  console.log('req.file:', req.file); // Log file details
  try {
    const { email } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Check if the user already has an image and update if so
    const existingImage = await ImageModel.findOne({ email });
    if (existingImage) {
      existingImage.image = req.file.buffer; // Update existing image
      await existingImage.save();
    } else {
      const newImage = new ImageModel({
        email,
        image: req.file.buffer, // Store image as binary data
      });
      await newImage.save();
    }

    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// In your routes file
router.get('/load-image/:email', async (req, res) => {
  try {
      const { email } = req.params;
      const userImage = await ImageModel.findOne({ email });

      if (!userImage) {
          return res.status(404).json({ message: 'No image found for this email' });
      }

      // Convert binary image data to base64 for display in frontend
      const imageUrl = `data:image/jpeg;base64,${userImage.image.toString('base64')}`;
      res.status(200).json({ imageUrl });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// router.post('/upload-image', upload.single('image'), async (req, res) => {
//   console.log('req.body:', req.body); // Log body contents
//   console.log('req.file:', req.file); // Log file details
//   try {
//     const { email } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: 'No image file uploaded' });
//     }
//     const newImage = new ImageModel({
//       email,
//       image: req.file.buffer, // Store image as binary data
//     });

//     await newImage.save();
//     res.status(201).json({ message: 'Image uploaded successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



module.exports = router;
