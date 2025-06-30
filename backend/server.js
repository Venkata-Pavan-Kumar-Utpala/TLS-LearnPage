import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, seedCourses, seedQuizzes } from "./config/db.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import userProgressRouter from "./routes/userProgressRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import { insertMarkdownContent } from "./importMarkdownContent.js";
import Notes from "./models/Notes.js";
import Quiz from "./models/Quiz.js";
import Course from "./models/Course.js";
import { seedCoreJavaCourse } from "./config/seedCoreJava.js";

dotenv.config();
const app = express();

// CORS Configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to DB
(async () => {
  try {
    await connectDB();

    // await seedCourses();
    // await seedQuizzes();

    // Delete existing courses
    await Course.deleteMany({});
    console.log("Deleted all existing courses from the database.");
    // Delete existing notes
    await Notes.deleteMany({});
    console.log("Deleted all existing notes from the database.");
    // Delete existing quizzes
    await Quiz.deleteMany({});
    console.log("Deleted all existing quizzes from the database.");

    // Insert course specific into the database
    await seedCoreJavaCourse();
    await insertMarkdownContent();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running`));
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
})();

// Routes
app.use("/api/exercises", exerciseRoutes);
app.use("/api/courses", courseRouter);
app.use("/api/auth", userRoutes);
app.use("/api/user-progress", userProgressRouter);
app.use("/api/certificate", paymentRouter);
app.use("/api/certification", certificationRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});
