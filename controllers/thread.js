import Thread from "../models/Thread.js";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

/**
 * Create Thread
 */
export const postThread = async (req, res) => {
  try {
    const { title, body, userId, picturePath } = req.body;
    const newThread = new Thread({
      title,
      body,
      user: userId,
      picturePath,
    });
    const savedThread = await newThread.save();
    const updated = await User.updateOne(
      { _id: userId },
      { $push: { threads: savedThread._id } },
    );
    res.status(200).json(savedThread);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const getThreads = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const threads = await Thread.find()
      .populate("user", ["firstName", "lastName", "picturePath"])
      .populate("subForum")
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Thread.countDocuments();
    const totalPages = Math.ceil(count / limit);

    res.json({
      threads,
      totalPages: totalPages,
      hasNextPage: Boolean(parseInt(page) < totalPages),
      nextPage: Boolean(parseInt(page) < totalPages)
        ? parseInt(page) + 1
        : null,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const getThread = async (req, res) => {
  try {
    const { id } = req.params;
    const requestedThread = await Thread.findById(id)
      .populate("user", ["firstName", "lastName", "picturePath"])
      .populate({
        path: "comments",
        populate: [
          { path: "user", model: "User" },
          { path: "child", populate: { path: "user", model: "User" } },
        ],
      })
      .populate("subForum");
    if (!requestedThread) {
      return res.status(404).json({ msg: "Not Found!" });
    }
    res.status(200).send(requestedThread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const saveThread = async (req, res) => {
  try {
    const { threadId, userId } = req.body;
    const reqUser = await User.findById(userId);
    if (reqUser.saved.includes(threadId)) {
      return res.status(304).json({ msg: "Already Saved" });
    }
    const updateUser = await User.updateOne(
      { _id: userId },
      { $push: { saved: threadId } },
    );
    return res.status(200).json({ msg: "updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getSavedThreads = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const requstedUser = await User.findById(userId).populate({
      path: "saved",
      populate: { path: "user", model: "User" },
    });
    const savedThread = requstedUser.saved;
    console.log(savedThread);
    return res.status(200).json({ saved: savedThread });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
