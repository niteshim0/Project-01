const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const route = express.Router();
const PORT = 8000;

//Establishing the Connection with MongoDB
mongoose
.connect("mongodb://127.0.0.1:27017/project-01")
.then(()=>console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB Error",err));


//Defining the Schema
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

//middlewares
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=> {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()} : ${req.ip} ${req.method} : ${req.path}\n`,
    (err,data) => {
      next();
    }
  );
});
//Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
//Routes

app.get("/users",async(req,res)=> {
  const  allDBUsers = await User.find({});
  const html = `
  <ul>
  ${allDBUsers.map((user)=>`<li>${user.firstName}</li>`).join("")}
  </ul> `
});

//REST API
app.get("/api/users" , async(req,res)=>{
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

app.post("/api/users",async (req,res)=>{
  const body  = req.body;
  if(!body||!body.firstName||!body.lastName||!body.email||!body.gender||!body.jobTitle){
    return res.status(400).json({msg:"All fields are required"});
  }

  const result = await User.create({
     firstName : body.firstName,
     lastName  : body.lastName,
     email : body.email,
     gender : body.gender,
     jobTitle : body.jobTitle,
  });
  console.log("result",result);
  return res.status(201).json({msg:"success"});
});

//finding the id and then making the changes
app
   .route("/api/users/:id")
   .get( async(req,res) => {
     const user  = await User.findById(req.params.id);
     if(!user) return res.status(404).json({error : "user not found"});
     return res.status(200).json(user);
   })
   .patch( async(req,res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName : "Changed"});
    return res.status(200).json({msg : "success"});
   })
   .delete( async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({msg : "success"});
   });

app.listen(PORT,()=>console.log(`Server started at ${PORT}`));





