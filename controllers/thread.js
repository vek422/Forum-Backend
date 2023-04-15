import Thread from "../models/Thread.js";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

/**
 * Create Thread
 */
export const postThread = async (req, res) => {
  try {
    const {
      title,
      body,
      userId,
      firstName,
      lastName,
      picturePath,
      userPicturePath,
    } = req.body;
    const newThread = new Thread({
      title,
      body,
      userId,
      firstName,
      lastName,
      picturePath,
      userPicturePath,
    });
    const savedThread = await newThread.save();
    // const user = await User.findById(userId);
    const updated = await User.updateOne(
      { _id: userId },
      { $push: { threads: savedThread._id } },
    );
    console.log(updated);
    res.status(304).json(savedThread);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

/**
 * GetThreads
 *  1.getThreads - Feed threads
 *  2.getThreads/u/:useriD - userThreads req.params
 *  3.getThread/:threadId - detailed Thread view
 */

export const getThreads = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const threads = await Thread.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
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
