const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://dineshkumarminfomatronics:gtn2CDlJ3RJPrSlR@cluster0.ioneyxl.mongodb.net/sample";
// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("db connected.."))
  .catch((err) => console.log(err));

const Admin = require("./src/model/admin");
async function getAdminName(username, password){
    const admin = await Admin.findOne({username});
    if(admin && password == "admin@123"){
        console.log("success");

    }else{
        console.log("failure");
    }
}
getAdminName("admin","admin@123");