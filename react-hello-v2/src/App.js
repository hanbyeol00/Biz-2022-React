import "./App.css";
import Header from "./comps/Header";
import Nav from "./comps/Nav";
import Body from "./comps/Body";
import Input from "./comps/Input";
import { useState } from "react";

const App = () => {
  /**
   * react 의 useState 를 이용하여 상태변수와 상태함수 만들기
   * student 는 상태변수, setStudent 는 상태함수
   *
   * 상태변수 = 화면에 값을 표현(rendering)하는 변수
   * 상태함수 = 상태변수를 바꾸는 함수
   */
  const [student, setStudent] = useState({
    name: "홍길동",
    dept: "컴퓨터공학",
    grade: 3,
    tel: "010-111-1111",
    addr: "광주광역시 북구",
  });

  // 홍길동 문자열을 저장할 st_name 변수를 선언
  // st_name 변수값을 변경할 setName 상태함수 선언
  const [st_name, setName] = useState("홍길동");

  const nameChange = (st_name) => {
    console.log("App.js", st_name);
    // 상태객체변수 student 의 값 변경
    // student.name = st_name;
    setStudent({ ...student, name: st_name });

    // 상태문자열변수 st_name 의 값 변경
    // st_name = "이몽룡"
    // React 에게 st_name 변수의 값을 변경했으니
    // 화면에 표시되는 부분에 reRendering 을 해달라 라는
    // 요청
    setName("이몽룡");
  };

  return (
    <div className="App">
      <Header />
      <Nav />
      <Body std={student} />
      <Input nameChange={nameChange} />
    </div>
  );
};

export default App;
/**
 * 호이스팅
 * 1. 호이스팅은 변수를 선언하고 초기화했을 때,
 *    선언 부분이 최상단으로 끌어올려지는 현상을 말한다
 * 2. var 선언문의 경우 변수를 선언하고 초기화하는 과정이 동시에 일어나서
 *    호이스팅이 발생한다
 * 3. 반명 let/const 의 경우 선언과 초기화 단계가 동시에 일어나지 않는다
 *    실행 시점에서 실제 선언부를 만날 때 초기화가 이뤄진다.
 *    그 사이의 시간 TDZ(Temporary Dead Zone)라고 한다
 * 4. 즉 실행 컨텍스트에 변수가 선언은 되었으나 메모리가 할당되지 않아
 *    ReferenceError가 발생한다
 * 5. 함수 호이스팅은 선언문에서 발생한다.
 *    선언된 함수는 상단에서 참조, 호출이 가능하다
 *    함수 표현식은 결국 변수에 할당하는 모습이라 변수 호이스팅의 사례로 볼 수 있다.
 */
