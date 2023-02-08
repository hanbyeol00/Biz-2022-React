import EditorModule from "./EditorModule";
import "../../css/community/Content.css";
import { submitPost } from "../../service/post.service";
import { usePostContext } from "../../context/PostContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const PostWrite = () => {
  const nav = useNavigate();
  const { userSession } = useUserContext();
  const { initPost, postData, setPostData } = usePostContext();
  const [urlData, setUrlData] = useState({ url: "", tag: "" });
  const [urlList, setUrlList] = useState([]);
  const [thumbList, setThumbList] = useState([]);
  const location = useLocation();
  const { b_code, b_eng, b_group_code } = location?.state;
  const data = location?.state?.data;
  const pCode = useParams().post;
  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

  useLayoutEffect(() => {
    // setState 를 같은 함수 내에서 여러 번 실행하면
    // 가장 마지막 setState 만 실행된다.

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

  useEffect(() => {
    setThumbList([...thumbList, urlData.tag]);
    setUrlList([...urlList, urlData.url]);
  }, [urlData, setUrlData]);

  // useEffect(() => {
  //   for (let url of urlList) {
  //     console.log(url);
  //     const data = [...postData.p_content];
  //     const isExist = data.indexOf(url);
  //     console.log(isExist);
  //   }
  // }, [postData]);

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, p_content: data });
  };

  const onClickHandler = async () => {
    let result;
    // insert
    if (!pCode) result = await submitPost(postData);
    // update
    if (pCode) result = await submitPost(postData, pCode);
    if (result.MESSAGE) {
      nav(`/community/${b_eng}`, { replace: true });
    }
  };

  return (
    <form className="post-editor">
      {/* 게시판 리스트 버튼 나열 */}
      <div></div>
      <input
        className="title w-full p-1 pl-2 mb-2 border border-[#ccced1] focus:outline-none focus:border-[#2977ff]"
        name="p_title"
        placeholder="제목"
        value={postData.p_title}
        onChange={onChangeHandler}
      />
      <EditorModule
        data={postData.p_content}
        handler={onChangeContentHandler}
        code={postData.p_code}
        setUrlData={setUrlData}
      />
      <section className="write-thumb mt-2 p-2 pl-4 w-full border border-[#ccced1]">
        <span className="select-none">대표 이미지</span>
        <div className="thumb-select w-full h-40 flex items-center gap-5">
          {thumbList}
        </div>
      </section>
      <button
        id="submit"
        className={`m-6 float-right ${btnClass}`}
        type="button"
        onClick={onClickHandler}
        disabled={
          postData.p_title.length < 0 || postData.p_content < 0 ? true : false
        }
      >
        등록
      </button>
    </form>
  );
};

export default PostWrite;
