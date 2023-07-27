const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../../../controllers/users-controllers");

const router = express.Router();

router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

router.post("/users/logout", logoutUser);

router.get("/users/current", getCurrentUser);

module.exports = router;
