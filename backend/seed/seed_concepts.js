
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Concept from '../src/models/Concept.js';
import ConceptCard from '../src/models/ConceptCard.js';

dotenv.config();
const uri = process.env.MONGODB_URI;
await mongoose.connect(uri, { dbName: 'learning_poc' });

const dataDir = path.resolve('./seed/data');
const concepts = JSON.parse(fs.readFileSync(path.join(dataDir, 'concepts.json')));
const cards = JSON.parse(fs.readFileSync(path.join(dataDir, 'cards_en.json')));

await Concept.deleteMany({});
await ConceptCard.deleteMany({});
await Concept.insertMany(concepts);
await ConceptCard.insertMany(cards);

console.log('Seeded concepts & cards');
await mongoose.disconnect();
