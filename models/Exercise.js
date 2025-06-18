import { Schema, model } from 'mongoose';

const ExerciseSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: { type: String, required: true },
  level: { type: String, required: true }, // beginner, intermediate, advanced
  theory: { type: String },
  starterCode: { type: String },
  testCases: [{ type: String }]
});

export default model('Exercise', ExerciseSchema)