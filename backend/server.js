import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import userProgressRouter from "./routes/userProgressRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
(async () => {
  try {
    await connectDB();

    // Seed data only in development
    if (process.env.NODE_ENV !== "production") {
      const { seedCourses, seedQuizzes } = await import("./config/db.js");
      await seedCourses();
      await seedQuizzes();
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
})();

// Routes
app.use("/api/exercises", exerciseRoutes);
app.use("/api/courses", courseRouter);
app.use("/api/auth", userRoutes);
app.use("/api/user-progress", userProgressRouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});
