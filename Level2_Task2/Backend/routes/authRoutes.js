const express = require("express");
const router = express.Router();
const { signup, signin, logout } = require("../Controllers/authController");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);

module.exports = router;
