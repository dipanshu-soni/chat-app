const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const getAllUsers = require("../controllers/userController");

// Returns all users except the logged-in user.
router.get("/users", authMiddleware, getAllUsers);
module.exports = router;