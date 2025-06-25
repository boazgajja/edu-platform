import mongoose from "mongoose";

const hashtagSchema = new mongoose.Schema({
  tag:{type:String, required:true},
  
}, { timestamps: true });

const Hashtag= mongoose.model("Hashtag", hashtagSchema);

export default Hashtag;