import "../../css/community/write.css";
import { useCommunityContext } from "../../Context/CommunityContext";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const {
    detail,
    buttonsubmit,
    onContentHandler,
    onCategoryHandler,
    onTitleHandler,
  } = useCommunityContext();
  const nav = useNavigate();
  const navCreateHandler = () => {
    nav("/AllCommunity");
  };

  const saveData = async (e) => {
    const target = e.target;
    const parent = target.closest("DIV");
    const id = parent.dataset.id;
    buttonsubmit(id);
  };

  return (
    <div className="writeMain">
      <div className="write title">
        <input
          defaultValue={detail.b_title}
          onChange={onTitleHandler}
          placeholder="제목을 입력해주세요"
        />
        <select defaultValue={detail.b_category} onChange={onCategoryHandler}>
          <option>카테고리</option>
          <option>공지사항</option>
          <option>자유게시판</option>
          <option>유머게시판</option>
        </select>
      </div>
      <div className="write content">
        <textarea
          defaultValue={detail.b_content}
          onChange={onContentHandler}
          cols="100"
          rows="30"
        />
      </div>
      <div className="write button" data-id={detail.seq}>
        <button onClick={navCreateHandler}>취소</button>
        <button onClick={saveData}>저장</button>
      </div>
    </div>
  );
};
export default Write;
