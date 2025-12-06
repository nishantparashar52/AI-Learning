
'use client';
import { useEffect, useState } from 'react';

export default function Assignments() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState('Percentage – Practice 2');

  useEffect(() => {
    fetch('http://localhost:4000/assignments?class=5&section=A').then(r=>r.json()).then(setItems);
  }, []);

  const create = async () => {
    const res = await fetch('http://localhost:4000/assignments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ school_id: 'demo-school', class: 5, section: 'A', title, questionIds: [], dueDate: new Date() }) });
    const doc = await res.json();
    setItems(prev => [doc, ...prev]);
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h2>Assignments</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} style={{ padding: 8, width: '60%' }} />
      <button onClick={create} style={{ marginLeft: 8, padding: '8px 16px' }}>Create</button>
      <ul>
        {items.map((a:any) => (
          <li key={a._id}>{a.title} — Class {a.class}{a.section} (due {new Date(a.dueDate).toLocaleDateString()})</li>
        ))}
      </ul>
    </div>
  );
}
