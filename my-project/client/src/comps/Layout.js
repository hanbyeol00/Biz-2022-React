import Nav from "./Main/Nav";

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <div className="img">이미지 넣을 자리</div>
        <input size="50" />
        <div className="login">로그인</div>
        <div className="signUp">회원가입</div>
      </header>
      <Nav />
    </div>
  );
};
export default Layout;
