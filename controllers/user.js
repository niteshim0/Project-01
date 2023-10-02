const User = require("../models/user");

async function handleGetAllUsersinHTML(req,res){
  const  allDBUsers = await User.find({});
  const html = `
  <ul>
  ${allDBUsers.map((user)=>`<li>${user.firstName}</li>`).join("")}
  </ul>`
  return res.send(html);
}
async function handleGetAllUsers(req,res){
  const allDBUsers = await User.find({});
  return res.status(200).json(allDBUsers);
};

async function handleGetUserById(req,res){
  const user  = await User.findById(req.params.id);
  if(!user) return res.status(404).json({error : "user not found"});
  return res.status(200).json(user);
};

async function handleUpdateUserById(req,res){
  await User.findByIdAndUpdate(req.params.id,{lastName : "Changed"});
  return res.status(200).json({msg : "success"});
};

async function handleDeleteUserById(req,res){
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({msg : "success"});
};

async function handleCreateNewUser(req,res){
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
  return res.status(201).json({msg:"success",id:result._id});
}


module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
}