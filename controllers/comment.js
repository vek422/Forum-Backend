import Comment from "../models/Comments.js";
import Thread from "../models/Thread.js";
import User from "../models/Users.js";

export const postComment = async (req, res) => {
  try {
    const { threadId, parentId = null, content, userId } = req.body;

    // creating document entry for comment
    const comment = new Comment({
      user: userId,
      thread: threadId,
      content: content,
      parent: parentId,
    });
    const savedComment = await comment.save();
    console.log(savedComment);
    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        $push: { comments: savedComment._id },
      },
    );

    if (parentId) {
      const updatedComment = await Comment.updateOne(
        { _id: parentId },
        { $push: { child: savedComment._id } },
      );

      res.json({ msg: "updated with parent", updatedComment });
    } else {
      const updatedThread = await Thread.updateOne(
        {
          _id: threadId,
        },
        {
          $push: { comments: savedComment._id },
        },
      );
      res.json({ msg: "updated without parent", updatedThread });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const getComments = async (req, res) => {
  try {
    const { commentId } = req.params;
    console.log(commentId);
    const requstedComment = await Comment.findOne({ _id: commentId }).populate(
      "child",
    );
    console.log(requstedComment);
    const { child } = requstedComment;
    res.json({ child: child });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
