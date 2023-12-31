import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    threads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    department: {
      type: String,
    },
    year: {
      type: String,
    },
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        default: [],
      },
    ],
    subForum: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subforum" }],
    joinedSubForum: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subforum" }],
  },
  { timestamps: true },
);
const User = mongoose.model("User", UserSchema);
export default User;
