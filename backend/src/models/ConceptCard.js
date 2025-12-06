
import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  type: String,
  text: String,
  items: [String]
}, { _id: false });

const ConceptCardSchema = new mongoose.Schema({
  conceptKey: String,
  class: Number,
  language: { type: String, default: 'en' },
  sections: [SectionSchema],
  objectives: [{ key: String, desc: String }],
  version: { type: String, default: '1.0.0' }
}, { timestamps: true });

export default mongoose.model('ConceptCard', ConceptCardSchema);
