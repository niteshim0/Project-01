const express = require("express");
const app = express();
const router = express.Router();
const PORT = 8000;

const userRouter = require("./routes/user");
const {connectMongoDB} = require("./connection");
const { logReqRes } = require("./middlewares");

//Establishing the Connection with MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/project-01")
.then(() => {console.log("MongoDB connected!")});



//middlewares
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users",userRouter);
app.listen(PORT,()=>console.log(`Server started at ${PORT}`));





