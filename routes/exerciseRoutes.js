import express from 'express';
import Exercise from '../models/Exercise.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/exercises/:courseId (with auth)
router.get('/:courseId', authMiddleware, async (req, res) => {
  try {
    const exercises = await Exercise.find({ courseId: req.params.courseId });

    // Add `isLocked` based on position
    const modified = exercises.map((exercise, index) => ({
      ...exercise._doc,
      isLocked: index >= 4, // 0-3 = false (unlocked), 4+ = true (locked)
    }));

    res.status(200).json(modified);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});
export default router;
