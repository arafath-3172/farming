const express = require("express");
const app = express();
const router = express.Router();
const tds_data = require("../Models/db");


//inserting the user data into mongodb
router.post("/db", async (req, res) => {
    const { timestamp, value} = req.body.Credentials;

   
    const data = {
        timestamp: timestamp,
        value: value
    }
    await tds_data.insertMany([data]);
})
module.exports = router;