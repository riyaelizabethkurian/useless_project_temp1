/**
 * Fallback Procedural Roaster Engine
 * Computes savage, customized, hilarious personality diagnoses named after
 * iconic Malayalam movie characters, along with their famous movie audio files!
 */

const MALAYALAM_CHARACTERS = [
  {
    id: "damu",
    name: "Dashamoolam Damu (ദശമൂലം ദാമു)",
    movie: "Chattambinadu",
    dialogue: "Enthaada mwone jaada aano? Njan aaraannu ninakkariyilla!",
    dialogueMalayalam: "എന്താടാ മോനേ ജാഡയാണോ? ഞാൻ ആരാണ് എന്ന് നിനക്കറിയില്ലേ?!",
    audioFile: "/audio/damu.m4a",
    criteria: (bag, items) => bag === "chaakku" || items.includes("traffic_ticket") || items.includes("coins")
  },
  {
    id: "ramanan",
    name: "Ramanan (രമണൻ)",
    movie: "Punjabi House",
    dialogue: "Muthalaalee... Enikku jeevikkanam! Ente oru jeevitham tholanjathaane!",
    dialogueMalayalam: "മുതലാളീ... എനിക്ക് ജീവിക്കണം! എന്റെ ഒരു ജീവിതം തൊലഞ്ഞതാണെ!",
    audioFile: "/audio/ramanan.m4a",
    criteria: (bag, items) => bag === "workbag" || items.includes("receipts") || items.length > 8
  },
  {
    id: "gafoor",
    name: "Gafoor Ka Dost (ഗഫൂർ കാ ദോസ്ത്)",
    movie: "Nadodikkattu",
    dialogue: "Gafoor ka dost! Dubai aanu ennu paranju Chennaiyil irakkumo?",
    dialogueMalayalam: "ഗഫൂർ കാ ദോസ്ത്! ദുബായ് ആണെന്ന് പറഞ്ഞു ചെന്നൈയിൽ ഇറക്കുമോ?",
    audioFile: "/audio/gafoor.m4a",
    criteria: (bag, items) => bag === "chaakku" || items.includes("single_sock") || items.includes("hotel_keycard")
  },
  {
    id: "manavalan",
    name: "Manavalan (മണവാളൻ)",
    movie: "Pulival Kalyanam",
    dialogue: "Manavalan and Sons! Ithokke enthu... Vaanam thalaikku mele!",
    dialogueMalayalam: "മണവാളൻ ആൻഡ് സൺസ്! ഇതൊക്കെ എന്ത്... വാനം തലയ്ക്ക് മേലെ!",
    audioFile: "/audio/manavalan.m4a",
    criteria: (bag, items) => bag === "plasticbag" || items.includes("fuzzy_gum")
  },
  {
    id: "cid_dhasan",
    name: "CID Ramdas & Vijayan (സി.ഐ.ഡി ദാസൻ & വിജയൻ)",
    movie: "Nadodikkattu",
    dialogue: "Ellathinum athintethaya samayamundu Dasa...",
    dialogueMalayalam: "എല്ലാത്തിനും അതിന്റേതായ സമയമുണ്ട് ദാസാ...",
    audioFile: "/audio/cid_dhasan.m4a",
    criteria: (bag, items) => bag === "backpack" || items.includes("pens") || items.includes("randomcable")
  },
  {
    id: "nagavalli",
    name: "Nagavalli (നാഗവല്ലി)",
    movie: "Manichitrathazhu",
    dialogue: "Vidamatte? Enne ee muriyil ninnu aarum vidamatte?!",
    dialogueMalayalam: "വിടமாட்டേ? എന്നെ ഈ മുറിയിൽ നിന്ന് ആരും വിടமாட்டേ?!",
    audioFile: "/audio/nagavalli.m4a",
    criteria: (bag, items) => bag === "handbag" || items.includes("makeup")
  },
  {
    id: "pavanayi",
    name: "Pavanayi (പവനയായി)",
    movie: "Nadodikkattu",
    dialogue: "Pavanayi shavamayi! Real professional killer aanu!",
    dialogueMalayalam: "പവനയായി ശവമായി!",
    audioFile: "/audio/pavanayi.m4a",
    criteria: (bag, items) => items.includes("mystery_object") || items.includes("broken_glasses")
  },
  {
    id: "shaji_pappan",
    name: "Shaji Pappan (ഷാജി പാപ്പൻ)",
    movie: "Aadu",
    dialogue: "Pappanozhiye ivide aarkkum ariyilla... Kettiyedukkum njan!",
    dialogueMalayalam: "പാപ്പനൊഴിയേ ഇവിടെ ആർക്കും അറിയില്ല... കെട്ടിയെടുക്കും ഞാൻ!",
    audioFile: "/audio/shaji_pappan.m4a",
    criteria: (bag, items) => bag === "hugebag" || items.includes("medicine") || items.includes("support_bottle")
  },
  {
    id: "pappu",
    name: "Kuthiravattam Pappu (കുതിരവട്ടം പപ്പു)",
    movie: "Vellanakalude Nadu",
    dialogue: "Ippo shariyakkitharam! Thamarassery churam kayari poyathaanu!",
    dialogueMalayalam: "ഇപ്പൊ ശരിയാക്കിത്തരാം! താമരശ്ശേരി ചുരം കയറി പോയതാണ്!",
    audioFile: "/audio/pappu.m4a",
    criteria: (bag, items) => items.includes("broken_umbrella") || items.includes("leaking_sanitizer")
  },
  {
    id: "appukuttan",
    name: "Appukuttan (അപ്പുക്കുട്ടൻ)",
    movie: "In Harihar Nagar",
    dialogue: "Enikku ariyilla gopeee... Njan onnum arinjilla gopeee!",
    dialogueMalayalam: "എനിക്ക് അറിയില്ല ഗോപീ... ഞാൻ ഒന്നും അറിഞ്ഞില്ല ഗോപീ!",
    audioFile: "/audio/appukuttan.m4a",
    criteria: (bag, items, persona) => persona.includes("Burnout") || persona.includes("College") || items.includes("crushed_snack")
  },
  {
    id: "aadu_thoma",
    name: "Aadu Thoma (ആടുതോമ)",
    movie: "Spadikam",
    dialogue: "Ithu Thomas Chacko... Ray-Ban glassum mundum urithala!",
    dialogueMalayalam: "ഇത് തോമസ് ചാക്കോ... റേബാൻ ഗ്ലാസ്സും മുണ്ടും ഊരിത്തല!",
    audioFile: "/audio/aadu_thoma.m4a",
    criteria: (bag, items, persona) => persona.includes("Gym") || items.includes("broken_glasses")
  },
  {
    id: "stephen",
    name: "Stephen Nedumpally (സ്റ്റീഫൻ നെടുമ്പള്ളി)",
    movie: "Lucifer",
    dialogue: "Ninte thantha alla ente thantha! Kureshi Ab'raam!",
    dialogueMalayalam: "നിന്റെ തന്തയല്ല എന്റെ തന്ത!",
    audioFile: "/audio/damu.m4a",
    criteria: (bag, items) => items.includes("mystery_object") || items.includes("coins")
  }
];

const BAG_ROASTS = {
  backpack: "Ah yes, the portable storage unit.",
  handbag: "Tiny bag. Somehow contains the entire economy.",
  workbag: "Corporate slave detected.",
  hugebag: "Bro are you going somewhere or relocating?",
  plasticbag: "Respectfully… what happened?",
  chaakku: "Respectfully, are you smuggling 50kg of Ponni rice or hiding a body?",
  sack: "Respectfully, are you smuggling 50kg of Ponni rice or hiding a body?"
};

const ITEM_ROASTS = {
  phone: "Your lifeline and main source of posture degradation.",
  powerbank: "Because you can't survive 15 minutes without 100% battery anxiety.",
  snacks: "Emergency emotional support carbs.",
  tissues: "For sudden sneezes or spontaneous crying in the Uber.",
  receipts: "A historical archive of your 69 poor financial decisions since 2021.",
  randomcable: "For a device you haven't owned since 2017.",
  makeup: "Three crusty lip glosses and a shattered compact mirror.",
  pens: "None of which actually write when you need one.",
  coins: "Heavy enough to be used as a blunt weapon in self-defense.",
  medicine: "An expired paracetamol and half a strip of mystery pills.",
  traffic_ticket: "Accruing late penalties faster than your savings account accumulates interest.",
  support_bottle: "Contains 2 liters of lukewarm tap water and 37 stickers you would defend in a duel.",
  tangled_earphones: "Knotted into a complex 4th-dimensional geometry that astrophysicists cannot solve.",
  single_sock: "How did it get here? Where is its brother? Why does it smell like mystery?",
  hotel_keycard: "You stole a blank piece of plastic from a vacation resort and keep it like family treasure.",
  crushed_snack: "Reduced to pure sugar crumbs, lint, and hair at the dark abyss of your bag.",
  gym_card: "You pay $45 every single month just to carry around this laminated token of personal guilt.",
  mystery_key: "You moved out five years ago, but what if the new tenants suddenly need your help?",
  leaking_sanitizer: "Has dissolved three receipts and smells powerfully of hospital-grade tequila.",
  broken_umbrella: "Engineered by engineers who hate humanity; guaranteed to snap backwards immediately.",
  broken_glasses: "Sitting on them in your car wasn't enough to convince you to throw them in the trash.",
  fuzzy_gum: "One piece left, permanently glued to the silver foil and thoroughly coated in bag fuzz.",
  mystery_object: "We won’t ask, but the police might."
};

function selectMalayalamCharacter(bag, contents, persona) {
  const matches = MALAYALAM_CHARACTERS.filter(char => char.criteria(bag, contents, persona));
  if (matches.length > 0) {
    return matches[Math.floor(Math.random() * matches.length)];
  }
  return MALAYALAM_CHARACTERS[Math.floor(Math.random() * MALAYALAM_CHARACTERS.length)];
}

export function generateFallbackRoast({
  participantName = "Anonymous Suspect",
  participantClass = "",
  genderPreference = "Chaos Gremlin",
  bagType = "backpack",
  selectedContents = []
}) {
  const normBag = (bagType || "backpack").toLowerCase().replace(/[^a-z]/g, "");
  const bagRoast = BAG_ROASTS[normBag] || BAG_ROASTS.backpack;
  const count = selectedContents.length;

  // Pick iconic Malayalam Movie Character
  const character = selectMalayalamCharacter(normBag, selectedContents, genderPreference);
  const personalityName = character.name;

  // Compute funny vitals
  const baseSys = 120 + Math.min(65, count * 5 + (normBag === "workbag" ? 25 : 10));
  const baseDia = 80 + Math.min(40, count * 3 + (normBag === "plasticbag" ? 20 : 5));
  const bpState = baseSys > 160 ? "Dangerously High" : baseSys > 140 ? "Spiking on Sight" : "Elevated by Bad Choices";
  const bp = `${baseSys}/${baseDia} mmHg (${bpState})`;

  const stressPercentage = Math.min(100, Math.max(45, 60 + count * 3 + (normBag === "workbag" ? 15 : 0)));
  const stressAdjectives = [
    "Vibrating at 50Hz",
    "Surviving on Pure Spite",
    "Critical Panic Overload",
    "Fueled by Cold Brew & Dread",
    "One Inconvenience Away From Tears"
  ];
  const stressLevel = `${stressPercentage}% (${stressAdjectives[count % stressAdjectives.length]})`;

  const stupidityScore = Math.min(99.9, Math.max(50, 72 + (count * 2.1))).toFixed(1);
  const stupidityAdjectives = [
    "Weaponized Incompetence",
    "Astonishingly High",
    "Clinically Unadvisable",
    "Defying Modern Science",
    "Zero Survival Instinct"
  ];
  const stupidity = `${stupidityScore}% (${stupidityAdjectives[count % stupidityAdjectives.length]})`;

  const deficiencies = [
    "Lack of Common Sense & Boundaries",
    "Lack of Sleep & Serotonin",
    "Lack of Financial Literacy (Critical)",
    "Lack of Impulse Control",
    "Lack of Adult Supervision",
    "Lack of Clean Dopamine Receptors",
    "Lack of Garbage Disposal Awareness"
  ];
  const lackOf = deficiencies[(count + personalityName.length) % deficiencies.length];

  const chaosLevel = `${Math.min(99, Math.max(35, count * 6 + (normBag === "plasticbag" ? 30 : 10)))}%`;
  const survivalOdds = `${Math.max(2, 95 - count * 6 - (normBag === "plasticbag" ? 20 : 0))}%`;

  // Custom roast paragraph woven with Malayalam cinema energy
  const suspectPrefix = participantName !== "Anonymous Suspect" ? `Look here, ${participantName}${participantClass ? ` of ${participantClass}` : ''}: ` : '';
  let roastParagraph = `${suspectPrefix}${bagRoast} You walk into the room carrying this contraption, and frankly, the vibe is 100% ${character.name} from the cult classic ${character.movie}. `;

  if (selectedContents.includes("traffic_ticket")) {
    roastParagraph += `Carrying an unpaid traffic citation alongside 69 receipts proves your legal strategy is identical to Dashamoolam Damu: pure bravado followed by absolute disaster. `;
  } else if (normBag === "chaakku") {
    roastParagraph += `Dragging around a literal Chaakku (ചാക്ക്) filled with mystery items proves you're ready to board Gafoor's illegal boat to Dubai at a moment's notice. `;
  } else if (selectedContents.includes("receipts") && selectedContents.includes("randomcable")) {
    roastParagraph += `Carrying 69 thermal receipts alongside a mystery charging cable proves your brain runs on Ramanan's level of panic and unresolved workplace trauma. `;
  } else {
    roastParagraph += `The terrifying synergy of these packed items suggests you are preparing for a comedic climax that would make Priyadarshan proud. `;
  }

  roastParagraph += `As a verified "${genderPreference}", this setup confirms you are officially diagnosed as ${character.name}!`;

  return {
    source: "local-humor-engine",
    personalityName,
    characterId: character.id,
    characterMovie: character.movie,
    famousDialogue: character.dialogue,
    dialogueMalayalam: character.dialogueMalayalam,
    audioFile: character.audioFile,
    roastTitle: bagRoast,
    roastParagraph,
    psychologicalBreakdown: `Subject exhibits acute symptoms of ${character.name} syndrome: chronic overconfidence masked by catastrophic administrative failure. Famous dialogue from ${character.movie}: "${character.dialogue}"`,
    verdict: `Guilty of Being ${character.name}`,
    scores: {
      bp,
      stressLevel,
      stupidity,
      lackOf,
      chaosLevel,
      survivalOdds
    }
  };
}
