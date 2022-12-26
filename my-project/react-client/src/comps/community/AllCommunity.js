import "../../css/community/MainView.css";
import { useNavigate } from "react-router-dom";
import { useCommunityContext } from "../../Context/CommunityContext";
import Pagination from "react-js-pagination";

const AllCommunity = () => {
  const {
    onChangeDetailSelect,
    onChangeDetailInput,
    setDetail,
    boardItemView,
    page,
    setPage,
    pageLength,
    selectBoardDetail,
  } = useCommunityContext();

  const nav = useNavigate();
  const navWriteHandler = () => {
    setDetail({});
    nav("/write");
  };

  const pageChangeHandler = (page) => {
    setPage(page);
  };
  const clickBoardDetail = async (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const parent = target.closest("TR");
      const id = parent.dataset.id;
      try {
        const res = await fetch(`/board/detail/${id}`, { method: "GET" });
        const result = await res.json();
        await setDetail({ ...result });
        nav(`/community/${id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <table className="mainView">
        <thead>
          <tr>
            <th>id</th>
            <th>게시판</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성시간</th>
            <th>조회수</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody onClick={clickBoardDetail}>{boardItemView}</tbody>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={pageLength}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={pageChangeHandler}
        />
      </table>
      <div className="select">
        <select onChange={onChangeDetailSelect}>
          <option value="b_title">제목</option>
          <option value="b_content">내용</option>
          <option value="b_title like '%${input}%' or b_content">
            제목+내용
          </option>
          <option value="b_nickname">글쓴이</option>
        </select>
        <input onChange={onChangeDetailInput} />
        <button onClick={selectBoardDetail}>검색</button>
        <div className="write">
          <button onClick={navWriteHandler}>글쓰기</button>
        </div>
      </div>
    </>
  );
};
export default AllCommunity;
