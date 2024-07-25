import { useState } from "react";
import PitchForm from "./componets/pitchForm";
import Judgement from "./componets/judgement";
import "./App.css";

function App() {
  const [pitch, setPitch] = useState("");
  const [isJudged, setIsJudged] = useState(false);

  return (
    <div className="App">
      <div className="pitchForm">
        {isJudged ? (
          <Judgement
            pitch={pitch}
            setIsJudged={setIsJudged}
            setPitch={setPitch}
          />
        ) : (
          <PitchForm setPitch={setPitch} setIsJudged={setIsJudged} />
        )}
      </div>
    </div>
  );
}

export default App;
