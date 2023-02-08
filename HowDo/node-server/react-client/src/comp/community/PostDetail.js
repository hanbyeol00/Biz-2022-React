// 게시글 상세보기
import Reply from "./Reply";
import "../../css/community/Content.css";
import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useState, useLayoutEffect } from "react";
import {
  getDetailPost,
  getReply,
  upvotePost,
  deletePost,
} from "../../service/post.service";
import { usePostContext } from "../../context/PostContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import { useLoaderData, useParams, useNavigate, Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

// html tag -> entity -> tag 로 변환하는 과정 필요
// 자기 자신을 참조하도록 테이블 관계 설정
// 댓글을 중첩 구조로 데이터 가공해야 하는지?
// 같은 데이터를 호출하는 여러 코드들 어떻게 처리?
// 불필요한 전역변수 어떻게 처리?

// hook 은 컴포넌트 함수 또는 커스텀 hook 에서만 호출할 수 있다.
// 따라서 일반 함수에서는 hook 을 호출할 수 없다.
export const loader = async ({ params }) => {
  const pCode = params.post;
  const detail = await getDetailPost(pCode);
  const reply = await getReply(pCode);
  return { detail, reply };
};

const PostDetail = () => {
  const { userSession } = useUserContext();

  const nav = useNavigate();
  const bEng = useParams().board;
  const { detail, reply } = useLoaderData();
  const { replyCount, setReplyCount } = usePostContext();
  const [upvotes, setUpvotes] = useState();
  let board = detail?.board;
  let post = detail?.post;
  let list = reply?.list;
  let count = reply?.count;

  useLayoutEffect(() => {
    (async () => {
      if (detail.ERROR) {
        nav(`/community/${bEng}`, { replace: true });
      }
      setUpvotes(post?.p_upvotes);
      setReplyCount(count);
    })();
  }, []);

  const btnClass01 =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const imgDefault = "inline-block h-10 w-10 text-slate-500";

  // 추천 버튼 클릭
  const onClickUpvote = async () => {
    if (!userSession?.username) {
      alert("로그인 후 이용해주세요.");
      return null;
    }
    const result = await upvotePost(
      post.p_code,
      post.username,
      userSession?.username
    );

    if (result) setUpvotes(upvotes + result[0]);
  };

  // 삭제 버튼 클릭
  const onClickDelete = async () => {
    const result = await deletePost(post.p_code);
    if (result) {
      nav(`/community/${board.b_eng}`, { replace: true });
    }
  };

  // 예외 처리를 하지 않으면 alert 후 navigation 하기 전 오류 발생
  return (
    <main className="commu-detail w-full p-5 mb-10 rounded border border-slate-300">
      <section className="flex p-2 border-b border-slate-300">
        <Link
          className="board inline-block px-2 mr-3 border border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white"
          to={`/community/${board?.b_eng}`}
        >
          {board?.b_kor}
        </Link>
        <div className="title flex-1 text-xl font-semibold">
          {post?.p_title}
        </div>
        <EyeIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
        {/* 게시글 열람하면 조회수가 그대로인데 새로고침, 뒤로가기 하면 올라가는 이유?.. */}
        <span className="mr-4">{post?.p_views}</span>
        <HandThumbUpIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
        <span className="mr-4">{upvotes}</span>
        <ChatBubbleOvalLeftEllipsisIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
        <span>{replyCount}</span>
      </section>

      <section className="p-2">
        {post?.user?.profile_image ? (
          <img
            className="inline-block w-50"
            src={post?.user["profile_image"]}
            alt="profile"
          />
        ) : (
          <UserCircleIcon className={imgDefault} />
        )}
        <span className="nickname pl-2">{post?.user["nickname"]}</span>

        <span className="float-right">{`${post?.p_date} ${post?.p_time}`}</span>
      </section>

      <section className="flex flex-col items-center w-full p-20">
        <div
          className="content w-full pb-20"
          dangerouslySetInnerHTML={{ __html: post?.p_content }}
        ></div>

        <button className={btnClass01} onClick={onClickUpvote}>
          <div className="text-xl">{upvotes}</div>
          <HandThumbUpIcon className="inline-block m-1 mb-2 h-5 w-5" />
          추천
        </button>
      </section>

      {/* 게시글과 세션 username 비교 후 표시 */}
      {userSession?.username === post?.username && (
        <section className="button-box flex justify-end w-full">
          <Link
            className={`${btnClass01} mr-4`}
            to={`/community/${board?.b_eng}/write/${post?.p_code}`}
            state={{ data: post, b_eng: board?.b_eng }}
          >
            수정
          </Link>
          <button className={btnClass01} onClick={onClickDelete}>
            삭제
          </button>
        </section>
      )}

      <Reply code={post?.p_code} list={list} count={replyCount} />
    </main>
  );
};

export default PostDetail;
