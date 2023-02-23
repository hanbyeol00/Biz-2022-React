import { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

function App() {
  const [voice, setVoice] = useState("");
  // const [question, setQuestion] = useState("");
  const [answering, setAnswering] = useState("");
  const [base64Audio, setBase64Audio] = useState("");
  const [loading, setLoading] = useState(false);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setVoice(result);
    },
  });
  const translation = async () => {
    setLoading(true);
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ voice: "상대성이론에 대해 설명해줘" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("/test/papago", fetchOption);
    const { text, audioContent } = await res.json();
    setAnswering(text);
    setBase64Audio(audioContent);
    setLoading(false);
  };

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
        body: JSON.stringify({ voice: voice }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("/test/papago", fetchOption);
      const { text, audioContent } = await res.json();
      setAnswering(text);
      setBase64Audio(audioContent);
    };
    if (voice) {
      setLoading(true);
      translation();
      setLoading(false);
    }
  }, [voice]);

  const handleListen = () => {
    setVoice("");
    setAnswering("");
    listen({ interimResults: false });
  };

  console.log(loading);
  return (
    <div>
      <div>{voice}</div>
      <div>{answering}</div>
      <button
        type="button"
        // onMouseDown={() => listen({ interimResults: false })}
        // onMouseUp={stop}
        onClick={translation}
        disabled={loading ? "disabled" : ""}
      >
        🎤
      </button>
      {listening && (
        <>
          <div>음성인식 활성화 중</div>
          <button onClick={stop}>녹음중지</button>
        </>
      )}
    </div>
  );
}

export default App;
