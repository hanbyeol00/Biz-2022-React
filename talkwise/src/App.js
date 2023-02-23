import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import "./App.css";
import Bookmark from "./comps/Bookmark";

function App() {
  const [question, setQuestion] = useState("");
  const [answering, setAnswering] = useState("");
  const [loading, setLoading] = useState(false);
  const [base64Audio, setBase64Audio] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setQuestion(result);
    },
  });

  useEffect(() => {
    if (base64Audio) {
      const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
      audio.play();
    }
  }, [base64Audio]);

  useEffect(() => {
    const translation = async () => {
      const fetchOption = {
        method: "POST",
        body: JSON.stringify({ voice: question }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("/test/papago", fetchOption);
      const { text, audioContent } = await res.json();
      setAnswering(text);
      setBase64Audio(audioContent);
    };
    if (question) {
      setLoading(true);
      translation();
      setLoading(false);
    }
  }, [question]);

  const handleListen = () => {
    setQuestion("");
    setAnswering("");
    listen({ interimResults: false });
  };

  return (
    <>
      {/* <div className="container">
        <h1>Talkwise</h1>
        <label>질문내용:</label>
        <input className="question" disabled value={question} />
        <button
          // onMouseDown={() => listen({ interimResults: false })}
          // onMouseUp={stop}
          onClick={handleListen}
          className="voice-button"
          disabled={loading ? "disabled" : ""}
        >
          {loading ? "응답 대기중..." : "🎤"}
        </button>
        {listening && (
          <>
            <div className="listening">음성인식 활성화 중</div>
          </>
        )}
        <div className="answer">
          {answering === "" ? (
            <p>
              질문을 하고 잠시만 기다리시면 여기에 답변이 나옵니다!
              <br />
              오른쪽 상단에 하트를 클릭하시면 북마크에 추가가 됩니다!
            </p>
          ) : (
            <p>{answering}</p>
          )}
          <button className="heart">&#10084;</button>
        </div>
        <div className="floating-btn">
          <div className="button-container">
            <button className="question-button">질문하기</button>
            <button className="bookmark-button">북마크</button>
          </div>
        </div>
      </div> */}
      <Bookmark />
    </>
  );
}

export default App;
