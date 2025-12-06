
import express from 'express';
import Assignment from '../models/Assignment.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const doc = await Assignment.create(req.body);
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  const { class: cls, section } = req.query;
  const q = {};
  if (cls) q.class = Number(cls);
  if (section) q.section = section;
  const items = await Assignment.find(q).sort({ createdAt: -1 });
  res.json(items);
});

export default router;
