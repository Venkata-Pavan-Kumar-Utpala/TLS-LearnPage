import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";

dotenv.config();

const clearCourses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB Connected Successfully");

    // Get count before clearing
    const courseCount = await Course.countDocuments();
    const quizCount = await Quiz.countDocuments();
    
    console.log(`Found ${courseCount} courses and ${quizCount} quizzes`);

    if (courseCount === 0) {
      console.log("No courses to clear");
      process.exit(0);
    }

    // Clear existing courses and quizzes
    console.log("Clearing existing courses and quizzes...");
    await Course.deleteMany({});
    await Quiz.deleteMany({});
    
    console.log("✅ All courses and quizzes cleared successfully!");
    console.log("💡 Restart the server to seed new courses automatically");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing courses:", error.message);
    process.exit(1);
  }
};

clearCourses();
