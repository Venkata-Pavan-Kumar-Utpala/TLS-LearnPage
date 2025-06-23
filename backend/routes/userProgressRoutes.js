import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserProgress } from "../controllers/userProgressController.js";

const userProgressRouter = express.Router();

// ✅ Route without userId param
userProgressRouter.get("/", protect, getUserProgress);

export default userProgressRouter;
