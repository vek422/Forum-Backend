import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import threadRoutes from "./routes/thread.js";

import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import {
  getSavedThreads,
  postThread,
  saveThread,
} from "./controllers/thread.js";
import { test } from "./test.js";
import { getComments, postComment } from "./controllers/comment.js";
import { getUser, searchUser } from "./controllers/user.js";
import {
  createSubForum,
  getSubForum,
  postSubForumThread,
} from "./controllers/subforum.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //this is the static route use for serving files directly
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
/**
 * ROUTES WITH FILES
 */
app.post("/auth/register", upload.single("picture"), register);
app.post(
  "/thread/postThread",
  verifyToken,
  upload.single("picture"),
  postThread,
);
app.post("/subforum/createforum", upload.single("picture"), createSubForum);
app.post("/subforum/postThread", upload.single("picture"), postSubForumThread);

/**
 * ROUTES
 */
app.get("/subforum/:subForumId", getSubForum);
app.get("/u/search/:text", searchUser);
app.get("/u/:userId", getUser);
app.use("/auth", authRoutes);
app.use("/thread", threadRoutes);
app.get("/test", test);
app.post("/postComment", postComment);
app.get("/getComments/:commentId", getComments);
app.post("/thread/saveThread", saveThread);
app.get("/getsavedThread/:userId", getSavedThreads);
/**
 * MongoDB Setup
 */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
    const userCollection = mongoose.connection.collection("users");
    userCollection.createIndex({
      firstName: "text",
      lastName: "text",
      picturePath: "text",
    });
  })
  .catch((err) => {
    console.log(err);
  });
