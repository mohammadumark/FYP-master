const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// var http = require('http');
const authRouter = require('./BackendFiles/AuthRoutes/AuthFile');
const symptomRoutes = require('./BackendFiles/AuthRoutes/AddSymptomsRoute');
const UploadImagesRoute=require('./BackendFiles/AuthRoutes/UploadImagesRoute');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.JWT_SECRET);


const port = process.env.PORT ;

app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Use the authentication router
app.use('/api/auth', authRouter); // This line mounts the auth router
app.use('/api/symptoms',symptomRoutes);
app.use('/api/upload', UploadImagesRoute);
// app.use('/api/get-name, Up);



//create a database connection:
mongoose.connect('mongodb://localhost:27017/lt')
.then(()=>console.log("DataBase Connected"))
.catch(err => console.log("mongodb connection error:", err));

app.listen(port, () => {
    console.log("server is runnning on 5001 port");
});

















