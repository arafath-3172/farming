const mongoose = require('mongoose');
const DataModel = require('./models/dataModel');

mongoose
  .connect("mongodb://127.0.0.1:27017/capstone")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Error");
    console.log(err);
  });

  
  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();
  const port = 8080;
  
  // Middleware to parse incoming form data
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // Route to handle the incoming data
  app.post('/api', (req, res) => {
    // Access the form data from req.body
    const formData = req.body;
  
    // Process the formData as needed
    console.log('Received data:', formData);
  
    // Send a response (you can customize this based on your needs)
    res.json({ message: 'Data received successfully' });
  });
  
  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });