import "./css/App.css";
import logo from "./logo.svg";
import Button from "./comps/Button";
import Box from "./comps/Box";
import Section from "./comps/Section";

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
    </div>
  );
};

export default App;
/**
 * MVC(Model View Controller)
 * 1. Model View Controller 패턴은 대부분 패턴의 시초
 * 2. Model은 데이터, 상태, 비즈니스를 나타낸다
 * 3. View는 사용자에게 보여줄 UI와 컨트롤러와 연동
 * 4. Controller(Router)는 동작을 그린다
 * 5. Controller에는 생명주기를 작성, Model(객체)과 View를 가져다가 사용
 * MVP(Model View Presenter)
 * 1. 컨트롤러 중심 부분을 개선, 뷰는 컨트롤러가 가진 화면 구성을 대신, 화면 구성 단에
 *    인터페이스를 가져와 사용해 View 단위 테스트를 가능
 * 2. 프리젠터는 각 기능을 인터페이스 화 해서 센터에서 메소드 별 분할 관리가 가능
 * MVVM(Model View ViewModel)
 * 1. View와 ViewModel 사이에 데이터 바인딩을 사용
 * 2. ViewModel 의 상태에 따라 View 를 갱신
 */
