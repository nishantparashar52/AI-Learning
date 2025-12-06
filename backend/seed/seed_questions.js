
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../src/models/Question.js';
import Concept from '../src/models/Concept.js';

dotenv.config();
const uri = process.env.MONGODB_URI;
await mongoose.connect(uri, { dbName: 'learning_poc' });

const dataDir = path.resolve('./seed/data');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('questions_'));

await Question.deleteMany({});

// Map filenames to full concept keys
const filenameToConceptKey = {
  'questions_add_sub_word.json': 'math.add_sub.word',
  'questions_fractions_basics.json': 'math.fractions.basics',
  'questions_decimals_place_value.json': 'math.decimals.place_value',
  'questions_percentage_basics.json': 'math.percentage.basics',
  'questions_std_basics.json': 'math.std.basics'
};

for (const f of files) {
  const items = JSON.parse(fs.readFileSync(path.join(dataDir, f)));
  const conceptKey = filenameToConceptKey[f] || null;
  if (!conceptKey) {
    console.warn('Unknown concept mapping for', f);
  }
  for (const it of items) {
    await Question.create({
      conceptKey: conceptKey || it.conceptKey || 'unknown',
      objectiveKey: it.objectiveKey,
      class: it.class,
      type: it.type,
      stem: it.stem,
      options: it.options || [],
      answerIndex: it.answerIndex ?? null,
      answerNumeric: it.answerNumeric ?? null,
      difficulty: it.difficulty,
      skills: it.skills || [],
      explanation: it.explanation
    });
  }
}

console.log('Seeded questions with correct conceptKey');
await mongoose.disconnect();
