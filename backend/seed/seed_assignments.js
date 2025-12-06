
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Assignment from '../src/models/Assignment.js';
import Question from '../src/models/Question.js';

dotenv.config();
const uri = process.env.MONGODB_URI;
await mongoose.connect(uri, { dbName: 'learning_poc' });

await Assignment.deleteMany({});

const qs = await Question.find({ conceptKey: 'math.percentage.basics' }).limit(8);
const questionIds = qs.map(q => String(q._id));

const a1 = await Assignment.create({
  school_id: 'demo-school',
  class: 5,
  section: 'A',
  title: 'Percentage – Practice 1',
  questionIds,
  dueDate: new Date(Date.now() + 7*24*60*60*1000),
  createdBy: 'demo-teacher'
});

console.log('Seeded assignments:', a1._id);
await mongoose.disconnect();
