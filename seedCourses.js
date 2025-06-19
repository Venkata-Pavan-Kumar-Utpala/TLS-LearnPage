import { connectDB } from './config/db.js'; // adjust path if needed
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js'; // adjust path to your Course model

dotenv.config();

const sampleCourses = [
  {
    title: "JavaScript Programming",
    level: "Beginner",
    topics: [
      { title: "Variables and Data Types", quizId: null },
      { title: "Functions and Scope", quizId: null },
      { title: "DOM Manipulation", quizId: null },
    ],
  },
  {
    title: "Python Programming",
    level: "Intermediate",
    topics: [
      { title: "Lists and Tuples", quizId: null },
      { title: "File Handling", quizId: null },
      { title: "OOP in Python", quizId: null },
    ],
  },
  {
    title: "C Programming",
    level: "Beginner",
    topics: [
      { title: "Control Flow", quizId: null },
      { title: "Pointers", quizId: null },
      { title: "Structures", quizId: null },
    ],
  },
  {
    title: "Java Programming",
    level: "Intermediate",
    topics: [
      { title: "OOP Concepts", quizId: null },
      { title: "Collections Framework", quizId: null },
      { title: "Exception Handling", quizId: null },
    ],
  },
  {
    title: "C++ Programming",
    level: "Advanced",
    topics: [
      { title: "Classes and Objects", quizId: null },
      { title: "Inheritance and Polymorphism", quizId: null },
      { title: "STL (Standard Template Library)", quizId: null },
    ],
  },
];

const seedCourses = async () => {
  try {
    await connectDB();
    await Course.deleteMany();
    const inserted = await Course.insertMany(sampleCourses);
    console.log("✅ Seeded courses:", inserted.length);
    console.log("📌 First Course ID:", inserted[0]._id); // Save this for your exercises!
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding courses:", err.message);
    process.exit(1);
  }
};

seedCourses();
