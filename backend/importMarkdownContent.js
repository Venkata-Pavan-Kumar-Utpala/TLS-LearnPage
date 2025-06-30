import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Notes from "./models/Notes.js";
import Quiz from "./models/Quiz.js";
import Course from "./models/Course.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Directory containing markdown files
const notesDir = path.join(__dirname, "markdown-content");

// Predefined list of files and titles
export const predefinedNotes = [
  {
    file: "CoreJava_BasicsAndDataTypes_Notes01.md",
    title: "Basics and Data Types",
  },
  {
    file: "CoreJava_ScannerInputAndKeywords_Notes02.md",
    title: "Scanner Input and Keywords",
  },
  {
    file: "CoreJava_ControlStatements_Notes0304.md",
    title: "Control Statements",
  },
  { file: "CoreJava_Arrays_Notes05.md", title: "Arrays" },
  { file: "CoreJava_StorageTypes_Notes06.md", title: "Storage Types" },
  { file: "CoreJava_Constructors_Notes07.md", title: "Constructors" },
  { file: "CoreJava_Inheritance_Notes08.md", title: "Inheritance" },
  {
    file: "CoreJava_AbstractClassAndInterface_Notes09.md",
    title: "Abstract Class and Interface",
  },
  {
    file: "CoreJava_ExceptionHandling_Notes10.md",
    title: "Exception Handling",
  },
  { file: "CoreJava_Multithreading_Notes11.md", title: "Multithreading" },
  {
    file: "CoreJava_CollectionFramework_Notes12.md",
    title: "Collection Framework",
  },
  { file: "CoreJava_MysqlDb_Notes1314.md", title: "MySQL Database" },
];

// Function to insert markdown content into the database
export const insertMarkdownContent = async () => {
  try {
    const courseTitle = "Core Java"; // Specify the course title

    const notesData = predefinedNotes
      .map((note) => {
        const filePath = path.join(notesDir, note.file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf-8");
          return { title: note.title, content, courseTitle };
        } else {
          console.warn(`File not found: ${note.file}`);
          return null;
        }
      })
      .filter(Boolean);

    for (const note of notesData) {
      const existingNote = await Notes.findOne({ title: note.title });
      if (!existingNote) {
        await Notes.create(note);
        console.log(`Inserted note: ${note.title}`);
      } else {
        console.log(`Note already exists: ${note.title}`);
      }
    }
  } catch (error) {
    console.error("Error inserting markdown content:", error);
  }
};

// Added predefined quizzes and logic to read quiz markdown files
const quizzesDir = path.join(__dirname, "markdown-content");

export const predefinedQuizzes = [
  {
    file: "CoreJava_BasicsAndDataTypes_Quiz01.md",
    title: "Basics and Data Types",
  },
  {
    file: "CoreJava_ScannerInputAndKeywords_Quiz02.md",
    title: "Scanner Input and Keywords",
  },
  {
    file: "CoreJava_ControlStatements_Quiz0304.md",
    title: "Control Statements",
  },
  { file: "CoreJava_Arrays_Quiz05.md", title: "Arrays" },
  { file: "CoreJava_StorageTypes_Quiz06.md", title: "Storage Types" },
  { file: "CoreJava_Constructors_Quiz07.md", title: "Constructors" },
  { file: "CoreJava_Inheritance_Quiz08.md", title: "Inheritance" },
  {
    file: "CoreJava_AbstractClassAndInterface_Quiz09.md",
    title: "Abstract Class and Interface",
  },
  {
    file: "CoreJava_ExceptionHandling_Quiz10.md",
    title: "Exception Handling",
  },
  { file: "CoreJava_Multithreading_Quiz11.md", title: "Multithreading" },
  {
    file: "CoreJava_CollectionFramework_Quiz12.md",
    title: "Collection Framework",
  },
  { file: "CoreJava_MysqlDb_Quiz1314.md", title: "MySQL Database" },
];

export const readQuizMarkdown = (quizFile) => {
  const filePath = path.join(quizzesDir, quizFile);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf-8");
  } else {
    console.warn(`Quiz file not found: ${quizFile}`);
    return null;
  }
};

export const insertQuizContent = async () => {
  try {
    const courseTitle = "Core Java"; // Specify the course title

    const quizzesData = predefinedQuizzes
      .map((quiz) => {
        const filePath = path.join(quizzesDir, quiz.file);
        if (fs.existsSync(filePath)) {
          const content = readQuizMarkdown(quiz.file);
          return { title: quiz.title, content, courseTitle };
        } else {
          console.warn(`Quiz file not found: ${quiz.file}`);
          return null;
        }
      })
      .filter(Boolean);

    const course = await Course.findOne({ title: courseTitle });
    if (!course) {
      console.error(`Course not found: ${courseTitle}`);
      return;
    }

    for (const quiz of quizzesData) {
      const existingQuiz = await Quiz.findOne({ title: quiz.title });
      if (!existingQuiz) {
        const newQuiz = await Quiz.create(quiz);
        console.log(`Inserted quiz: ${quiz.title}`);

        const topic = course.topics.find(
          (t) => t.title.trim() === quiz.title.trim()
        );
        if (topic) {
          topic.quizId = newQuiz._id;
          console.log(
            `Updated topic: ${topic.title} with quizId: ${newQuiz._id}`
          );
        } else {
          console.warn(`Topic not found for quiz: ${quiz.title}`);
        }
      } else {
        console.log(`Quiz already exists: ${quiz.title}`);
      }
    }

    await course.save();
    console.log(`Saved course with updated topics.`);
  } catch (error) {
    console.error("Error inserting quiz content:", error);
  }
};
