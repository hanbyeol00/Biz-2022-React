import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import "../css/TalkwiseMain.css";
const TalkwiseMain = () => {
  const [question, setQuestion] = useState("");
  const [answering, setAnswering] = useState("");
  const [loading, setLoading] = useState(false);
  const [base64Audio, setBase64Audio] = useState("");
  const [bookmarkColor, setBookmarkColor] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setQuestion(result);
    },
  });

  useEffect(() => {
    if (base64Audio) {
      audioPlay();
    }
  }, [base64Audio]);

  const audioPlay = () => {
    const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    audio.play();
  };
  const translation = async () => {
    setLoading(true);
    setQuestion("너가 할수 있는게 뭐가 있니?");
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
    setLoading(false);
  };

  // useEffect(() => {
  //   if (question) {
  //     translation();
  //   }
  // }, [question]);

  const handleListen = () => {
    setQuestion("");
    setAnswering("");
    listen({ interimResults: false });
  };

  const bookmarkInsert = async () => {
    let bookmark = {};
    if (question === "") {
      return alert("질문이 없습니다");
    } else if (answering === "") {
      return alert("답변이 없습니다.");
    } else if (base64Audio === "") {
      return alert("오디오가 존재하지 않습니다");
    }
    setBookmarkColor("red");
    bookmark = {
      question: question,
      answer: answering,
      audio: base64Audio,
    };
    const fetchOption = {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("/test/bookmark/insert", fetchOption);
    const result = await res.json();
    if (result.err) alert(result.err);
  };

  return (
    <>
      <div className="container">
        <h1>Talkwise</h1>
        <label>질문내용:</label>
        <textarea className="question" disabled value={question} />
        <button
          //   onMouseDown={() => listen({ interimResults: false })}
          //   onMouseUp={stop}
          onClick={translation}
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
            <>
              <p>
                질문을 하고 잠시만 기다리시면 여기에 답변이 나옵니다!
                <br />
                오른쪽 상단에 하트를 클릭하시면 북마크에 추가가 됩니다!
              </p>
              <button
                className="heart"
                onClick={() => {
                  alert("질문을 해주세요");
                }}
              >
                &#10084;
              </button>
            </>
          ) : (
            <>
              <p onClick={audioPlay}>{answering}</p>
              <button
                className={`heart ${bookmarkColor}`}
                onClick={bookmarkInsert}
              >
                &#10084;
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default TalkwiseMain;
