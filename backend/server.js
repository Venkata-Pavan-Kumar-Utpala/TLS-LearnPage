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
import { insertJavaMarkdownContent } from "./config/insertJavaMarkdown.js";
import { insertPythonMarkdownContent } from "./config/insertPythonMarkdown.js";

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
app.use(
  "/CoreJava_Images",
  express.static("backend/markdown-content/CoreJava/CoreJava_Images")
);
// Static files for markdown content

// Connect to DB
(async () => {
  try {
    await connectDB();
    await insertJavaMarkdownContent();
    await insertPythonMarkdownContent();

    const PORT = process.env.PORT || 3000;
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
