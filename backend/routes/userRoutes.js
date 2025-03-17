import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ Get user details by email
router.get("/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update user details (e.g., updating progress in a course)
router.put("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body; // Example: { totalPoints: 4000, rank: "Platinum" }

    const updatedUser = await User.findOneAndUpdate(
      { email }, // Find user by email
      { $set: updateData }, // Update the fields
      { new: true, runValidators: true } // Return updated user
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update a specific course progress by email & course ID
router.put("/users/:email/courses/:courseId", async (req, res) => {
  try {
    const { email, courseId } = req.params;
    const { progress, completedLessons } = req.body; // Example: { progress: 90, completedLessons: 11 }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the course and update progress
    const course = user.courses.id(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.progress = progress;
    course.completedLessons = completedLessons;

    await user.save(); // Save the updated document
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
