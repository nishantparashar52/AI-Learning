
import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  questionId: String,
  response: String,
  correct: Boolean,
  timeSec: Number
}, { _id: false });

const SubmissionSchema = new mongoose.Schema({
  assignmentId: String,
  studentId: String,
  answers: [AnswerSchema],
  autoScorePct: Number,
  totalTimeSec: Number,
  submittedAt: Date
}, { timestamps: true });

export default mongoose.model('Submission', SubmissionSchema);
