import { query } from "express";
import User from "../models/Users.js";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestedUser = await User.findById(userId).populate([
      "threads",
      "comments",
    ]);
    if (requestedUser) {
      delete requestedUser.password;
      return res.status(200).send(requestedUser);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { text } = req.params;
    console.log(text);
    const users = await User.find({
      $or: [
        { firstName: { $regex: text, $options: "i" } },
        { lastName: { $regex: text, $options: "i" } },
      ],
    });

    res.json({ user: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
