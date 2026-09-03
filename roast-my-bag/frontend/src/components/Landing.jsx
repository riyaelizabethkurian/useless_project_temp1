export default function Landing({ onStart }) {
  return (
    <div className="screen landing">
      <div className="floaty-emojis" aria-hidden="true">
        <span style={{ "--x": "10%", "--delay": "0s" }}>🎒</span>
        <span style={{ "--x": "80%", "--delay": "1s" }}>👜</span>
        <span style={{ "--x": "30%", "--delay": "2s" }}>🧻</span>
        <span style={{ "--x": "60%", "--delay": "0.5s" }}>🔋</span>
        <span style={{ "--x": "45%", "--delay": "1.5s" }}>🧾</span>
      </div>

      <h1 className="title">
        Roast My <span className="highlight">Bag</span> 🔥
      </h1>
      <p className="subtitle">
        Dump out what's inside your bag. We'll dump out your entire personality.
      </p>
      <button className="btn btn-primary big" onClick={onStart}>
        Let's get roasted 😈
      </button>
      <p className="fine-print">100% unserious. 0% therapy-grade advice.</p>
    </div>
  );
}
