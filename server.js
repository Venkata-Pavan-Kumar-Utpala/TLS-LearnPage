import express from "express";
import dotenv from "dotenv";
import { connectDB, seedCourses } from "./config/db.js";
import cors from "cors";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import courseRouter from "./routes/courseRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await connectDB();
    await seedCourses();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
})();

app.use("/api/exercises", exerciseRoutes);
app.use("/api/courses", courseRouter);
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});
