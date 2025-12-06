
export const metadata = { title: 'Real-World AI Learning — Demo' };
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="mb-4">
            <h1 className="text-2xl font-bold text-primary">Real-World AI Learning</h1>
            <p className="text-slate-600">Student-friendly demo with concept cards and practice.</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
