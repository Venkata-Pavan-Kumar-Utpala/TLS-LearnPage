import Course from "../models/Course.js";
import Notes from "../models/Notes.js";
import { predefinedNotes } from "../importMarkdownContent.js";

// Seed Core Java course with notes
export const seedCoreJavaCourse = async () => {
  try {
    const existingCourse = await Course.findOne({ title: "Core Java" });
    if (existingCourse) {
      console.log("Core Java course already exists, skipping seeding");
      return;
    }

    const coreJavaTopics = predefinedNotes.map((note) => ({
      title: note.title,
      notesId: null, // Placeholder for notes ID
      quizId: null, // Placeholder for quiz ID
      exerciseId: null, // Placeholder for exercise ID
    }));

    const coreJavaCourse = new Course({
      title: "Core Java",
      description: "Learn the fundamentals of Java programming.",
      level: "Beginner",
      topics: coreJavaTopics,
    });

    await coreJavaCourse.save();
    console.log("Core Java course seeded successfully");

    // Link notes to topics
    for (const topic of coreJavaCourse.topics) {
      const note = await Notes.findOne({ title: topic.title });
      if (note) {
        topic.notesId = note._id;
      }
    }

    await coreJavaCourse.save();
    console.log(
      "Core Java course topics linked to notes and quizzes successfully"
    );
  } catch (error) {
    console.error("Error seeding Core Java course:", error.message);
  }
};
