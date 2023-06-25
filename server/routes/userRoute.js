const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
// "protect" middleware in this route, gives getUser route access to "user" info "req.user = user"
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);

module.exports = router;
