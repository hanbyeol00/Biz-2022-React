// 각 게시판별 페이지
import BoardList from "./BoardList";
import "../../css/community/Board.css";
import { getBoardPosts } from "../../service/post.service";
import { useLoaderData, Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";
import { BarsArrowDownIcon } from "@heroicons/react/24/outline";
import { useState, useLayoutEffect } from "react";

export const loader = async ({ params }) => {
  const bEng = params.board;
  const order = "latest";
  const { data, board } = await getBoardPosts(bEng, order);
  return { data, board };
};

const Board = () => {
  const { userSession } = useUserContext();
  const { data, board } = useLoaderData();
  const orderList = [
    { o_eng: "latest", o_kor: "최신순" },
    { o_eng: "upvotes", o_kor: "추천순" },
    { o_eng: "replies", o_kor: "댓글순" },
    { o_eng: "views", o_kor: "조회순" },
  ];
  const searchList = [
    { s_eng: "title_content", s_kor: "제목+내용" },
    { s_eng: "title", s_kor: "제목" },
    { s_eng: "content", s_kor: "내용" },
    { s_eng: "nickname", s_kor: "닉네임" },
    { s_veng: "reply", s_kor: "댓글" },
  ];
  const [postList, setPostList] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [orderValue, setOrderValue] = useState(`${orderList[0].o_kor}`);
  const [searchValue, setSearchValue] = useState({
    eng: `${searchList[0].s_eng}`,
    kor: `${searchList[0].s_kor}`,
  });
  // 정렬기준 선택에 따라 게시글 리스트를 변경해야 함
  useLayoutEffect(() => {
    setPostList([...data]);
  }, [data]);

  const onClickSetOrder = async (value, text) => {
    const { data } = await getBoardPosts(board.b_eng, value);
    setPostList([...data]);
    setOrderValue(text);
    setShowOrder(false);
  };

  const onClickSetSearchBy = (value, text) => {
    setSearchValue({ ...searchValue, eng: value, kor: text });
    setShowSearch(false);
  };

  const btnClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const btnClass02 =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const selectClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2";
  const optionClass = "w-full p-2 hover:bg-blue-500 hover:text-white";
  const inputClass =
    "bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 p-2";

  return (
    <main className="commu-cat w-full">
      <div className="border-2 rounded border-slate-400 text-xl font-bold p-2 mb-5">
        {board.b_kor}
      </div>
      <section className="flex w-full px-5 pb-5 justify-between">
        <button
          className={`order-select relative w-30 ${selectClass}`}
          onClick={() => setShowOrder(true)}
          onBlur={() => setShowOrder(false)}
        >
          <BarsArrowDownIcon className="inline-block mr-3 h-5 w-5 text-slate-500" />
          {orderValue}
          <div
            className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
            style={{ display: showOrder === true ? "flex" : "none" }}
          >
            {orderList.map((order) => {
              return (
                <div
                  key={order.o_eng}
                  className={optionClass}
                  value={order.o_eng}
                  onClick={() => onClickSetOrder(order.o_eng, order.o_kor)}
                >
                  {order.o_kor}
                </div>
              );
            })}
          </div>
        </button>
        <div className="cat-search flex gap-5 justify-center">
          <button
            className={`search-select relative w-28 ${selectClass}`}
            type="button"
            onClick={() => setShowSearch(true)}
            onBlur={() => setShowSearch(false)}
          >
            {searchValue.kor}
            <div
              className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
              style={{ display: showSearch === true ? "flex" : "none" }}
            >
              {searchList.map((item) => {
                return (
                  <div
                    key={item.s_eng}
                    className={optionClass}
                    value={item.s_eng}
                    onClick={() => onClickSetSearchBy(item.s_eng, item.s_kor)}
                  >
                    {item.s_kor}
                  </div>
                );
              })}
            </div>
          </button>
          <input className={`${inputClass} w-[30vw]`} />
          <button className={btnClass02}>검색</button>
        </div>
        {/* 로그인 유저의 등급이 게시판 권한등급보다 같거나 높을 때 */}
        {Number(userSession?.level) >= Number(board.b_level) && (
          <Link
            className={btnClass}
            to={`/community/write`}
            state={{
              b_code: board.b_code,
              b_kor: board.b_kor,
              b_eng: board.b_eng,
              b_group_code: board.b_group_code,
            }}
          >
            글쓰기
          </Link>
        )}
      </section>
      <BoardList data={postList} />
    </main>
  );
};

export default Board;
