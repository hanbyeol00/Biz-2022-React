import ViewItem from "./ViewItem";
import "../../css/community/MainView.css";
const MainView = () => {
  return (
    <>
      <table className="mainView">
        <thead>
          <tr>
            <th>id</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성시간</th>
            <th>조회수</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
        </tbody>
      </table>
      <div className="select">
        <select>
          <option>제목</option>
          <option>내용</option>
          <option>제목+내용</option>
          <option>글쓴이</option>
        </select>
        <input></input>
        <button>검색</button>
        <div className="write">
          <button>글쓰기</button>
        </div>
      </div>
    </>
  );
};
export default MainView;
