const mongoose = require('mongoose');

// Define the schema for the data
const dataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

// Create the model for the 'data' collection
const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;