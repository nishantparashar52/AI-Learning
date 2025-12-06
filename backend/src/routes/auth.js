
import express from 'express';
const router = express.Router();

// Demo OTP endpoints (mock)
router.post('/otp/send', (req, res) => {
  const { phone } = req.body;
  res.json({ ok: true, phone, code: '1111' });
});

router.post('/otp/verify', (req, res) => {
  const { phone, code } = req.body;
  if (code === '1111') {
    res.json({ token: 'demo-token', user: { phone } });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});

export default router;
