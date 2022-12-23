import PopularItem from "./PopularItem";
import "../../css/main/Popular.css";

const Popular = () => {
  return (
    <>
      <h3 className="popular">인기글</h3>
      <table className="popular">
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
    </>
  );
};

export default Popular;
