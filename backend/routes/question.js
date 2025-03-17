import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// POST: Add a new question
router.post("/", async (req, res) => {
  try {
    const { question, options, answer,name } = req.body;

    if (!question || options.length !== 4 || !answer) {
      return res.status(400).json({ error: "All fields are required, and options must be 4" });
    }

    const newQuestion = new Question({ question, options, answer,name });
    await newQuestion.save();

    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error("Server error:", error); 
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// GET: Fetch questions (all or filtered by name)
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    
    // If name is provided, filter questions by that name
    // Otherwise, return all questions
    const filter = name ? { name } : {};
    
    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});
// DELETE: Remove a question
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedQuestion = await Question.findByIdAndDelete(id);
    
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
