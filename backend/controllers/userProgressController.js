import mongoose from "mongoose";
import UserProgress from "../models/UserProgress.js";

export const checkQuizAttempts = async ({ userId, quizId, courseId, xp }) => {
  let userProgress = await UserProgress.findOne({ userId });

  // If not found, create a new UserProgress document
  if (!userProgress) {
    userProgress = new UserProgress({
      userId,
      completedQuizzes: [],
      courseXP: {},
      totalCourseXP: 0,
    });
  }

  if (
    userProgress.completedQuizzes
      .map((id) => id.toString())
      .includes(quizId.toString())
  ) {
    return { error: "Quiz can be submitted only once" };
  }

  userProgress.completedQuizzes.push(quizId);
  userProgress.courseXP.set(courseId, xp);
  userProgress.totalCourseXP += xp;

  await userProgress.save();

  return { success: true };
};

export const getUserProgress = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid UserId" });
  }
  // Find by userId and select only the required fields
  const userProgress = await UserProgress.findOne({ userId }).select(
    "courseXP exerciseXP totalCourseXP totalExerciseXP"
  );
  if (!userProgress) {
    return res.status(404).json({ message: "User progress not found" });
  }
  return res.status(200).json(userProgress);
};
