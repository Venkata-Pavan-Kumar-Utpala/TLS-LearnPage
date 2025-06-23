import UserProgress from "../models/UserProgress.js";

// Check Quiz Attempts and Award XP
export const checkQuizAttempts = async ({ userId, quizId, courseId, xp }) => {
  let userProgress = await UserProgress.findOne({ userId });

  if (!userProgress) {
    userProgress = new UserProgress({ userId });
  }

  if (
    userProgress.completedQuizzes
      .map((id) => id.toString())
      .includes(quizId.toString())
  ) {
    return { error: "Quiz can be submitted only once" };
  }

  userProgress.completedQuizzes.push(quizId);
  const existingXP = userProgress.courseXP.get(courseId) || 0;
  userProgress.courseXP.set(courseId, existingXP + xp);
  userProgress.totalCourseXP += xp;

  await userProgress.save();
  return { success: true };
};

// Get Current Authenticated User's Progress
export const getUserProgress = async (req, res) => {
  const userId = req.user._id;

  try {
    const userProgress = await UserProgress.findOne({ userId }).select(
      "courseXP exerciseXP totalCourseXP totalExerciseXP"
    );

    if (!userProgress) {
      return res.status(200).json({
        courseXP: {},
        exerciseXP: {},
        totalCourseXP: 0,
        totalExerciseXP: 0,
      });
    }

    return res.status(200).json(userProgress);
  } catch (err) {
    console.error("User Progress Fetch Error:", err.message);
    return res.status(500).json({ message: "Failed to fetch user progress" });
  }
};
