import express from 'express';
import Exercise from '../models/Exercise.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/exercises/:courseId (with auth)
router.get('/:courseId', authMiddleware, async (req, res) => {
  try {
    const exercises = await Exercise.find({ courseId: req.params.courseId });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

// TEMP DEV ROUTE: Seed sample beginner exercises
router.post('/seed-sample-data', async (req, res) => {
  try {
        const course = await Course.create({
      title: 'Beginner Python',
      level: 'Beginner',
      description: 'Intro to Python for complete beginners.',
      chapters: ['Intro', 'Print', 'Variables']
    });
    const courseId = 'REPLACE_WITH_REAL_COURSE_ID'; // 🔁 Replace this with actual Course _id

    const exercises = [
      {
        courseId,
        title: 'Print Hello World',
        level: 'Beginner',
        theory: 'Learn how to print text in your programming language.',
        starterCode: `print("Hello World")`,
        testCases: ['Hello World']
      },
      {
        courseId,
        title: 'Add Two Numbers',
        level: 'Beginner',
        theory: 'Learn how to take input and add two numbers.',
        starterCode: `a = int(input())\nb = int(input())\n# Write code to print their sum`,
        testCases: ['2\n3 → 5']
      },
      {
        courseId,
        title: 'Check Even or Odd',
        level: 'Beginner',
        theory: 'Use modulo operator to determine if a number is even or odd.',
        starterCode: `n = int(input())\n# Write code to print Even or Odd`,
        testCases: ['2 → Even', '3 → Odd']
      },
      {
        courseId,
        title: 'Maximum of Two Numbers',
        level: 'Beginner',
        theory: 'Compare two numbers using if-else and print the larger one.',
        starterCode: `a = int(input())\nb = int(input())\n# Print the maximum`,
        testCases: ['10\n20 → 20']
      },
      {
        courseId,
        title: 'Print Numbers 1 to N',
        level: 'Beginner',
        theory: 'Use a loop to print numbers from 1 to N.',
        starterCode: `n = int(input())\n# Print numbers from 1 to n`,
        testCases: ['3 → 1\n2\n3']
      }
    ];

    await Exercise.insertMany(exercises);
    res.status(201).json({ message: '5 beginner-level exercises inserted successfully' });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ error: 'Failed to insert sample exercises' });
  }
});

export default router;
