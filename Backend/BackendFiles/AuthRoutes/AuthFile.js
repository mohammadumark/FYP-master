const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user && user.isVerified) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        if (user && !user.isVerified){
        // Generate verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 
            user.verificationCode = verificationCode;
            user.otpExpiry = otpExpiry;
            // Resend verification code
            await sendVerificationCode(user, verificationCode);
            await user.save();
            return res.status(200).json({ msg: 'Verification code resent to email' });
        }
        // If the user does not exist, create a new user with verification code and otpExpiry
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 60 * 1000);
        // Create new user but do not save password yet
        user = new User({ name, email, password, verificationCode,otpExpiry, isVerified:false });
        // Send email with verification code
        await sendVerificationCode(user, verificationCode);
        await user.save();
        res.status(200).json({ msg: 'Verification code sent to email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Verification Route
router.post('/verify', async (req, res) => {
    const { email, code } = req.body;
    try {
        // Find user by email
        let user = await User.findOne({ email });

        if (!user) {
            console.log("user not found");
            return res.status(400).json({ msg: 'User not found' });
        }
        // Check if verification code matches
        if (user.verificationCode !== code) {
            return res.status(400).json({ msg: 'Invalid verification code' });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ msg: 'OTP has expired. Please request a new one.' });
        }
        // Hash the password and save the user
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.verificationCode = null; // Clear the verification code
        user.isVerified = true; // Set user as verified
        user.otpExpiry = null;
        await user.save();

        // Generate JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//resendOtp Route
router.post('/resend-otp', async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 60 * 1000); // OTP expires in 1 minute

        user.verificationCode = verificationCode;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendVerificationCode(user, verificationCode);
        res.status(200).json({ msg: 'New verification code sent to email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Fetch Name by Email
 router.get('/get-name', async (req, res) => {
    try {
      const email = req.query.email; // Get email from query params
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ name: user.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

//Login Route
const LoginDetail = require('../Models/LoginDetailModel');
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Save login details
        const loginDetail = new LoginDetail({
            userId: user.id,
            ipAddress: req.ip, // Example: req.ip or you can use a library to get the actual IP
            deviceDetails: req.headers['user-agent'], // Example: stores browser or device info
            // loginTime: Date.now(),
        });

        await loginDetail.save();

        res.json({ token , symptomsChecked: user.symptomsChecked, });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Function to send verification code email
async function sendVerificationCode(user, code) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or your email provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Liver Tumor Vision-->Email Verification Code',
        html: `
            <h2>Hello ${user.name},</h2>
            <p>Your verification code is: <strong>${code}</strong></p>
        `,
    };
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    
}
module.exports = router;