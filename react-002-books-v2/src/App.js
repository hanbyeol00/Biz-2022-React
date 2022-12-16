import "./css/App.css";

import BookMain from "./comps/BookMain";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>나의 독서록</h1>
      </header>
      <BookMain />
    </div>
  );
};

export default App;
/**
 * ReactJS
 * state(상태)
 * 1. 컴포넌트의 렌더링 결과물에 영향을 주는 데이터를 갖는 변수, 객체, 배열
 *    통합적으로 state 객체라 부른다
 * 2. setState() 함수는 state 객체에 대한 업데이트 실행
 *    state 객체가 업데이트(변경) 되면 컴포넌트는 reRendering 된다
 * 3. setState() 는 비동기 방식으로 작동한다
 *    setState() 함수가 호출된 직후 새로운 값이 state 객체의 값에
 *    반영될 것으로 믿어서는 안된다
 *    이는 불필요한 reRendering을 방지하기 위함이다
 */
