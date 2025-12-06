
import express from 'express';
import Concept from '../models/Concept.js';
import ConceptCard from '../models/ConceptCard.js';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/concepts', async (req, res) => {
  const { subject, class: cls } = req.query;
  const q = {};
  if (subject) q.subject = subject;
  if (cls) q.class = Number(cls);
  const concepts = await Concept.find(q).sort({ class: 1 });
  res.json(concepts);
});

router.get('/concepts/:key/cards', async (req, res) => {
  const { key } = req.params;
  const { language = 'en' } = req.query;
  const cards = await ConceptCard.find({ conceptKey: key, language });
  res.json(cards);
});

router.get('/questions', async (req, res) => {
  const { conceptKey, difficulty } = req.query;
  const q = {};
  if (conceptKey) q.conceptKey = conceptKey;
  if (difficulty) q.difficulty = difficulty;
  const questions = await Question.find(q).limit(50);
  res.json(questions);
});

export default router;
