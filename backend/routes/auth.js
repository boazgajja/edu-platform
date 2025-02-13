import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// **User Registration Route**

router.post("/register", async (req, res) => {
    try {
        const { fullname, username, email, password, age } = req.body;
        console.log("Incoming request data:", req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Hashed Password:", hashedPassword);

        // Save User
        const newUser = new User({ fullname, username, email, password: hashedPassword, age });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
  try {
      const { username, password } = req.body;
      console.log("🔑 Login Attempt:", { username, password });

      const user = await User.findOne({ username });
      console.log("🔍 User Found:", user);

      if (!user) {
          console.log("❌ User Not Found");
          return res.status(400).json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("✅ Password Match:", isMatch);

      if (!isMatch) {
          console.log("❌ Invalid Password");
          return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      console.log("🔑 Token Generated:", token);

      res.json({ success: true, token, user: { username: user.username } });

  } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ success: false, message: "Login failed" });
  }
});



export default router;
