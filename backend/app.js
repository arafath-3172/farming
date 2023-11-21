const mongoose = require('mongoose');
const DataModel = require('./models/dataModel');
const cors = require('cors'); // Import the 'cors' middleware

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
  app.use(cors());


  const formDataSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    value: Number,
  });
  
  // Create a Mongoose model based on the schema
  const FormDataModel = mongoose.model('FormData', formDataSchema);
  
  // Middleware to parse incoming JSON data
  app.use(bodyParser.json());
  

  app.get('/api/last20', async (req, res) => {
    try {
      const last20Data = await DataModel.find().sort({ timestamp: -1 }).limit(20);
      res.json(last20Data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  // Route to handle POST requests containing form data
  app.post('/api', async (req, res) => {
    // Access the form data from req.body
    const formData = req.body;
    console.log("working")
    try {
      // Create a new document using the FormDataModel
      const newFormData = new FormDataModel(formData);
  
      // Save the document to the MongoDB database
      await newFormData.save();
  
      // Send a response
      res.json({ message: 'Data received and saved successfully' });
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });