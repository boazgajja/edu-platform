import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./routes/userRoutes.js";
// import authRoutes from "./routes/auth.js";

import questionRoutes from "./routes/question.js"; // Import question routes

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes); 
// app.use("/api/chats", chat); 
app.use("/api/users",User);
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


