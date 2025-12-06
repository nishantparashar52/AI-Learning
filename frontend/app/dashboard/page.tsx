
'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [heatmap, setHeatmap] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/reports/class').then(r=>r.json()).then(d=>setHeatmap(d.heatmap||[]));
  }, []);

  return (
    <div>
      <div className="card">
        <h2 className="text-xl font-bold">Teacher Dashboard</h2>
        <p className="text-slate-600">Mastery heatmap by objective (last 100 submissions).</p>
      </div>
      <div className="card">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Objective</th>
              <th className="text-left p-2">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {heatmap.map((row:any, i:number) => (
              <tr key={i} className="border-t">
                <td className="p-2">{row.objectiveKey}</td>
                <td className="p-2">{row.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
