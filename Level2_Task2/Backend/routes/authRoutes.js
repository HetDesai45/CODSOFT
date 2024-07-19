const express = require("express");
const router = express.Router();
const { signup, signin, logout, userProfile } = require("../Controllers/authController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/me", isAuthenticated("token"), userProfile);

module.exports = router;
