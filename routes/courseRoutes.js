import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  getQuizByCourseId,
  submitQuiz,
} from "../controllers/courseController.js";
const courseRouter = Router();
courseRouter.get("/", getAllCourses);
courseRouter.get("/:courseId", getCourseById);
courseRouter.get("/:courseId/topics/:topicId/quiz", getQuizByCourseId);
courseRouter.post("/:courseId/quiz/submit", submitQuiz);

export default courseRouter;
