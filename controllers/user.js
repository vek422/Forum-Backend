import User from "../models/Users.js";

export const getUser = async (req, res) => {
  const { userId } = req.params;
  const requestedUser = await User.findById(userId).populate([
    "threads",
    "comments",
  ]);
  if (requestedUser) {
    delete requestedUser.password;
    return res.status(200).send(requestedUser);
  }
};
