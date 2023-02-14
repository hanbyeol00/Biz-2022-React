import EditorModule from "./EditorModule";
import "../../css/community/Content.css";
import { submitPost } from "../../service/post.service";
import { usePostContext } from "../../context/PostContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PostInput from "./PostInput";

const PostWrite = () => {
  const nav = useNavigate();
  const { userSession } = useUserContext();
  const { initPost, postData, setPostData } = usePostContext();
  const location = useLocation();
  const { b_code, b_kor, b_eng, b_group_code } = location?.state || "";
  const [boardVal, setBoardVal] = useState({
    bCode: b_code,
    bKor: b_kor,
    bEng: b_eng,
  });
  const data = location?.state?.data;
  const pCode = useParams().post;
  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

  useEffect(() => {
    // setState 를 같은 함수 내에서 여러 번 실행하면
    // 가장 마지막 setState 만 화면에 반영된다(batch update).
    if (!userSession?.username) {
      alert("로그인 후 이용해주세요.");
      nav(-1);
      return null;
    }

    // insert
    if (!pCode) {
      const init = initPost();
      setPostData({
        ...init,
        username: userSession.username,
        b_code: b_code,
        b_group_code: b_group_code,
      });
    }
    // update
    else {
      setPostData({ ...data });
    }
  }, []);

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, p_content: data });
  };

  const onClickHandler = async () => {
    if (!postData.b_code) {
      alert("게시판을 선택하세요.");
      return null;
    }
    if (!postData.p_title) {
      alert("제목을 입력하세요.");
      return null;
    }
    if (!postData.p_content) {
      alert("내용을 입력하세요.");
      return null;
    }
    if (!userSession?.username) {
      alert("세션이 만료되었습니다.\n로그인 후 다시 시도해주세요.");
      return null;
    }
    let result;
    let data;
    const image = document?.querySelector(".ck-content img");
    if (image) {
      const index = Array?.from(image?.src).lastIndexOf("/");
      const url = image?.src?.slice(index + 1);
      data = { ...postData, p_thumb: url };
    } else {
      data = { ...postData, p_thumb: null };
    }
    // insert
    if (!pCode) result = await submitPost(data);
    // update
    if (pCode) result = await submitPost(data, pCode);
    if (result.MESSAGE) {
      nav(`/community/${boardVal.bEng}`, { replace: true });
    }
    return null;
  };

  return (
    <form className="post-editor">
      <PostInput boardVal={boardVal} setBoardVal={setBoardVal} update={pCode} />
      <EditorModule
        data={postData.p_content}
        handler={onChangeContentHandler}
        code={postData.p_code}
      />
      <button
        id="submit"
        className={`m-6 float-right ${btnClass}`}
        type="button"
        onClick={onClickHandler}
      >
        등록
      </button>
    </form>
  );
};

export default PostWrite;
