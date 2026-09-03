import { GENDERS } from "../data.js";

export default function GenderSelect({ onSelect, onBack }) {
  return (
    <div className="screen">
      <button className="btn-back" onClick={onBack}>← Back</button>
      <h2 className="step-title">Quick question before the chaos begins</h2>
      <p className="step-subtitle">This just helps us aim the roast correctly.</p>

      <div className="option-grid gender-grid">
        {GENDERS.map((g) => (
          <button key={g.id} className="option-card" onClick={() => onSelect(g.id)}>
            <span className="option-emoji">{g.emoji}</span>
            <span className="option-label">{g.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
