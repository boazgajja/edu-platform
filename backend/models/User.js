import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: String,
  progress: Number,
  totalLessons: Number,
  completedLessons: Number,
});

const PointsHistorySchema = new mongoose.Schema({
  day: String,
  points: Number,
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Add email field
  name: { type: String, required: true },
  imageUrl: String,
  totalPoints: Number,
  rank: String,
  memberSince: String,
  courses: [CourseSchema],
  pointsHistory: [PointsHistorySchema],
});

const User = mongoose.model("User", UserSchema);
export default User; // Use ES module export
