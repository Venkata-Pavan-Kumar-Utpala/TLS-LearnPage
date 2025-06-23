import mongoose from "mongoose";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

// Check if a question has already been answered (no mutation)
export const checkIfQuestionAnswered = async ({
  userId,
  quizId,
  questionId,
}) => {
  let userProgress = await UserProgress.findOne({ userId });
  if (!userProgress) return { answered: false };
  // Only allow one attempt per quiz as a whole
  if (
    userProgress.completedQuizzes
      .map((id) => id.toString())
      .includes(quizId.toString())
  ) {
    return { error: "Quiz can be submitted only once" };
  }
  const answered = userProgress.answeredQuestions.get(quizId.toString()) || [];
  if (answered.map((id) => id.toString()).includes(questionId.toString())) {
    return { error: "You have already answered this question." };
  }
  return { answered: false };
};

// Update progress and XP for a correct answer (mutation)
export const recordCorrectAnswer = async ({
  userId,
  quizId,
  courseId,
  questionId,
  xp,
}) => {
  let userProgress = await UserProgress.findOne({ userId });
  if (!userProgress) {
    userProgress = new UserProgress({
      userId,
      completedQuizzes: [],
      courseXP: {},
      totalCourseXP: 0,
      answeredQuestions: {},
    });
  }
  // Add this questionId to answeredQuestions for this quiz
  const answered = userProgress.answeredQuestions.get(quizId.toString()) || [];
  answered.push(questionId);
  userProgress.answeredQuestions.set(quizId.toString(), answered);
  // --- Mark quiz as completed if all questions are answered ---
  const quizComplete = await Quiz.findById(quizId);
  if (quizComplete && answered.length === quizComplete.questions.length) {
    if (
      !userProgress.completedQuizzes
        .map((id) => id.toString())
        .includes(quizId.toString())
    ) {
      userProgress.completedQuizzes.push(quizId);
    }
  }
  // Add XP for this question
  userProgress.courseXP.set(
    courseId,
    (userProgress.courseXP.get(courseId) ?? 0) + xp
  );
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
