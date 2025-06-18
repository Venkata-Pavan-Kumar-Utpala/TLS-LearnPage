import { Router } from 'express';
const router = Router();
import { find } from '../models/Exercise';

// GET /api/exercises/:courseId
router.get('/:courseId', async (req, res) => {
  try {
    const exercises = await find({ courseId: req.params.courseId });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

export default router;
