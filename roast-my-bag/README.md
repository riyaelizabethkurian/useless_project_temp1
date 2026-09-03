# Roast My Bag 🎒🔥

A React + Node.js app: pick your bag type and what's inside it, get a savage
AI-generated "personality roast."

## Structure

```
roast-my-bag/
  backend/     Express API (calls OpenAI, has a fallback if no key set)
  frontend/    React app built with Vite
```

## 1. Run the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and paste in your OpenAI API key:

```
OPENAI_API_KEY=sk-...
```

> Don't have a key yet? Leave `.env` unedited — the app still works using
> pre-written fallback roasts, so you can build/test the UI first and add
> real AI later.

Start the server:

```bash
npm start
```

Runs on `http://localhost:5000`.

## 2. Run the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` and proxies `/api` calls to the backend
(see `vite.config.js`).

Open `http://localhost:5173` in your browser.

## How it works

1. **Landing** → tap to start
2. **Gender select** (optional, just flavors the roast)
3. **Bag type select** — hover/tap each card to see a roast pop up before you even pick it
4. **Contents select** — multi-select everything in your bag, same hover-roast effect
5. **Analyze My Bag** → funny loading screen with rotating captions
6. **Result card** — final AI-written roast + a "personality diagnosis," shareable via the Web Share API or clipboard copy
7. **Try Again** — resets the whole flow

## Customizing

- **Bag types & contents & their hover-roast lines**: edit `frontend/src/data.js`
- **Colors/fonts/animations**: edit `frontend/src/index.css`
- **The AI prompt** sent to the LLM: edit `buildPrompt()` in `backend/server.js`
- **Swap the LLM provider**: the backend only touches OpenAI's API in one
  place (`server.js`). To use Anthropic's API instead, replace the
  `openai` package with `@anthropic-ai/sdk` and swap the `client.chat.completions.create`
  call for `client.messages.create`.

## Notes on images vs. emoji

Bag type cards use large emoji instead of photos — this keeps the app fully
self-contained (no image licensing/hosting to worry about) while still
looking vibrant. If you want real photos, add an `image` field per bag in
`data.js` and swap `<span className="option-emoji">` for an `<img>` tag in
`BagTypeSelect.jsx`.
