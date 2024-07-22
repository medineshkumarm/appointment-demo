const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');

require("dotenv").config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;


// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("db connected.."))
  .catch((err) => console.log(err));

//importing  all my db schema
const Customer = require("./model/customer");
const Appointment = require("./model/appointment");
const Admin = require("./model/admin");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

app.use(session({
    secret: "askdljasdjasd",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: MONGODB_URI})
}));


/**
 * all my backend logic starts here:
 * using async function for each logic
 */

async function createDefaultAdmin(){
    const admin = await Admin.findOne({username: "admin"});
    
    if(!admin){
        const newAdmin = new Admin({
            username: "admin",
            password: "admin@123"
        });
        await newAdmin.save();
    }
};

// createDefaultAdmin();

// const isAuthenticated = (req,res,next)=> {
//     if(req.session.userId){
//         return next();
//     }
//     res.redirect("/login");
// }


/**
 * API routes logic down below
 */

app.post("/api/appointment",async(req,res)=> {
    //get the form elements

    //check if customer exists in db 

    //otherwise create a new customer and save

    //create an appointment then save in db

    //show the response in console
});


app.get("/api/appointments",async(req,res)=> {
    //find all the appoints from db

    // send the data as json
});


/**
 * for serving static HTML files
 * we will use a form page .ie.index.html
 * and an admin page called admin.html
 * then finally a login page for admin ie.login.html
 * 
 * Summary: three static pages
 * 1. index.html
 * 2. admin.html
 * 3. login.html
 */

app.get("/",(req,res)=> {
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.get("/login",(req,res)=> {
    res.sendFile(path.join(__dirname,"public","login.html"));
});

/**
 * admin auth logic: session management ie. login and logout feature for admin
 * admin panel consist a list of all appointments made upto date
 */
app.post("/login",async(req,res)=> {
    const {username,password} = req.body;
    const admin = await Admin.findOne({username});

    if(admin && password == "admin@123"){
        req.session.userId = admin._id;
        res.redirect("/admin");
    }else{
        res.redirect("/login");
    }
});

app.post("/logout",(req,res)=> {
    req.session.destroy(err => {
        if(err){
             return res.redirect("/admin");
        }
        res.redirect("/login");
    });
});

// make sure to add auth middleware check
app.get("/admin",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","admin.html"));

})