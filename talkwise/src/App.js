import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/Nav.css";

function App() {
  const nav = useNavigate();
  const onClickNav = (e) => {
    const target = e.currentTarget;
    const buttonText = target.textContent;
    switch (buttonText) {
      case "질문하기":
        nav("/");
        break;
      case "북마크":
        nav("/bookmarks");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Outlet />
      <div className="floating-btn">
        <div className="button-container">
          <button className="question-button" onClick={onClickNav}>
            질문하기
          </button>
          <button className="bookmark-button" onClick={onClickNav}>
            북마크
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
