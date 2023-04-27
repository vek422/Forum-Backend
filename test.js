import User from "./models/Users.js";
import Thread from "./models/Thread.js";
import Comment from "./models/Comments.js";
export async function test(req, res) {
  // const parent = await Comment.findById("643cc99ff71be770d2adcc5c");
  // const child = await Comment.findById("643cca07084a7364b701b468");
  // const updated = await Comment.updateOne(
  //   { _id: parent._id },
  //   { $push: { child: child._id } },
  // );
  const requested = await Comment.find()
    .populate("child")
    .populate("user")
    .limit(1);
  // const
  // savedComment = await testComment.save();
  res.send(requested);
}
