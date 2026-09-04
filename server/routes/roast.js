import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateAiRoast } from "../services/geminiService.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clipsRegistryPath = path.join(__dirname, "../data/clipsRegistry.json");

// Helper to read clips registry
function getClipsRegistry() {
  try {
    const raw = fs.readFileSync(clipsRegistryPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading clips registry:", err);
    return { clips: [] };
  }
}

// POST /api/roast - Generate roast based on user's choices
router.post("/roast", async (req, res) => {
  try {
    const { participantName, participantClass, genderPreference, bagType, selectedContents } = req.body;

    if (!bagType || !Array.isArray(selectedContents)) {
      return res.status(400).json({
        error: "Missing required fields: bagType and selectedContents (array) are required."
      });
    }

    const roastResult = await generateAiRoast({
      participantName: participantName || "Suspect",
      participantClass: participantClass || "",
      genderPreference: genderPreference || "Agent of Chaos",
      bagType,
      selectedContents
    });

    // Find the matching clip from registry
    const registry = getClipsRegistry();
    const matchedClip = registry.clips.find(
      c => c.category === roastResult.clipCategory || c.id === roastResult.clipCategory
    ) || registry.clips[0];

    res.json({
      success: true,
      data: {
        ...roastResult,
        matchedClip
      }
    });
  } catch (error) {
    console.error("Failed to generate roast:", error);
    res.status(500).json({
      error: "Internal server error generating roast",
      details: error.message
    });
  }
});

// GET /api/clips - Get full registry of available reaction clips
router.get("/clips", (req, res) => {
  const registry = getClipsRegistry();
  res.json(registry);
});

// POST /api/clips/update - Update clip configuration
router.post("/clips/update", (req, res) => {
  try {
    const { clips } = req.body;
    if (!Array.isArray(clips)) {
      return res.status(400).json({ error: "Invalid clips data format" });
    }
    fs.writeFileSync(clipsRegistryPath, JSON.stringify({ clips }, null, 2), "utf-8");
    res.json({ success: true, message: "Clips registry updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save clips registry" });
  }
});

export default router;
