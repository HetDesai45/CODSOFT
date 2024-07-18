const express = require("express");
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserJobHistory } = require("../Controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.get("/allusers", allUsers);
router.get("/user/:id", singleUser);
router.put("/user/edit/:id", editUser);
router.delete("/user/delete/:id", deleteUser);
router.post("/user/jobhistory", createUserJobHistory);
module.exports = router;
