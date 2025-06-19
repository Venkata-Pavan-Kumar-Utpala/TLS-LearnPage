import mongoose from "mongoose";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";

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

    res.status(200).json(course);
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
      if (isCorrect) xp++;
      return {
        questionId: q._id,
        correct: !!isCorrect, //converts truthy values to true and falsy values like undefined or didn't answer or something like that to false
      }; // it does not return and come back out of the function except it creates a result set
    });

    res.status(200).json({
      xp,
      total: quiz.questions.length,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while submitting the quiz answers",
      error: error.message,
    });
  }
};
