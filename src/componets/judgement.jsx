import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import loading from "./assets/circleLoad.gif";

function Judgement({ pitch, setIsJudged, setPitch }) {
  const [rating, setRating] = useState("0/10");
  const [judgement, setJudgement] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async () => {
    const response = await responeGen(pitch);
    setRating(
      response.split("## Idea Rating:")[1].split("**Judgment:**")[0].trim()
    );
    setJudgement(
      response
        .split("**Judgment:")[1]
        .split("**Comment:**")[0]
        .trim()
        .split("**")[1]
    );
    setComment(response.split("**Comment:")[1].trim().split("**")[1]);

    setTimeout(()=>{
        setIsLoading(false);
    },1000)
  };

  const genAI = new GoogleGenerativeAI(
    "AIzaSyA6QQ5LB53cEzPeVADKZ8tQcVwJZ9ZSakA"
  );

  async function responeGen(idea) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "you are a virtual investor and you will be given an idea your job is to rate that out of /10 give a judgement about how good it is and stuff and also give a short comment on it about 200 characters also act professionly and motivate, give in order ## Idea Rating: **Judgment:** **Comment:**",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const msg = idea;

    const result = await chat.sendMessage(msg);
    return await result.response.text();
  }

  useEffect(() => {
    handleSubmit();
  }, [pitch]);

  return (
    <>
      {isLoading ? (
        <img src={loading} alt="loading" className="loading"/>
      ) : (
        <>
          <div className="rating">{rating}</div>
          <div className="judgeMent">
            <h2>{judgement}</h2>
            <p>{comment}</p>
          </div>
          <button
            onClick={() => {
              setIsJudged(false);
              setPitch("");
              setJudgement("");
              setComment("");
              setRating(0);
              setIsLoading(true);
            }}
          >
            Go Back
          </button>
        </>
      )}
    </>
  );
}

export default Judgement;
