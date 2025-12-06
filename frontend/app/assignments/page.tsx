
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
    <div>
      <div className="card">
        <h2 className="text-xl font-bold">Assignments</h2>
        <div className="mt-2 flex gap-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} className="border rounded-xl px-3 py-2 w-2/3" />
          <button onClick={create} className="btn">Create</button>
        </div>
      </div>
      <ul>
        {items.map((a:any) => (
          <li key={a._id} className="card">
            <div className="font-medium">{a.title}</div>
            <div className="text-slate-600">Class {a.class}{a.section} — due {new Date(a.dueDate).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
