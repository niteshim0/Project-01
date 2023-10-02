const express = require("express");
const { handleGetAllUsers,handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require("../controllers/user");
const router = express.Router();

//REST API
router.get("/" ,handleGetAllUsers)
      .post("/",handleCreateNewUser);

//finding the id and then making the changes
router
   .route("/:id")
   .get(handleGetUserById)
   .patch(handleUpdateUserById)
   .delete(handleDeleteUserById);

module.exports = router;