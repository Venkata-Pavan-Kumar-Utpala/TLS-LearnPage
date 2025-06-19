import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
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

// Sample data
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

// Quiz questions for each topic
const quizQuestions = {
  "Variables and Data Types": [
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Undefined"],
      correctAnswer: 2,
    },
    {
      question: "How do you declare a variable in JavaScript?",
      options: ["var x;", "int x;", "let x = 5;", "Both A and C"],
      correctAnswer: 3,
    },
  ],
  "Functions and Scope": [
    {
      question: "What is the correct way to define a function in JavaScript?",
      options: [
        "function myFunc() {}",
        "def myFunc() {}",
        "func myFunc() {}",
        "function:myFunc() {}",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "What is the scope of a variable declared with let inside a function?",
      options: ["Global", "Function", "Block", "Module"],
      correctAnswer: 2,
    },
  ],
  "DOM Manipulation": [
    {
      question: "Which method is used to select an element by its ID?",
      options: [
        "getElementById",
        "querySelectorAll",
        "getElementsByClassName",
        "getElementByTagName",
      ],
      correctAnswer: 0,
    },
  ],
  "Lists and Tuples": [
    {
      question: "Which of these is mutable in Python?",
      options: ["List", "Tuple", "Both", "None"],
      correctAnswer: 0,
    },
  ],
  "File Handling": [
    {
      question: "Which function is used to open a file in Python?",
      options: ["open()", "file()", "read()", "with()"],
      correctAnswer: 0,
    },
  ],
  "OOP in Python": [
    {
      question: "What is used to define a class in Python?",
      options: ["function", "def", "class", "object"],
      correctAnswer: 2,
    },
  ],
  "Control Flow": [
    {
      question: "Which statement is used for decision making in C?",
      options: ["if", "for", "while", "switch"],
      correctAnswer: 0,
    },
  ],
  Pointers: [
    {
      question: "What does a pointer store?",
      options: ["Value", "Address", "Function", "None"],
      correctAnswer: 1,
    },
  ],
  Structures: [
    {
      question: "Which keyword is used to define a structure in C?",
      options: ["struct", "structure", "class", "define"],
      correctAnswer: 0,
    },
  ],
  "OOP Concepts": [
    {
      question: "Which is not a pillar of OOP?",
      options: ["Encapsulation", "Polymorphism", "Abstraction", "Compilation"],
      correctAnswer: 3,
    },
  ],
  "Collections Framework": [
    {
      question: "Which interface is not part of Java Collections Framework?",
      options: ["List", "Set", "Map", "Array"],
      correctAnswer: 3,
    },
  ],
  "Exception Handling": [
    {
      question: "Which keyword is used to handle exceptions in Java?",
      options: ["try", "catch", "throw", "All of the above"],
      correctAnswer: 3,
    },
  ],
  "Classes and Objects": [
    {
      question: "What is an object in C++?",
      options: ["Instance of a class", "A function", "A variable", "A pointer"],
      correctAnswer: 0,
    },
  ],
  "Inheritance and Polymorphism": [
    {
      question: "Which type of inheritance is not supported in C++?",
      options: ["Multiple", "Multilevel", "Hierarchical", "Hybrid"],
      correctAnswer: 0,
    },
  ],
  "STL (Standard Template Library)": [
    {
      question: "Which STL component is used for algorithms?",
      options: ["vector", "map", "algorithm", "set"],
      correctAnswer: 2,
    },
  ],
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
        const questions = quizQuestions[topic.title];
        if (!questions) {
          throw new Error(`No quiz questions found for topic: ${topic.title}`);
        }
        // Create quiz with courseId and topicId
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

