
'use client';
import { useEffect, useState } from 'react';

export default function Learn({ params }: any) {
  const key = decodeURIComponent(params.conceptKey);
  const [cards, setCards] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/content/concepts/${key}/cards?language=en`).then(r=>r.json()).then(setCards);
    fetch(`http://localhost:4000/content/questions?conceptKey=${key}`).then(r=>r.json()).then(setQuestions);
  }, [key]);

  const submit = async () => {
    const payload = { assignmentId: 'demo', studentId: 'student-1', answers: answers.map(a => ({...a, timeSec: 10})) };
    const res = await fetch('http://localhost:4000/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json();
    setSubmitted(data);
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h2>Concept: {key}</h2>
      {cards.map((card:any, idx:number) => (
        <div key={idx} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
          {card.sections.map((s:any, i:number) => (
            <div key={i}>
              <strong>{s.type}</strong>: {s.text || (s.items || []).join(', ')}
            </div>
          ))}
        </div>
      ))}

      <h3>Practice</h3>
      {questions.slice(0,8).map((q:any, i:number) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div><strong>Q{i+1}.</strong> {q.stem}</div>
          {q.type === 'mcq' && (
            <ul>
              {q.options.map((op:string, j:number) => (
                <li key={j}>
                  <label>
                    <input type="radio" name={`q${i}`} onChange={() => setAnswers(prev => { const other = prev.filter(p=>p.questionId!==q._id); return [...other, { questionId: q._id, response: op }]; })} /> {op}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <button onClick={submit} style={{ padding: '8px 16px' }}>Submit</button>
      {submitted && (
        <div style={{ marginTop: 16 }}>
          <h4>Result</h4>
          <div>Score: {submitted.autoScorePct}%</div>
          <div>Total Time: {submitted.totalTimeSec}s</div>
        </div>
      )}
    </div>
  );
}
