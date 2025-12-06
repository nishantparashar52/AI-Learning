
import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
  school_id: String,
  class: Number,
  section: String,
  title: String,
  questionIds: [String],
  dueDate: Date,
  createdBy: String,
  status: { type: String, enum: ['draft', 'published', 'closed'], default: 'published' }
}, { timestamps: true });

export default mongoose.model('Assignment', AssignmentSchema);
