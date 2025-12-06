
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI in .env');
}

mongoose.set('strictQuery', true);
mongoose.connect(uri, { dbName: 'learning_poc' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));
