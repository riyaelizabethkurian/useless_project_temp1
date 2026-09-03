import { useState } from "react";

export default function ResultCard({ bag, contents, roast, onRestart }) {
  const [copied, setCopied] = useState(false);

  const shareText = `${bag.emoji} My bag personality, according to Roast My Bag:\n\n"${roast}"\n\nTry it yourself 🎒🔥`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        // user cancelled share, fall through to copy
      }
    }
    handleCopy();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available, ignore
    }
  };

  return (
    <div className="screen">
      <div className="result-card">
        <div className="result-header">
          <span className="result-emoji">{bag.emoji}</span>
          <h2>Your Bag Personality</h2>
        </div>

        <div className="result-chips">
          {contents.map((c) => (
            <span key={c.id} className="chip">
              {c.emoji} {c.label}
            </span>
          ))}
        </div>

        <p className="roast-text">"{roast}"</p>
      </div>

      <div className="result-actions">
        <button className="btn btn-primary" onClick={handleShare}>
          {copied ? "Copied! ✅" : "Share this roast 📤"}
        </button>
        <button className="btn btn-secondary" onClick={onRestart}>
          Try Again 🔁
        </button>
      </div>
    </div>
  );
}
