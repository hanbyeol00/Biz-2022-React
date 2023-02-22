import { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

function App() {
  const [voice, setVoice] = useState("");
  // const [question, setQuestion] = useState("");
  const [answering, setAnswering] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setVoice(result);
    },
  });

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
      const result = await res.json();
      setAnswering(result);
    };
    if (voice) {
      translation();
    }
  }, [voice]);

  const handleListen = () => {
    setVoice("");
    setAnswering("");
    listen();
  };
  // console.log(answering);
  return (
    <div>
      <div>{answering}</div>
      <button onClick={handleListen}>🎤</button>
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
