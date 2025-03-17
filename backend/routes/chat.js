import express from "express";
import Chat from "../models/chat";

const router = express.Router();
//post
router.post("/", async (req, res) => {
    try {
      const { question, options, answer } = req.body;
  
      if (!question || options.length !== 4 || !answer) {
        return res.status(400).json({ error: "All fields are required, and options must be 4" });
      }
  
      const newQuestion = new Question({ question, options, answer });
      await newQuestion.save();
  
      res.status(201).json({ message: "Question added successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

//get
router.get("/", async (req, res) => {
    try {
      const questions = await Chat.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });
  
  export default router;