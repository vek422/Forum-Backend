import { Router } from "express";
import { getThreads, getThread } from "../controllers/thread.js";
const router = Router();
router.get("/getThreads", getThreads);
router.get("/getThread/:id", getThread);

export default router;
