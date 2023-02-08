import ReplyList from "./ReplyList";
import { useLayoutEffect } from "react";
import { useUserContext } from "../../context/UserContextProvider";
import { usePostContext } from "../../context/PostContextProvider";
import { insertReply, getReply } from "../../service/post.service";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Reply = ({ code, list, count }) => {
  const { userSession } = useUserContext();
  const {
    replyData,
    setReplyData,
    initReply,
    replyList,
    setReplyList,
    replyCount,
    setReplyCount,
  } = usePostContext();

  useLayoutEffect(() => {
    (async () => {
      setReplyList([...list]);
      setReplyCount(count);
      setReplyData(initReply);
    })();
  }, []);

  /**
   * Reply 를 재사용 가능한 컴포넌트로...
   * 칼럼명을 포함한 데이터와 fetch 함수를 어떻게 해야 할까?
   */

  // 댓글 입력 데이터 갱신
  const onChangeHandler = (e) => {
    setReplyData({
      ...replyData,
      p_code: code,
      r_content: e.target.value,
      username: userSession.username,
      r_parent_code: null,
    });
  };

  // 댓글 등록 버튼 클릭 시 fetch 및 reRendering
  const onClickReply = async () => {
    setReplyData(initReply);
    await insertReply(replyData);
    let data = await getReply(replyData.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
      setReplyData(initReply);
    }
  };

  const btnClass02 =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const inputClass =
    "bg-transparent border-b border-blue-700 flex-1 mr-3 py-1 px-2 leading-tight focus:outline-none";
  const imgDefault = "inline-block h-10 w-10 text-slate-500";

  return (
    <section className="p-5 w-full">
      <div className="text-lg">{`댓글 ${replyCount} 개`}</div>
      <div className="reply-input-box flex gap-3 mt-5 mb-5 p-10 w-full border border-gray-300 rounded">
        {userSession?.profile_image ? (
          <img
            className="rounded-full flex items-center w-10 h-10"
            src={userSession?.profile_image}
            alt="profile"
          />
        ) : (
          <UserCircleIcon className={imgDefault} />
        )}
        <div className="flex items-center">{userSession?.nickname}</div>
        <input
          className={inputClass}
          value={replyData.r_content}
          onChange={onChangeHandler}
          placeholder={
            !userSession?.username
              ? "로그인 후 이용해주세요."
              : "댓글을 입력하세요."
          }
          disabled={!userSession?.username ? true : false}
        />
        <button
          className={btnClass02}
          onClick={onClickReply}
          disabled={!userSession?.username || replyData.r_content.length < 1}
        >
          등록
        </button>
      </div>
      <ReplyList data={replyList} />
    </section>
  );
};

export default Reply;
