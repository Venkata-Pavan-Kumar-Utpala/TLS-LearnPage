import express from "express";
import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";
import UserProgress from "../models/UserProgress.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/exercises/:courseId/:exerciseId/submit
router.post("/:courseId/:exerciseId/submit", protect, async (req, res) => {
  const { courseId, exerciseId } = req.params;
  const userId = req.user._id;

  try {
    // Check if exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    // Get or create user progress
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = await UserProgress.create({
        userId,
        totalExerciseXP: 0,
        exerciseXP: new Map(),
        completedExercises: [],
      });
    }

    // Check if already completed
    if (progress.completedExercises.includes(exerciseId)) {
      return res.status(400).json({ message: "Exercise already completed" });
    }

    // Award XP
    const xpToAdd = 10;
    const currentXP = progress.exerciseXP.get(courseId) || 0;
    progress.exerciseXP.set(courseId, currentXP + xpToAdd);
    progress.totalExerciseXP += xpToAdd;

    // Mark as completed
    progress.completedExercises.push(new mongoose.Types.ObjectId(exerciseId));

    await progress.save();

    res
      .status(200)
      .json({ message: "XP awarded for this exercise", addedXP: xpToAdd });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ error: "Exercise submission failed" });
  }
});

export default router;
