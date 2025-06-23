import mongoose from "mongoose";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import {
  checkIfQuestionAnswered,
  recordCorrectAnswer,
} from "./userProgressController.js";
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
    // map topics to alias _id as topicId because It was confusing
    const topics = course.topics.map((topic) => ({
      topicId: topic._id,
      title: topic.title,
      quizId: topic.quizId,
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
    const { quizId, questionId, selectedOption } = req.body;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course Id" });
    }
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid Quiz Id" });
    }
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ message: "Invalid Question Id" });
    }

    // Ensure the quiz belongs to the course
    const quiz = await Quiz.findOne({ _id: quizId, courseId });
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found for this course" });
    }

    // Check if user already attempted the quiz or this question (no mutation)
    const checkResult = await checkIfQuestionAnswered({
      userId: req.user.id,
      quizId,
      questionId,
    });
    if (checkResult.error) {
      return res.status(400).json({ message: checkResult.error });
    }

    const question = quiz.questions.find(
      (q) => q._id.toString() === questionId
    );
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found in this quiz" });
    }
    // Ensure selectedOption is a number for comparison
    const selectedOptionTypeChecked =
      typeof selectedOption === "number"
        ? selectedOption
        : Number(selectedOption);
    const isCorrect = selectedOptionTypeChecked === question.correctAnswer;
    let xp = 0;
    if (isCorrect) {
      xp = 10;
      // Update XP for this correct answer (mutation)
      await recordCorrectAnswer({
        userId: req.user.id,
        quizId,
        courseId,
        questionId,
        xp,
      });
    }
    res.status(200).json({
      questionId: question._id,
      selectedOption: selectedOptionTypeChecked,
      correctOption: question.correctAnswer,
      explanation: question.explanation || "No explanation found for this",
      correct: isCorrect,
      receivedXP: xp,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while submitting the quiz answer",
      error: error.message,
    });
  }
};
