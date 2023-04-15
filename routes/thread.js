import { Router } from "express";
import { getThreads } from "../controllers/thread.js";
const router = Router();
router.get("/getThreads", getThreads);

export default router;
