
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  conceptKey: String,
  objectiveKey: String,
  class: Number,
  type: { type: String, enum: ['mcq', 'numeric'], default: 'mcq' },
  stem: String,
  options: [String],
  answerIndex: Number,
  answerNumeric: Number,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  skills: [String],
  explanation: String,
  version: { type: String, default: '1.0.0' }
}, { timestamps: true });

export default mongoose.model('Question', QuestionSchema);
