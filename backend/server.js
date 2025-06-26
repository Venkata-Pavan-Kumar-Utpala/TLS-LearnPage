import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import userProgressRouter from "./routes/userProgressRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";



dotenv.config();
const app = express();

// Middleware
// In backend server.js or similar
app.use(cors({
  origin: [
    'https://roaring-nougat-709de4.netlify.app', // Your actual Netlify URL (removed trailing slash)
    'http://localhost:3000', // For local development
    'http://localhost:5173'  // Vite dev server
  ],
  credentials: true
}));
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
      console.log(`Server running at http://localhost:${PORT}`)
    );
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
