const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName:{
      type: String,
      required : true,
    },
    lastName:{
      type : String,
    },
    email:{
      type:String,
      required:true,
      unique : true,
    },
    jobTitle: {
      type:String
    },
    gender : {
      type : String,
    },
  },
  {timestamps:true},//take care of when a paticualar user is created and when it last updated
);

//Creating the model
const User = mongoose.model("user",userSchema);

module.exports = User;