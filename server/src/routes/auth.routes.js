const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { register, login, me } = require("../controllers/auth.controller");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/me", authMiddleware, me);

module.exports = router;
