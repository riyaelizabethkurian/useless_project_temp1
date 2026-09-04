import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import roastRouter from "./routes/roast.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());

// Serve static clips
app.use("/clips", express.static(path.join(__dirname, "clips")));
app.use("/clips", express.static(path.join(__dirname, "../client/public/clips")));

// Serve static audio files
app.use("/audio", express.static(path.join(__dirname, "../client/public/audio")));

// API Routes
app.use("/api", roastRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "WHAT'S IN MY BAG Server",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here"),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if it exists (for single-service deployment on Render, Railway, etc.)
const clientDistPath = path.join(__dirname, "../client/dist");
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api") && !req.path.startsWith("/clips") && !req.path.startsWith("/audio")) {
      res.sendFile(path.join(clientDistPath, "index.html"));
    }
  });
}

app.listen(PORT, () => {
  console.log(`👜 WHAT'S IN MY BAG server running at http://localhost:${PORT}`);
  console.log(`✨ API endpoint: http://localhost:${PORT}/api/roast`);
  console.log(`🎬 Clips endpoint: http://localhost:${PORT}/api/clips`);
  console.log(`🔊 Audio endpoint: http://localhost:${PORT}/audio`);
});
