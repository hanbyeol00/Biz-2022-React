import PopularItem from "./PopularItem";
import "../../css/main/Popular.css";

const Popular = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>게시판</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성시간</th>
          <th>조회수</th>
          <th>좋아요</th>
        </tr>
      </thead>
      <PopularItem />
    </table>
  );
};

export default Popular;
