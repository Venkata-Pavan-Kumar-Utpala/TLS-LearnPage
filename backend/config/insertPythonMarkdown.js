import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Notes from "../models/Notes.js";
import Course from "../models/Course.js";

// Always resolve from backend root
import process from "process";
const __dirname = process.cwd();

// Python directories
const pythonDir = path.join(__dirname, "markdown-content", "Python");
const pythonNotesDir = path.join(pythonDir, "Python_Notes");

// Predefined Python notes
export const predefinedPythonNotes = [
  { file: "Python_Introduction_Notes01.md", title: "Introduction" },
  { file: "Python_InbuiltFunctions_Notes02.md", title: "Inbuilt Functions" },
  { file: "Python_Operators_Notes03.md", title: "Operators" },
  { file: "Python_ControlStatements_Notes04", title: "Control Statements" },
  {
    file: "Python_DatatypesAndMethods_Notes05.md",
    title: "Data Types and Methods",
  },
];

export const insertPythonMarkdownContent = async () => {
  try {
    // Only insert if Python course does not exist
    let pythonCourse = await Course.findOne({ title: "Python" });
    if (!pythonCourse) {
      // Create course and topics
      const pythonTopics = predefinedPythonNotes.map((note) => ({
        title: note.title,
        notesId: null,
        quizId: null,
        exerciseId: null,
      }));
      pythonCourse = new Course({
        title: "Python",
        description: "Learn the fundamentals of Python programming.",
        level: "Beginner",
        topics: pythonTopics,
      });
      await pythonCourse.save();
      console.log("Python course seeded successfully");
    } else {
      console.log("Python course already exists, skipping course creation");
    }

    // Insert notes only if not already present and link to topics
    let courseModified = false;
    for (const note of predefinedPythonNotes) {
      const filePath = path.join(pythonNotesDir, note.file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        // Check if a note with this content is already linked to the course topic
        const topic = pythonCourse.topics.find((t) => t.title === note.title);
        if (topic && topic.notesId) {
          // Already linked, skip
          continue;
        }
        // Only create if not already present
        let existingNote = await Notes.findOne({ content });
        if (!existingNote) {
          existingNote = await Notes.create({ content });
        }
        if (
          topic &&
          (!topic.notesId ||
            topic.notesId.toString() !== existingNote._id.toString())
        ) {
          topic.notesId = existingNote._id;
          courseModified = true;
        }
      } else {
        console.warn(`Note file not found: ${filePath}`);
      }
    }

    if (courseModified) {
      await pythonCourse.save();
      console.log("Notes linked to Python course successfully");
    } else {
      console.log("Python notes already linked, skipping update");
    }
  } catch (error) {
    console.error("Error inserting Python markdown content:", error);
  }
};
