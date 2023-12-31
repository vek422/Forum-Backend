import Subforum from "../models/SubForum.js";
import User from "../models/Users.js";
import Thread from "../models/Thread.js";
export const createSubForum = async (req, res) => {
  try {
    const { name, description, createdBy, picturePath } = req.body;

    const newSubForum = await Subforum.create({
      name,
      description,
      picturePath,
      createdBy,
    });
    await User.findByIdAndUpdate(createdBy, {
      $push: { subForum: newSubForum._id },
    });
    res.status(200).json({ savedSubForum: newSubForum });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getSubForum = async (req, res) => {
  try {
    const { subForumId } = req.params;

    const subForum = await Subforum.findById(subForumId)
      .populate("createdBy", ["firstName", "lastName"])
      .populate("members", ["firstName", "lastName"])
      .populate({
        path: "threads",
        populate: [
          { path: "user", model: "User" },
          { path: "subForum", model: "Subforum" },
        ],
      })
      .populate("followers", ["firstName", "lastName"]);
    console.log(subForum);
    res.status(200).json({ subForum: subForum });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const postSubForumThread = async (req, res) => {
  try {
    const { title, body, subForumId, picturePath } = req.body;
    const newThread = await Thread.create({
      title,
      body,
      subForum: subForumId,
      picturePath,
    });
    await Subforum.findByIdAndUpdate(subForumId, {
      $push: { threads: newThread._id },
    });
    res.status(200).json(newThread);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
