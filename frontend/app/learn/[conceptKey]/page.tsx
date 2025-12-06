
'use client';
import { useEffect, useMemo, useState } from 'react';

export default function Learn({ params }: any) {
  const key = decodeURIComponent(params.conceptKey);
  const [cards, setCards] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/content/concepts/${key}/cards?language=en`).then(r=>r.json()).then(setCards);
    fetch(`http://localhost:4000/content/questions?conceptKey=${key}`).then(r=>r.json()).then(setQuestions);
  }, [key]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const submit = async () => {
    const payload = {
      assignmentId: 'demo',
      studentId: 'student-1',
      answers: Object.entries(answers).map(([qid, resp]) => ({ questionId: qid, response: resp, timeSec: 10 }))
    };
    const res = await fetch('http://localhost:4000/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    setSubmitted(data);
  };

  return (
    <div>
      <div className="card">
        <h2 className="text-xl font-bold">Concept: {key}</h2>
        {cards.length === 0 && <p className="text-slate-600">No concept card found.</p>}
        {cards.map((card:any, idx:number) => (
          <div key={idx} className="mt-2">
            {card.sections.map((s:any, i:number) => (
              <div key={i} className="mb-2">
                <span className="badge mr-2">{s.type}</span>
                <span>{s.text || (s.items || []).join(', ')}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Practice</h3>
        {questions.length === 0 && (
          <p className="text-warning">No questions yet for this concept. Please re-run <code>npm run seed:questions</code>.</p>
        )}
        {questions.slice(0,8).map((q:any, i:number) => (
          <div key={i} className="mb-3">
            <div className="font-medium">Q{i+1}. {q.stem}</div>
            {q.type === 'mcq' && (
              <ul className="mt-1">
                {q.options.map((op:string, j:number) => (
                  <li key={j} className="mt-1">
                    <label className="inline-flex items-center gap-2">
                      <input type="radio" name={`q${i}`} onChange={() => setAnswers(prev => ({ ...prev, [q._id]: op }))} />
                      <span>{op}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-slate-600">Answered: {answeredCount}/{Math.min(8, questions.length)}</span>
          <button disabled={answeredCount===0} onClick={submit} className={`btn ${answeredCount===0 ? 'opacity-50 cursor-not-allowed' : ''}`}>Submit</button>
        </div>
        {submitted && (
          <div className="mt-3">
            <h4 className="font-semibold">Result</h4>
            <div>Score: <span className="badge">{submitted.autoScorePct}%</span></div>
            <div>Total Time: {submitted.totalTimeSec}s</div>
          </div>
        )}
      </div>
    </div>
  );
}
