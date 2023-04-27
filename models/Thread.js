import mongoose from "mongoose";
const ThreadSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String, default: "" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    picturePath: { type: String, default: "" },
    likes: { type: Map, of: Boolean },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, default: [], ref: "Comment" },
    ],
  },
  {
    timestamps: true,
  },
);
const Thread = mongoose.model("Thread", ThreadSchema);
export default Thread;
