import Course from "../models/Course.js";
import { predefinedNotes } from "../importMarkdownContent.js";

// Seed Core Java course (minimal, no linking)
export const seedCoreJavaCourse = async () => {
  try {
    const existingCourse = await Course.findOne({ title: "Core Java" });
    if (existingCourse) {
      console.log("Core Java course already exists, skipping seeding");
      return;
    }

    const coreJavaTopics = predefinedNotes.map((note) => ({
      title: note.title,
      notesId: null,
      quizId: null,
      exerciseId: null,
    }));

    const coreJavaCourse = new Course({
      title: "Core Java",
      description: "Learn the fundamentals of Java programming.",
      level: "Beginner",
      topics: coreJavaTopics,
    });

    await coreJavaCourse.save();
    console.log("Core Java course seeded successfully");
  } catch (error) {
    console.error("Error seeding Core Java course:", error.message);
  }
};
