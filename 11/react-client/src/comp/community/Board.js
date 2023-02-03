// 각 게시판별 페이지
import BoardList from "./BoardList";
import "../../css/community/Board.css";
import { getBoardPosts } from "../../service/post.service";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
  const bEng = params.board;
  const { data, board } = await getBoardPosts(bEng);
  return { data, board };
};

const Board = () => {
  const { data, board } = useLoaderData();

  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const selectClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2";
  const inputClass =
    "bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 p-2";

  return (
    <main className="commu-cat">
      <h1>{board.b_kor}</h1>
      <section className="flex pl-5 pr-5 pb-10 justify-between">
        <button className={`search-select ${selectClass}`}>{"최신순"}</button>
        <div className="hidden">
          <button className="latest">최신순</button>
          <button className="upvote">추천순</button>
          <button className="reply">댓글순</button>
          <button className="views">조회순</button>
        </div>
        <div className="cat-search flex justify-center">
          <input className={inputClass} />
          <button>검색</button>
        </div>
        {/* 관리자 권한 추가 */}
        {board.b_eng !== "notice" && (
          <Link
            className={btnClass}
            to={`/community/write`}
            state={{
              b_code: board.b_code,
              b_group_code: board.b_group_code,
            }}
          >
            글쓰기
          </Link>
        )}
      </section>
      <BoardList data={data} />
    </main>
  );
};

export default Board;
