// 게시글 상세보기
import Reply from "./Reply";
import "../../css/community/PostDetail.css";
import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useState, useLayoutEffect } from "react";
import {
  getDetailPost,
  getReply,
  insertReply,
  upvotePost,
} from "../../service/post.service";
import { usePostContext } from "../../context/PostContextProvider";
import { useLoaderData, Link } from "react-router-dom";

// html tag -> entity -> tag 로 변환하는 과정 필요
// 자기 자신을 참조하도록 테이블 관계 설정
// 댓글을 중첩 구조로 데이터 가공해야 하는지?

export const loader = async ({ params }) => {
  const pCode = params.post;
  const { postData, boardData } = await getDetailPost(pCode);
  const { replyList, replyCount } = await getReply(pCode);
  return {
    board: boardData,
    post: postData,
    reply: replyList,
    count: replyCount,
  };
};

const PostDetail = () => {
  const { board, post, reply, count } = useLoaderData();
  const { replyData, setReplyData, initReply } = usePostContext();
  // reRendering data
  const [upvote, setUpvote] = useState(null);
  const [replyCount, setReplyCount] = useState(null);
  const [replyList, setReplyList] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      setUpvote(post.p_upvote);
      setReplyList([...reply]);
      setReplyCount(count.p_replies);
    })();
  }, []);

  // 임시 username(session context 에서)
  const username = "polly@gmail.com";

  const btnClass01 =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const btnClass02 =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const inputClass =
    "bg-transparent border-b border-blue-700 flex-1 mr-3 py-1 px-2 leading-tight focus:outline-none";

  // 추천 버튼 클릭
  const onClickUpvote = async () => {
    const result = await upvotePost(post.p_code, username);
    if (result) setUpvote(upvote + result[0]);
  };

  // 댓글 입력 데이터 갱신
  const onChangeHandler = (e) => {
    setReplyData({
      ...replyData,
      p_code: post.p_code,
      r_content: e.target.value,
    });
  };

  // 댓글 등록 버튼 클릭
  const onClickReply = async () => {
    const result = await insertReply(replyData);
    if (result) {
      setReplyList([...result.replyList]);
      setReplyCount(result.replyCount.p_replies);
      setReplyData(initReply);
    }
  };

  return (
    <>
      <main className="commu-detail p-5 rounded border border-slate-300">
        <Link className="board p-2" to={`/community/${board.b_eng}`}>
          {board.b_kor}
        </Link>

        <section className="flex p-2 border-b border-slate-300">
          <div className="title flex-1 text-xl font-semibold">
            {post.p_title}
          </div>
          <EyeIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
          <span className="mr-4">{post.p_views}</span>
          <HandThumbUpIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
          <span className="mr-4">{upvote}</span>
          <ChatBubbleOvalLeftEllipsisIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
          <span>{replyCount}</span>
        </section>

        <section className="p-2">
          <img className="inline-block w-50" alt="프로필 이미지" />
          {/* nickname으로 수정 필요 */}
          <span className="nickname pl-2">{post.username}</span>
          <span className="float-right">{`${post.p_date} ${post.p_time}`}</span>
        </section>

        <section className="flex flex-col items-center w-full p-20">
          <div
            className="content w-full pb-20"
            dangerouslySetInnerHTML={{ __html: post.p_content }}
          ></div>

          <button className={btnClass01} onClick={onClickUpvote}>
            <div className="text-xl">{upvote}</div>
            <HandThumbUpIcon className="inline-block m-1 mb-2 h-5 w-5" />
            추천
          </button>
        </section>

        {/* 게시글과 세션 username 비교 후 표시 */}
        <section className="button-box flex justify-end w-full">
          <Link
            className={`${btnClass01} mr-4`}
            to={`/community/write/${post.p_code}`}
            state={{ data: post }}
          >
            수정
          </Link>
          <button className={btnClass01}>삭제</button>
        </section>

        <section className="m-5">
          <div className="text-lg">{`댓글 ${replyCount} 개`}</div>
          <div className="reply-input-box flex mt-5 mb-5 p-10 w-full border border-gray-300 rounded">
            {/* 사용자 nickname 필요 */}
            <input
              className={inputClass}
              type="text"
              value={replyData.r_content}
              onChange={onChangeHandler}
            />
            <button className={btnClass02} onClick={onClickReply}>
              등록
            </button>
          </div>
          <Reply data={replyList} />
        </section>
      </main>
    </>
  );
};

export default PostDetail;
