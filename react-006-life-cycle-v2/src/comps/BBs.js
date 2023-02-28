import { useBBsContext } from "../context/BBsContextProvider";

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

  const { username, book, onCounterClickHandler, counter } = useBBsContext();

  return (
    <>
      <h1>여기는 BBS 메인 화면</h1>
      <h2>{username}</h2>
      {console.log("Comps Body")}
      <h2 onClick={onCounterClickHandler}>Counter : {counter}</h2>
      <h2>도서명 : {book.title}</h2>
    </>
  );
};
export default BBs;
