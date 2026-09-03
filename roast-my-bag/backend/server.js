import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const hasKey = !!process.env.OPENAI_API_KEY;

const client = hasKey
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Fallback roasts used if no API key is configured, so the app still works out of the box.
const FALLBACK_ROASTS = [
  "Scientific analysis of your bag reveals a chaotic neutral energy: 60% survival instinct, 40% unresolved trauma, and one (1) receipt from 2019 you're emotionally attached to.",
  "Your bag isn't a bag. It's a museum exhibit titled 'Anxiety: A Retrospective.' Every item was chosen by a brain that trusts nothing and no one, especially not the future.",
  "Forensic report: subject is prepared for approximately 14 unrelated emergencies, none of which have ever occurred, while being critically unprepared for the one thing that always happens — running out of phone battery.",
  "This bag has more personality than most people. It contains snacks for a famine that isn't coming, cables for devices that no longer exist, and enough loose coins to bribe a small toll booth.",
  "Diagnosis: main character syndrome, backpack edition. You didn't pack a bag, you packed a personality trait and called it 'being prepared.'",
];

function buildPrompt({ gender, bagType, contents }) {
  const itemList = contents.length ? contents.join(", ") : "literally nothing, an empty void of a bag";
  const genderLine = gender && gender !== "skip" ? `The person identifies as ${gender}.` : "";

  return `You are a savage but PG-13, playful, meme-style roast comedian for a fun web app called "Roast My Bag".
A user selected their bag type and its contents. Write ONE short, punchy, funny "personality roast" paragraph (3-5 sentences max) about them based on this.

Rules:
- Be witty, exaggerated, and absurd, like a Gen-Z meme roast — NOT genuinely mean, offensive, or targeting protected characteristics.
- Never insult based on gender, race, religion, body, or appearance.
- Reference specific items from their bag in a funny way.
- End with a short mock "diagnosis" or "verdict" style label, like a fake personality type.
- No hashtags, no emojis in the text itself (the UI adds those separately).
- Output ONLY the roast paragraph, nothing else.

Bag type: ${bagType}
Contents: ${itemList}
${genderLine}`;
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, aiEnabled: hasKey });
});

app.post("/api/roast", async (req, res) => {
  const { gender, bagType, contents } = req.body || {};

  if (!bagType) {
    return res.status(400).json({ error: "bagType is required" });
  }

  // If no API key is configured, return a random fallback roast so the app is usable immediately.
  if (!hasKey) {
    const roast = FALLBACK_ROASTS[Math.floor(Math.random() * FALLBACK_ROASTS.length)];
    return res.json({ roast, source: "fallback" });
  }

  try {
    const prompt = buildPrompt({ gender, bagType, contents: contents || [] });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      max_tokens: 220,
    });

    const roast =
      completion.choices?.[0]?.message?.content?.trim() ||
      FALLBACK_ROASTS[Math.floor(Math.random() * FALLBACK_ROASTS.length)];

    res.json({ roast, source: "ai" });
  } catch (err) {
    console.error("LLM error:", err.message);
    const roast = FALLBACK_ROASTS[Math.floor(Math.random() * FALLBACK_ROASTS.length)];
    res.json({ roast, source: "fallback", note: "AI call failed, used fallback" });
  }
});

app.listen(PORT, () => {
  console.log(`Roast My Bag backend running on http://localhost:${PORT}`);
  console.log(hasKey ? "AI roasts: ENABLED" : "AI roasts: DISABLED (no OPENAI_API_KEY found, using fallback roasts)");
});
