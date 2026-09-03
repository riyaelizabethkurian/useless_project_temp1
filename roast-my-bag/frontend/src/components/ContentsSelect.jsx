import { useState } from "react";
import { CONTENTS } from "../data.js";

export default function ContentsSelect({ selected, onToggle, onSubmit, onBack }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="screen">
      <button className="btn-back" onClick={onBack}>← Back</button>
      <h2 className="step-title">Empty your bag. We won't judge.</h2>
      <p className="step-subtitle">(We absolutely will judge. Pick everything that applies.)</p>

      <div className="option-grid contents-grid">
        {CONTENTS.map((item) => {
          const isSelected = selected.includes(item.id);
          return (
            <button
              key={item.id}
              className={`option-card content-card ${isSelected ? "selected" : ""}`}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(item.id)}
              onBlur={() => setHovered(null)}
              onClick={() => onToggle(item.id)}
            >
              <span className="option-emoji">{item.emoji}</span>
              <span className="option-label">{item.label}</span>
              {isSelected && <span className="check-badge">✓</span>}

              {hovered === item.id && (
                <span className="roast-popup">{item.roast}</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        className="btn btn-primary big analyze-btn"
        disabled={selected.length === 0}
        onClick={onSubmit}
      >
        Analyze My Bag 😂
      </button>
    </div>
  );
}
