import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import "./App.css";
import { CLIENT_ID, CLIENT_SECRET, PAPAGO_URL } from "./config/naver_config";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });

  const fetchOption = {
    baseURL:
      "https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/",
    headers: {
      [CLIENT_ID.KEY]: CLIENT_ID.VALUE,
      [CLIENT_SECRET.KEY]: CLIENT_SECRET.VALUE,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      source: "ko",
      target: "en",
      text: "안녕하세요",
    }),
  };
  const onClickHandler = async () => {
    const res = await axios.post("papago/n2mt", fetchOption);
    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="App">
      <div>{value}</div>
      <button onClick={listen}>🎤</button>
      {listening && (
        <>
          <div>음성인식 활성화 중</div>
          <button onClick={stop}>녹음중지</button>
        </>
      )}
      <button onClick={onClickHandler}>안녕하세요 영어로 번역</button>
    </div>
  );
}

export default App;
