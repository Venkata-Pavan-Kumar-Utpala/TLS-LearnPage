import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import { sampleCourses, quizQuestions } from "./sampleCourseData.js";
dotenv.config();
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Seed only courses
export const seedCourses = async () => {
  try {
    await Course.deleteMany();
    await Course.insertMany(sampleCourses);
    console.log("Sample courses seeded");
  } catch (error) {
    console.error("Error seeding courses:", error.message);
  }
};

// Seed quizzes and link to topics by topicId
export const seedQuizzes = async () => {
  try {
    await Quiz.deleteMany();
    const courses = await Course.find();
    for (const course of courses) {
      let updated = false;
      for (const topic of course.topics) {
        // Use unique questions for each topic (strict: throw if missing)
        let questions = quizQuestions[topic.title];
        if (!questions) {
          throw new Error(`No quiz questions found for topic: ${topic.title}`);
        }
        const quiz = await Quiz.create({
          courseId: course._id,
          topicId: topic._id,
          topicTitle: topic.title,
          questions,
        });
        topic.quizId = quiz._id; // Link quiz to topic
        updated = true;
      }
      if (updated) await course.save();
    }
    console.log("Sample quizzes seeded and linked to topics");
  } catch (error) {
    console.error("Error seeding quizzes:", error.message);
  }
};
