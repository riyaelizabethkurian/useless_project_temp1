import { useEffect, useState } from "react";

const LOADING_LINES = [
  "Scanning bag for evidence...",
  "Calculating chaos levels...",
  "Consulting the roast council...",
  "Judging your life choices...",
  "Cross-referencing with your ex's opinion of you...",
  "Finalizing personality diagnosis...",
];

export default function Loading() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((i) => (i + 1) % LOADING_LINES.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen loading-screen">
      <div className="spinner-bag">🎒</div>
      <p className="loading-text">{LOADING_LINES[lineIndex]}</p>
    </div>
  );
}
