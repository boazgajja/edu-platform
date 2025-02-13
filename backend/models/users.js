import express from "express";
// import User from "./User"; // Import User model
import User from "../models/User"; 


const router = express.Router();

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

export default router;
