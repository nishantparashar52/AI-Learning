
import express from 'express';
import Submission from '../models/Submission.js';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/student/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const subs = await Submission.find({ studentId }).sort({ createdAt: -1 });
  const summary = subs.map(s => ({ id: s.id, score: s.autoScorePct, time: s.totalTimeSec, submittedAt: s.submittedAt }));
  res.json({ count: subs.length, summary });
});

router.get('/class', async (req, res) => {
  // Demo: aggregate mastery by objective using last 100 submissions
  const subs = await Submission.find({}).sort({ createdAt: -1 }).limit(100);
  const objStats = {};
  for (const s of subs) {
    for (const a of s.answers) {
      const q = await Question.findById(a.questionId);
      if (!q) continue;
      const key = q.objectiveKey || 'unknown';
      objStats[key] = objStats[key] || { attempts: 0, correct: 0 };
      objStats[key].attempts += 1;
      if (a.correct) objStats[key].correct += 1;
    }
  }
  const heatmap = Object.entries(objStats).map(([objectiveKey, v]) => ({ objectiveKey, accuracy: Math.round((v.correct / v.attempts) * 100) }));
  res.json({ heatmap });
});

export default router;
