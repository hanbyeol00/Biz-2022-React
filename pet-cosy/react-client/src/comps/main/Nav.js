import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <Link to="AllCommunity">전체 게시판</Link>
        <Link>사진 게시판</Link>
        <Link>질문 게시판</Link>
        <Link>유머 게시판</Link>
        <Link to="animal_hospital">동물병원</Link>
      </ul>
    </nav>
  );
};
export default Nav;
