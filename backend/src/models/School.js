
import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema({
  name: String,
  domain: String,
  plan: String,
  theme: Object
}, { timestamps: true });

export default mongoose.model('School', SchoolSchema);
