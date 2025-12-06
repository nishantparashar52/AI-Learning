
import express from 'express';
import Submission from '../models/Submission.js';
import Question from '../models/Question.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { assignmentId, studentId, answers } = req.body;
    let correctCount = 0;
    let totalTime = 0;
    for (const ans of answers) {
      totalTime += Number(ans.timeSec || 0);
      const q = await Question.findById(ans.questionId);
      if (!q) continue;
      let isCorrect = false;
      if (q.type === 'mcq') {
        // Accept either option text match or index match
        const text = String(ans.response).trim();
        const correctText = q.options[q.answerIndex];
        isCorrect = (text === String(q.answerIndex)) || (text === String(correctText));
      } else if (q.type === 'numeric') {
        isCorrect = Number(ans.response) === Number(q.answerNumeric);
      }
      if (isCorrect) correctCount += 1;
      ans.correct = isCorrect;
    }
    const scorePct = Math.round((correctCount / (answers.length || 1)) * 100);
    const doc = await Submission.create({
      assignmentId, studentId, answers, autoScorePct: scorePct,
      totalTimeSec: totalTime, submittedAt: new Date()
    });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
