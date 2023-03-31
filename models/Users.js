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
    threads: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    department: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", UserSchema);
export default User;
