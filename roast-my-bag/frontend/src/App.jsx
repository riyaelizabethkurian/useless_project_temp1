import { useState } from "react";
import Landing from "./components/Landing.jsx";
import GenderSelect from "./components/GenderSelect.jsx";
import BagTypeSelect from "./components/BagTypeSelect.jsx";
import ContentsSelect from "./components/ContentsSelect.jsx";
import Loading from "./components/Loading.jsx";
import ResultCard from "./components/ResultCard.jsx";
import { CONTENTS } from "./data.js";

const STEPS = {
  LANDING: "landing",
  GENDER: "gender",
  BAG: "bag",
  CONTENTS: "contents",
  LOADING: "loading",
  RESULT: "result",
};

export default function App() {
  const [step, setStep] = useState(STEPS.LANDING);
  const [gender, setGender] = useState(null);
  const [bag, setBag] = useState(null);
  const [selectedContentIds, setSelectedContentIds] = useState([]);
  const [roast, setRoast] = useState("");
  const [error, setError] = useState("");

  const toggleContent = (id) => {
    setSelectedContentIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const restart = () => {
    setStep(STEPS.LANDING);
    setGender(null);
    setBag(null);
    setSelectedContentIds([]);
    setRoast("");
    setError("");
  };

  const handleAnalyze = async () => {
    setStep(STEPS.LOADING);
    setError("");

    const selectedContents = CONTENTS.filter((c) => selectedContentIds.includes(c.id));

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender,
          bagType: bag.label,
          contents: selectedContents.map((c) => c.label),
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setRoast(data.roast);
    } catch (err) {
      setError("Couldn't reach the roast engine. Is the backend running?");
      setRoast(
        "The roast machine short-circuited from the sheer chaos of your bag. Try again."
      );
    } finally {
      setStep(STEPS.RESULT);
    }
  };

  const selectedContents = CONTENTS.filter((c) => selectedContentIds.includes(c.id));

  return (
    <div className="app">
      {step === STEPS.LANDING && (
        <Landing onStart={() => setStep(STEPS.GENDER)} />
      )}

      {step === STEPS.GENDER && (
        <GenderSelect
          onBack={() => setStep(STEPS.LANDING)}
          onSelect={(g) => {
            setGender(g);
            setStep(STEPS.BAG);
          }}
        />
      )}

      {step === STEPS.BAG && (
        <BagTypeSelect
          onBack={() => setStep(STEPS.GENDER)}
          onSelect={(b) => {
            setBag(b);
            setStep(STEPS.CONTENTS);
          }}
        />
      )}

      {step === STEPS.CONTENTS && (
        <ContentsSelect
          selected={selectedContentIds}
          onToggle={toggleContent}
          onSubmit={handleAnalyze}
          onBack={() => setStep(STEPS.BAG)}
        />
      )}

      {step === STEPS.LOADING && <Loading />}

      {step === STEPS.RESULT && (
        <>
          {error && <p className="error-banner">{error}</p>}
          <ResultCard
            bag={bag}
            contents={selectedContents}
            roast={roast}
            onRestart={restart}
          />
        </>
      )}
    </div>
  );
}
