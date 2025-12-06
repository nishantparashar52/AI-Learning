
'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [heatmap, setHeatmap] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/reports/class').then(r=>r.json()).then(d=>setHeatmap(d.heatmap||[]));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h2>Teacher Dashboard</h2>
      <p>Mastery heatmap by objective (last 100 submissions).</p>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr><th style={{ border: '1px solid #ccc', padding: 8 }}>Objective</th><th style={{ border: '1px solid #ccc', padding: 8 }}>Accuracy</th></tr>
        </thead>
        <tbody>
          {heatmap.map((row:any, i:number) => (
            <tr key={i}><td style={{ border: '1px solid #ccc', padding: 8 }}>{row.objectiveKey}</td><td style={{ border: '1px solid #ccc', padding: 8 }}>{row.accuracy}%</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
