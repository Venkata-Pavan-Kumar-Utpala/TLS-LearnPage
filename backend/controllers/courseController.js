import mongoose from "mongoose";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import { checkQuizAttempts } from "./userProgressController.js";
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ count: courses.length, courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch courses", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // Map topics to alias _id as topicId
    const topics = course.topics.map((topic) => ({
      topicId: topic._id,
      title: topic.title,
      quizId: topic.quizId,
      // add other fields if needed
    }));
    res.status(200).json({
      ...course.toObject(),
      topics,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course details", error: error.message });
  }
};

export const getQuizByCourseId = async (req, res) => {
  try {
    const { courseId, topicId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId))
      return res.status(400).json({ message: "Invalid Course Id" });
    if (!mongoose.Types.ObjectId.isValid(topicId))
      return res.status(400).json({ message: "Invalid Topic Id" });

    const quiz = await Quiz.findOne({ courseId, topicId });

    if (!quiz)
      return res.status(404).json({ message: "Quiz not found for this topic" });

    return res.status(200).json({
      topic: quiz.topicTitle,
      questions: quiz.questions.map(({ question, options, _id }) => ({
        question,
        options,
        _id, // I didn't want to send this but I think It can be used for verifying the correct answer using this Id
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Fetching quiz", error: error.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { quizId, answers } = req.body; // quizId and answers in body of the form quidId ,[{questionId, selectedOption }]
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course Id" });
    }
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid Quiz Id" });
    }

    // Ensure the quiz belongs to the course
    const quiz = await Quiz.findOne({ _id: quizId, courseId });
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found for this course" });
    }

    let xp = 0;
    const results = quiz.questions.map((q) => {
      const userAnswer = answers.find((a) => a.questionId === q._id.toString());
      const isCorrect =
        userAnswer && userAnswer.selectedOption === q.correctAnswer;
      if (isCorrect) xp += 10;
      return {
        questionId: q._id,
        selectedOption: userAnswer ? userAnswer.selectedOption : null,
        correctOption: q.correctAnswer,
        explanation: q.explanation || "No explanation found for this",
        correct: !!isCorrect,
      };
    });
    const totalQuizXP = quiz.questions.length * 10;
    const attemptResult = await checkQuizAttempts({
      userId: req.user.id,
      quizId,
      courseId,
      xp,
    });

    if (attemptResult.error) {
      return res.status(400).json({ message: attemptResult.error });
    }

    res.status(200).json({
      receivedXP: xp,
      totalQuizXP,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while submitting the quiz answers",
      error: error.message,
    });
  }
};
