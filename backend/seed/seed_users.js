
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();
const uri = process.env.MONGODB_URI;
await mongoose.connect(uri, { dbName: 'learning_poc' });

await User.deleteMany({});

const teacher = { role: 'teacher', school_id: 'demo-school', class: 5, section: 'A', phone: '9999999999', name: 'Demo Teacher' };
await User.create(teacher);

const students = Array.from({ length: 20 }).map((_, i) => ({
  role: 'student', school_id: 'demo-school', class: 5, section: 'A', phone:  String(9000000000 + i), name: `Student ${i+1}`
}));
await User.insertMany(students);

console.log('Seeded users (1 teacher, 20 students)');
await mongoose.disconnect();
