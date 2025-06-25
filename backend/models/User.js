// import mongoose from "mongoose";

// const CourseSchema = new mongoose.Schema({
//   title: String,
//   progress: Number,
//   totalLessons: Number,
//   completedLessons: Number,
// });

// const PointsHistorySchema = new mongoose.Schema({
//   day: String,
//   points: Number,
// });

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true }, // Add email field
//   name: { type: String, required: true },
//   imageUrl: String,
//   totalPoints: Number,
//   rank: String,
//   memberSince: String,
//   courses: [CourseSchema],
//   pointsHistory: [PointsHistorySchema],
// });

// const User = mongoose.model("User", UserSchema);
// export default User; // Use ES module export

// models/User.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'recruiter', 'admin'],
    default: 'student'
  },
  contributedQuestions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  completedAssessments: [{
    assessment: {
      type: Schema.Types.ObjectId,
      ref: 'Assessment'
    },
    score: Number,
    completedAt: Date
  }],
  dailyPoints: {
    type: Map,
    of: Number,
    default: () => new Map()
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export as default
const User = mongoose.model('User', userSchema);
export default User;
