
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import './src/db/mongo.js';
import authRouter from './src/routes/auth.js';
import contentRouter from './src/routes/content.js';
import assignmentsRouter from './src/routes/assignments.js';
import submissionsRouter from './src/routes/submissions.js';
import reportsRouter from './src/routes/reports.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'learning-platform-backend-poc' });
});

app.use('/auth', authRouter);
app.use('/content', contentRouter);
app.use('/assignments', assignmentsRouter);
app.use('/submissions', submissionsRouter);
app.use('/reports', reportsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
