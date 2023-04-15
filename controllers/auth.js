import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

/**
 * REGISTER USER
 */

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      department,
      year,
    } = req.body;
    console.log(req.body);
    console.log(email);
    const isUserExists = await User.find({ email: email });
    console.log(isUserExists);
    if (isUserExists.length != 0) {
      res.status(403).json({ msg: "User Already Exist" });
      return;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      department,
      year,
      threads: [],
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

/**
 * LOGGING IN
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "User Does Not Exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid Credentials" });
    console.log(user.password);
    delete user.password;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRETE);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refreshUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const updatedUser = await User.findOne({ _id: userId });
    delete updatedUser.password;
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log(err);
  }
};
