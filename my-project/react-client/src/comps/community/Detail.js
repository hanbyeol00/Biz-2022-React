import { useCommunityContext } from "../../Context/CommunityContext";
import { useLocation } from "react-router-dom";
import "../../css/community/Detail.css";

const Detail = () => {
  const { detail, setDetail, deleteItem, updateItem } = useCommunityContext();
  const location = useLocation();
  /*
  useEffect(() => {
    const Refresh = async () => {
      console.log(location.pathname);
      const num = location.pathname.split(/[/]/);
      console.log(num[2]);
      try {
        const res = await fetch(`/board/detail/${num[2]}`, { method: "GET" });
        const result = await res.json();
        await setDetail({ ...result });
      } catch (err) {
        console.log(err);
      }
    };
    Refresh();
  }, []);
  */
  const deleteData = (e) => {
    if (window.confirm(`게시글을 삭제합니다`)) {
      const target = e.target;
      const parent = target.closest("DIV");
      const id = parent.dataset.id;
      deleteItem(id);
    }
  };

  const updateData = (e) => {
    const target = e.target;
    const parent = target.closest("DIV");
    const id = parent.dataset.id;
    updateItem(id);
  };

  return (
    <div className="detail">
      <h2 className="header">게시글 상세정보</h2>
      <div className="seq">
        <div>
          <label>게시글번호</label>
          <label>{detail.seq}</label>
        </div>
      </div>
      <div className="detailItem">
        <div className="item">
          <div className="title">
            <label>제목</label>
            <label>{detail.b_title}</label>
          </div>
          <div className="nickname">
            <label>작성자</label>
            <label>{detail.b_nickname}</label>
          </div>
          <div className="views">
            <label>조회수</label>
            <label>{detail.b_views}</label>
          </div>
        </div>
      </div>
      <div className="content">
        <div>{detail.b_content}</div>
      </div>
      <div className="buttonBox" data-id={detail.seq}>
        <button className="updateButton" onClick={updateData}>
          수정
        </button>
        <button className="deleteButton" onClick={deleteData}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default Detail;
