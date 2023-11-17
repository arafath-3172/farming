const express = require('express');
const mongoose = require('mongoose');
const connectDB=require("./config/db");
const app = express();
const port = 5000;
connectDB();
// mongoose.connect('mongodb://localhost:27017/Farming');

// const phDataSchema = new mongoose.Schema({
//     time: Date,
//     value: Number,
// });

// const pHData = mongoose.model('pHData', phDataSchema);

app.use(express.json());
// app.use("/api",require("./route/user"));
app.post('/api/savePhData', async (req, res) => {
    const { time, value } = req.body;

    try {
        await pHData.create({ time, value });
        res.send('Data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(5000, () => {
    console.log(`Server listening at http://localhost:5000`);
});
