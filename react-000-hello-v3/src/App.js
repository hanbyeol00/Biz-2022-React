import "./css/App.css";
import logo from "./logo.svg";
import Button from "./comps/Button";
import Box from "./comps/Box";
import Section from "./comps/Section";
import Article from "./comps/Article";

const App = () => {
  const buttonStyle = {
    backgroundColor: "black",
    border: "none",
    color: "white",
    padding: "12px 16px",
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Section>
        <Button color="white" backgroundColor="blue">
          클릭하세요
        </Button>
        <Button buttonStyle={buttonStyle}>나도클릭</Button>
        <Button color="yellow" backgroundColor="green">
          클릭하세요
        </Button>
        <Box />
      </Section>
      <Article theme="yellow"></Article>
    </div>
  );
};

export default App;
/**
 * 데이터 영역(Data segment), 또는 Static 영역
 * 1. 애플리케이션이 실행되면서 필요한 변수가 저장되는 영역
 * 2. 애플리케이션이 구동되는 동안 항상 접근 가능 한 영역
 * 3. 클래스 영역에 선언된 전역변수 와 정적변수 영역
 * 스택 영역(Stack segment)
 * 1. 메서드, 함수 내에 정의된 지역변수가 저장되는 영역
 * 2. 메서드, 함수가 호출될때 할당되고 종료될 때 해제된다.
 * 힙영역(Heap segment)
 * 1. 동적 할당영역
 * 2. 인스턴트, 배열 등 참조 변수들이 저장되는 영역
 * 3. 객체 배열을 생성하면 실제 데이터는 Heap에 저장되고
 *    저장소의 주소는 스택에 저장된다
 */
