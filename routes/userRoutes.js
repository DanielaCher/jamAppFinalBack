// backend/routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// POST route to add a new user
router.post("/add-user", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

module.exports = router;
