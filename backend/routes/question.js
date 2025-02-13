import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Store a new question
router.post("/", async (req, res) => {
  try {
    const { question, options, answer } = req.body;

    if (!question || !options || !answer) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newQuestion = new Question({ question, options, answer });
    await newQuestion.save();

    res.status(201).json({ message: "Question saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
