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
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
      return res.status(400).json({ error: "Invalid exercise ID" });
    }

    // Check if exercise exists and belongs to the course
    const exercise = await Exercise.findOne({ _id: exerciseId, courseId });
    if (!exercise) {
      return res
        .status(404)
        .json({ error: "Exercise not found for this course" });
    }

    // Get or create user progress
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = new UserProgress({
        userId,
        totalExerciseXP: 0,
        exerciseXP: new Map(),
        completedExercises: [],
        courseXP: new Map(),
        totalCourseXP: 0,
        completedQuizzes: [],
        answeredQuestions: new Map(),
      });
    }

    // Check if already completed
    if (
      progress.completedExercises.some((id) => id.toString() === exerciseId)
    ) {
      return res.status(400).json({ message: "Exercise already completed" });
    }

    // Award XP (make it configurable in the future)
    const xpToAdd = 10;
    const currentXP = progress.exerciseXP.get(courseId) || 0;
    progress.exerciseXP.set(courseId, currentXP + xpToAdd);
    // Note: totalExerciseXP will be calculated in getUserProgress for consistency

    // Mark as completed
    progress.completedExercises.push(new mongoose.Types.ObjectId(exerciseId));

    await progress.save();

    // Calculate current total exercise XP for response
    let totalExerciseXP = 0;
    for (const xp of progress.exerciseXP.values()) {
      totalExerciseXP += xp;
    }

    res.status(200).json({
      message: "Exercise completed successfully",
      addedXP: xpToAdd,
      totalExerciseXP: totalExerciseXP,
    });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ error: "Exercise submission failed" });
  }
});

export default router;
