
'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/content/concepts?subject=Math')
      .then(r => r.json())
      .then(setConcepts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="card">
        <p>Pick a concept to learn with a simple story and practice questions.</p>
      </div>
      {loading && <div className="card">Loading...</div>}
      <ul>
        {concepts.map((c:any) => (
          <li key={c.key} className="card">
            <a href={`/learn/${encodeURIComponent(c.key)}`} className="text-primary font-semibold">
              {c.key} <span className="text-slate-500">(Class {c.class})</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 mt-4">
        <a href="/assignments" className="btn">Assignments</a>
        <a href="/dashboard" className="btn-secondary">Teacher Dashboard</a>
      </div>
    </div>
  );
}
