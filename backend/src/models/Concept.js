
import mongoose from 'mongoose';

const ConceptSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  subject: String,
  class: Number,
  objectives: [{ key: String, desc: String }],
  version: { type: String, default: '1.0.0' }
}, { timestamps: true });

export default mongoose.model('Concept', ConceptSchema);
