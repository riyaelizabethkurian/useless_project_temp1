<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# Project Name:Personality in my bag


## Basic Details
### Team Name: Nothing 


### Team Members
- Team Lead: Riya Elizabeth Kurian - Govt Model Engineering College
- Member 2: Goutham Krishna - Govt Model Engineering College


### Project Description
An AI-based system that analyzes the items in a person’s bag to identify their interests, habits, and lifestyle. It then uses these patterns to generate a fun, personalized personality profile.

### The Problem (that doesn't exist)
I’m solving the ridiculous problem of not knowing what your bag says about your personality.

### The Solution (that nobody asked for)
 My website lets users enter the contents of their bag and generates a funny, personalized roast based on their items. Because apparently, your emergency snacks, tangled earphones, and random receipts are enough to expose your entire personality.
 
## Technical Details
### Technologies/Components Used
For Software:
- Javascript,CSS,HTML
- React 
- react, react-dom, lucide-react, html-to-image, canvas-confetti, tailwindcss, autoprefixer, autoprefixer, postcss, vite, @vitejs/plugin-react, express, @google/generative-ai, cors , dotenv
- [Tools used]


### Implementation
For Software:
# Installation
npm install

# Run
npm run dev

### Project Documentation
For Software:

# Screenshots (Add at least 3)
### Screenshot 1 — The user Inputs
![Home Page](images/img1.png.png)
The landing page of BagPersona where users can start the analysis.

### Screenshot 2 — Who is carrying the Bag
![Bag Upload](images/img2.png.png)
Users upload an image of their bag for personality analysis.

### Screenshot 3 — Bag type
![Image Analysis](images/img3.png.png)
The uploaded bag image is processed by the system.

### Screenshot 4 — Items in the bag
![Detected Items](images/img4.png.png)
The system identifies the objects present in the bag.

### Screenshot 5 — Final Result
![Final Result](images/img6.png.png)
The final personalized personality profile generated from the bag contents.

# Diagrams
+=============================================================================+
|                      "WHAT'S IN MY BAG?" WORKFLOW                           |
+=============================================================================+
  [ START: User lands on Application ]
                     │
                     ▼
  +-------------------------------------------------------------------------+
  | STEP 0: SUSPECT REGISTRATION & WEBCAM MUGSHOT                           |
  | Component: <ParticipantStep />                                          |
  |                                                                         |
  |  • Input Suspect Name (e.g., "John")                                    |
  |  • Input Class / Department (e.g., "B.Tech CSE")                        |
  |  • WebCam Stream (via navigator.mediaDevices.getUserMedia)              |
  |    -> Click [Snap Photo] -> Captured to Base64 Image                    |
  |    -> Or fallback to file upload / skip photo                           |
  |  • Accompanied by Animated Dancing Detective                            |
  +-------------------------------------------------------------------------+
                     │
                     │ [Next Button Clicked]
                     ▼
  +-------------------------------------------------------------------------+
  | STEP 1: CHOOSE PERSONA ARCHETYPE                                        |
  | Component: <PreferenceStep />                                           |
  |                                                                         |
  |  • Select Character Archetype (Over-Prepared, Sleep-Deprived, etc.)     |
  |  • Neon border lines reveal only on cursor hover                        |
  +-------------------------------------------------------------------------+
                     │
                     │ [Next Button Clicked]
                     ▼
  +-------------------------------------------------------------------------+
  | STEP 2: WEAPON OF PORTABILITY (BAG SELECTION)                           |
  | Component: <BagTypeStep />                                              |
  |                                                                         |
  |  • Select Bag: "Pashavala Chaakku (പച്ചവല ചാക്ക്)", Backpack, etc.      |
  |  • Neon border lines reveal only on cursor hover                        |
  +-------------------------------------------------------------------------+
                     │
                     │ [Next Button Clicked]
                     ▼
  +-------------------------------------------------------------------------+
  | STEP 3: CONFESS YOUR SINS (CONTRABAND ITEMS)                            |
  | Component: <ContentsStep />                                             |
  |                                                                         |
  |  • Multi-select chaotic bag contents:                                   |
  |    [x] 69 Old Receipts                                                  |
  |    [x] Fuzzy Half Pack of Gum                                           |
  |    [x] Single Sock                                                      |
  |    [x] Leaking Hand Sanitizer                                           |
  |    [x] Crushed Granola Candy                                            |
  |    [x] Mini Umbrella, Tangled Chargers, etc.                            |
  |  • Live bag capacity & chaos meter updates in real-time                 |
  +-------------------------------------------------------------------------+
                     │
                     │ [Click: "ANALYZE MY CHAOTIC BAGGAGE"]
                     ▼
  +-------------------------------------------------------------------------+
  | LOADING & DIAGNOSTIC SCANNING                                           |
  | Component: <LoadingScreen />                                            |
  |                                                                         |
  |  • Minimum 2.4-second comedic delay for suspense and comedic timing     |
  |  • Radar animation + Dancing Detective companion on duty                |
  +-------------------------------------------------------------------------+
                     │
                     │ HTTP POST /api/roast
                     ▼
  +-------------------------------------------------------------------------+
  | SERVER ANALYSIS ENGINE                                                  |
  | Endpoint: server/routes/roast.js                                        |
  |                                                                         |
  |               ┌──────────────────┴──────────────────┐                   |
  |               ▼                                     ▼                   |
  |   [GEMINI 2.5 FLASH API]                 [LOCAL OFFLINE ROASTER]        |
  |   (If API key is present)                (Fallback / Offline mode)      |
  |   • Evaluates items & chaos              • Rule-based character matcher |
  |   • Assigns Malayalam cinema             • Pre-compiled Malayalam       |
  |     character & punchline                  dialogues & chaos vitals     |
  |               └──────────────────┬──────────────────┘                   |
  +-------------------------------------------------------------------------+
                     │
                     │ Returns JSON payload:
                     │ { personalityName, dialogue, audioFile, scores: { bp, stress, stupidity, lackOf } }
                     ▼
  +-------------------------------------------------------------------------+
  | STEP 4: OFFICIAL SUSPECT REPORT CARD                                    |
  | Component: <ResultCard />                                               |
  |                                                                         |
  |  [+] Confetti Explosion (canvas-confetti)                               |
  |  [+] Auto-play Authentic Dialogue Audio (/audio/*.m4a)                  |
  |      (Dashamoolam Damu, Ramanan, Gafoor, Manavalan, etc.)               |
  |  [+] Stamped Mugshot Photo with Name & Class                            |
  |  [+] Savage Roast Paragraph & Psychological Breakdown                   |
  |  [+] Chaotic Vitals:                                                    |
  |      • Blood Pressure: 170/115 mmHg (Dangerously High)                  |
  |      • Stress Level: 99.2%                                              |
  |      • Stupidity: 98.7% (Weaponized)                                    |
  |      • Lack Of: Common Sense & Boundaries                               |
  +-------------------------------------------------------------------------+
           │                           │                           │
           ▼                           ▼                           ▼
  [DOWNLOAD DOSSIER]           [PLAY/PAUSE AUDIO]           [TRY AGAIN / RESET]
  • html-to-image exports      • Manual control for         • Stops running audio
    high-res PNG file            movie dialogue audio       • Clears name, class,
                                                              mugshot photo
                                                            • Clears bag & items
                                                            • Resets back to STEP 0
                                                                   │
                                                                   ▼
                                                          [ Return to Step 0 ]

### Project Demo
# Video
https://drive.google.com/file/d/1lJWSkPOhtirzRwZE8wmIKl8DgY5geGY-/view?usp=drivesdk




Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)



