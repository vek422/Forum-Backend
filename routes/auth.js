import { Router } from "express";
import { login, refreshUser } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
const router = Router();
router.post("/login", login);
router.get("/refreshUser", verifyToken, refreshUser);
export default router;
