import ReplyList from "./ReplyList";
import { useEffect, useState, Suspense } from "react";
import { useUserContext } from "../../context/UserContextProvider";
import { usePostContext } from "../../context/PostContextProvider";
import { insertReply, getReply } from "../../service/post.service";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Reply = ({ writer, p_code = null, v_code = null, list }) => {
  const { userSession } = useUserContext();
  const { initReply, replyList, setReplyList, replyCount, setReplyCount } =
    usePostContext();
  const [replyInput, setReplyInput] = useState(initReply);

  useEffect(() => {
    setReplyList([...list]);
    setReplyInput(initReply);
    if (!window?.location?.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // 댓글 입력 데이터 갱신
  const onChangeHandler = (e) => {
    setReplyInput({
      ...replyInput,
      p_code: p_code,
      v_code: v_code,
      r_content: e.target.value,
      username: userSession.username,
      r_parent_code: null,
    });
  };

  // 댓글 등록 버튼 클릭 시 fetch 및 reRendering
  const onClickReply = async () => {
    setReplyInput(initReply);
    await insertReply(replyInput);
    let data = await getReply(
      replyInput.p_code == null ? replyInput.v_code : replyInput.p_code
    );
    if (data) {
      console.log(data);
      setReplyList([...data.list]);
      setReplyCount(data.count);
      setReplyInput(initReply);
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
          value={replyInput.r_content}
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
          disabled={!userSession?.username || replyInput.r_content.length < 1}
        >
          등록
        </button>
      </div>
      <ReplyList writer={writer} data={replyList} />
    </section>
  );
};

export default Reply;
