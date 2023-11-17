const mongoose = require("mongoose");

const tds_sensor = new mongoose.Schema({
    time:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    }
    // categoryname:{
    //     type:String,
    //     required:true
    // },
    // img:{
    //     type:String,
    //     required:true
    // }
})

module.exports = mongoose.model("db",tds_sensor);