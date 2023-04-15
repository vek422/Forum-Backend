import mongoose from "mongoose";
const ThreadSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String, default: "" },
    userId: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    picturePath: { type: String, default: "" },
    userPicturePath: { type: String, require: true },
    likes: { type: Map, of: Boolean },
    comments: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);
const Thread = mongoose.model("Thread", ThreadSchema);
export default Thread;
