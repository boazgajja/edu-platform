import mongoose from "mongoose";

const chatschema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Online", "Offline"], // Only allows "Online" or "Offline"
    default: "Offline" 
  },
  unreadCount: { type: Number, default: 0 },
});

const User = mongoose.model("User", chatschema);
export default User;
