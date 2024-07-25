import { useState } from "react";

function PitchForm(props) {
  const [pitch, setPitch] = useState("");
  return (
    <>
      <h1>Pitch an idea!!!</h1>
      <textarea
        placeholder="Tell me about your idea and what problem it fixes...."
        value={pitch}
        onChange={(e) => setPitch(e.target.value)}
      ></textarea>
      <button
        onClick={() => {
          props.setPitch(pitch);
          props.setIsJudged(true);
        }}
      >
        Submit
      </button>
    </>
  );
}

export default PitchForm;
