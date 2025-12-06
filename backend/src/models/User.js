
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  school_id: String,
  class: Number,
  section: String,
  phone: String,
  name: String,
  parent_contact: String
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
