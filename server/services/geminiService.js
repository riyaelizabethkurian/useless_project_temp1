import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateFallbackRoast } from "./fallbackRoaster.js";

export async function generateAiRoast({ participantName, participantClass, genderPreference, bagType, selectedContents }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    console.log("[Roast Engine] No Gemini API key detected. Using offline humor engine.");
    return generateFallbackRoast({ participantName, participantClass, genderPreference, bagType, selectedContents });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a savage, razor-sharp Malayalam cinema buff, stand-up comedian, and licensed "Bag Psychologist".
A user has submitted their bag contents for a brutal, hilarious personality diagnosis.

CRITICAL REQUIREMENT:
You MUST diagnose their personality as an iconic MALAYALAM MOVIE CHARACTER (with Malayalam script and English transliteration, e.g. "Dashamoolam Damu (ദശമൂലം ദാമു)", "Ramanan (രമണൻ)", "Gafoor Ka Dost (ഗഫൂർ കാ ദോസ്ത്)", "Manavalan (മണവാളൻ)", "CID Ramdas & Vijayan (സി.ഐ.ഡി ദാസൻ & വിജയൻ)", "Nagavalli (നാഗവല്ലി)", "Pavanayi (പവനയായി)", "Shaji Pappan (ഷാജി പാപ്പൻ)", "Kuthiravattam Pappu (കുതിരവട്ടം പപ്പു)", "Appukuttan (അപ്പുക്കുട്ടൻ)", "Aadu Thoma (ആടുതോമ)", "Stephen Nedumpally (സ്റ്റീഫൻ നെടുമ്പള്ളി)").

Also provide their famous Malayalam punchline dialogue (both in Manglish and Malayalam script) to be spoken in the background!

User Profile:
- Suspect / Participant Name: "${participantName || 'Anonymous'}"
- Class / Unit: "${participantClass || 'Unspecified'}"
- Gender/Personality Archetype: "${genderPreference}"
- Bag Type: "${bagType}"
- Bag Contents: ${JSON.stringify(selectedContents)}

Respond matching this exact structure:
{
  "personalityName": "Iconic Malayalam character name with Malayalam script (e.g. 'Dashamoolam Damu (ദശമൂലം ദാമു)')",
  "characterMovie": "Movie name (e.g. 'Chattambinadu')",
  "famousDialogue": "Famous Manglish punchline dialogue (e.g. 'Enthaada mwone jaada aano? Njan aaraannu ninakkariyilla!')",
  "dialogueMalayalam": "Dialogue in Malayalam script (e.g. 'എന്താടാ മോനേ ജാഡയാണോ? ഞാൻ ആരാണ് എന്ന് നിനക്കറിയില്ലേ?!')",
  "roastTitle": "A punchy one-liner roast",
  "roastParagraph": "A 2-3 sentence savage roast connecting their bag, items, and this Malayalam character.",
  "psychologicalBreakdown": "A hilarious mock-psychological evaluation comparing them to this character.",
  "verdict": "A humorous verdict (e.g. 'Guilty of Being Dashamoolam Damu')",
  "scores": {
    "bp": "Blood pressure string (e.g. '172/115 mmHg (Dangerously High)')",
    "stressLevel": "Percentage string (e.g. '99.4% (Vibrating at 50Hz)')",
    "stupidity": "Percentage string (e.g. '98.8% (Weaponized Incompetence)')",
    "lackOf": "A deficiency string (e.g. 'Lack of Common Sense & Boundaries')",
    "chaosLevel": "Percentage string between 40% and 99%",
    "survivalOdds": "Percentage string between 2% and 35%"
  }
}

Respond ONLY with the raw JSON object. Do not include markdown code fences or backticks.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    const cleanJson = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanJson);
    return {
      ...parsed,
      source: "gemini-ai"
    };
  } catch (error) {
    console.error("[Roast Engine] Gemini API error, falling back to local engine:", error.message);
    return generateFallbackRoast({ participantName, participantClass, genderPreference, bagType, selectedContents });
  }
}
