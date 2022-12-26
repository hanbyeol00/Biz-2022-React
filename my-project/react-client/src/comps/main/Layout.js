import Nav from "./Nav";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <Link to="/" className="img">
          이미지 넣을 자리
        </Link>
        <input size="50" />
        <Link to="/user/login" className="login">
          로그인
        </Link>
        <Link to="/user/signUp" className="signUp">
          회원가입
        </Link>
      </header>
      <Nav />
    </div>
  );
};
export default Layout;
