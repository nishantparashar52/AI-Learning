
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
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Real-World AI Learning — Demo</h1>
      <p>Select a concept to view the concept card and practice.</p>
      {loading && <p>Loading...</p>}
      <ul>
        {concepts.map((c:any) => (
          <li key={c.key} style={{ margin: '12px 0' }}>
            <a href={`/learn/${encodeURIComponent(c.key)}`}>{c.key} (Class {c.class})</a>
          </li>
        ))}
      </ul>
      <hr />
      <a href="/assignments">Go to Assignments</a> | <a href="/dashboard">Teacher Dashboard</a>
    </div>
  );
}
