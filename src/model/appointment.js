const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required: true,
    },
    date:{
        type:String,//it has to be of type Date
        required:true
    },
    time:{
        type:String,
        required: true
    },
    issues:{
        type:String,
        required: true,
    },
    message:{
        type:String,
    }
});

module.exports = mongoose.model("appointment",appointmentSchema);