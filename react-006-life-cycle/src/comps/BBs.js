import { useCallback, useEffect, useRef, useState } from "react";

console.log("선언부");
/**
 * JS 코드의 Top Level Area
 * 여기는 전체적으로 사용하는 변수, 함수를 선언하는 곳
 * 물론 여기는 어떤 코드를 실행할 수 도 있지만
 * 보통 선언부만 작성을 한다
 */
const ClickHandler = () => {
  console.log("clickHandler");
};

const BBs = () => {
  // comps header 의 코드들은 Top Down 방식으로 실행된다
  console.log("Comps Header");

  /**
   * state 변수는 변수값을 변화시키면 화면이 reRendering 된다
   * 코드를 실행하는 과정에서 값을 유지하면서 Rendering 을 방지하는
   * 목적으로 내부적으로 선언하여 사용하는 변수
   */
  const count = useRef(0);
  const [counter, setCounter] = useState(count.current);

  // useState 를 callback 으로 선언하기
  // callback 함수 끝에는 실제 값을 초기화 하는
  // return 이 있어야 한다
  const [username, setUsername] = useState(() => {
    console.log("username State");
    return "han";
  });
  const [book, setBook] = useState(() => {
    console.log("Book State");
    return { title: "JS", author: "홍길동", price: 2000 };
  });

  /**
   * useEffect(cb,[deps])
   * deps 배열이 없으면 Mount 될때 한번만 실행된다
   */
  useEffect(() => {
    console.log("Effect 1번");
    return () => {
      console.log("Effect return");
    };
  }, []);

  /**
   * deps 배열이 있는 경우
   * deps 의 상태에 따라 Effect() 가 달리 실행된다
   * return : 이전 상태가 UnMount 될때
   * 기본 cb : 상태가 Mount 될때 실행
   */
  useEffect(() => {
    console.log(`counter set : ${counter}`);
    return () => {
      console.log(`counter prevSet : ${counter}`);
    };
  }, [counter]);

  //   const counterClick = () => {
  //     console.log("Counter Click");
  //     setCounter(++count.current);
  //   };

  // 함수의 재 사용
  const onCounterClickHandler = useCallback(() => {
    console.log("CounterClick");
    setCounter(++count.current);
  }, []);

  return (
    <>
      <h1>여기는 BBS 메인 화면</h1>
      <h2>{username}</h2>
      {console.log("Comps Body")}
      <h2 onClick={onCounterClickHandler}>Counter : {counter}</h2>
    </>
  );
};
export default BBs;
