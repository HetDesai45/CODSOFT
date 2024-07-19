const express = require("express");
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserJobHistory } = require("../Controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("Hello");
});


router.get("/allusers", isAuthenticated, isAdmin, allUsers);
router.get("/user/:id", isAuthenticated, singleUser);
router.put("/user/edit/:id", isAuthenticated, editUser);
router.delete("/user/delete/:id", isAuthenticated, isAdmin, deleteUser);
router.post("/user/jobhistory", isAuthenticated, createUserJobHistory);
module.exports = router;
