const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to create a JWT token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Helper function to return user data without the password
const publicUser = (user) => ({
  id: user._id.toString(),
  username: user.username,
  email: user.email,
});

// REGISTER
// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. Hash password
    const salt = await bcrypt.hash(password, 10);

    // 4. Create the user
    const user = await User.create({
      username,
      email,
      password: salt,
    });

    // 5. Return success without password
    res.status(201).json({
      message: "User registered successfully",
      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT
    const token = createToken(user._id);

    // 5. Return token and public user data
    res.json({
      message: "Login successful",
      token,
      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/auth/me
const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, me };
