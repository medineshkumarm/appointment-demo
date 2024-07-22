const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:4,
    },
    age: {
        type: Number,
        min: 1,
        max: 99,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:4,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    phone: {
        type: Number,
        maxLength:10,
        required:true,
    },
    altPhone:{
        type:Number,
        maxLength:10
    },
    createdAt:{
        type:Date,
        default: ()=> new Date()
    }

});

// const Customer = mongoose.model('Customer',customerSchema);
module.exports = mongoose.model('customer', customerSchema);