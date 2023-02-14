import { useEffect, useState } from "react";
import { usePostContext } from "../../context/PostContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import { groupBoardList, getBoardList } from "../../service/post.service";

const PostInput = ({ update, boardVal, setBoardVal }) => {
  const { postData, setPostData } = usePostContext();
  const [showBoard, setShowBoard] = useState(false);
  const [boardInput, setBoardInput] = useState("");
  const [boardList, setBoardList] = useState({});
  const { userSession } = useUserContext();

  /**
   * data
   * [key1:val1, key2:val2, key3:val3...]
   * Object.keys(data) => [key1, key2, key3...]
   * Object.keys(data).map((item)=>data[item]) => [val1, val2, val3...]
   */
  const onClickShowBoard = async () => {
    setShowBoard(!showBoard);
    await getBoardList().then((data) => groupBoardList(data));
  };

  useEffect(() => {
    onChangeSearchBoard(boardInput);
  }, [boardInput]);

  const onChangeSearchBoard = async (value) => {
    setBoardInput(value);
    let result = await fetch(`/community/board/${boardInput}/get`)
      .then((data) => data.json())
      .then((data) => groupBoardList(data));
    setBoardList(result);
  };

  const onChangeTitle = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onClickBoardItem = (b_code, b_kor, b_eng, b_group_code) => {
    setPostData({ ...postData, b_code: b_code, b_group_code: b_group_code });
    setBoardVal({ bCode: b_code, bKor: b_kor, bEng: b_eng });
    setShowBoard(false);
  };

  const SelectList = () => {
    return Object.keys(boardList).map((group) =>
      boardList[group].map((board) => {
        return (
          <div
            className="px-4 py-1 flex justify-between border-b last:border-b-0 border-slate-200 hover:text-blue-500 cursor-pointer"
            style={{
              display:
                Number(userSession?.level) >= Number(board.b_level)
                  ? "flex"
                  : "none",
            }}
            key={board.b_code}
            value={board.b_code}
            onClick={() =>
              onClickBoardItem(
                board.b_code,
                board.b_kor,
                board.b_eng,
                board.b_group_code
              )
            }
          >
            <span>{board.b_kor}</span>
            <small key={group}>{group}</small>
          </div>
        );
      })
    );
  };

  return (
    <section className="relative w-full mb-2 p-1 flex border border-[#ccced1] focus-within:border-[#0d65ff]">
      <button
        className="inline-block w-[138px] pl-2 mr-1 text-left hover:bg-[#f7f7f7]"
        style={{ color: boardVal.bKor ? "inherit" : "#A9A3B7" }}
        type="button"
        onClick={onClickShowBoard}
        disabled={update ? true : false}
      >
        {boardVal.bKor || "게시판"}
      </button>
      <input
        className="peer title flex-1 p-1 pl-3 outline-none border-l border-[#ccced1]"
        name="p_title"
        placeholder="제목"
        value={postData.p_title}
        onChange={onChangeTitle}
      />

      <section
        className="absolute flex flex-col top-full mt-2.5 left-0 w-full mb-2 transition-all duration-200 ease-out z-50 overflow-hidden"
        style={{ maxHeight: showBoard ? "100vh" : "0vh" }}
      >
        <div className="w-full p-5 bg-slate-400">
          <input
            className="w-full p-1 rounded outline-none"
            value={boardInput}
            onChange={(e) => setBoardInput(e.target.value)}
            placeholder="게시판 검색"
          />
        </div>
        <div className="w-full min-h-[64.4vh] h-full p-3 overflow-auto bg-white border-b border-[#ccced1]">
          <SelectList />
        </div>
      </section>
    </section>
  );
};

export default PostInput;

/**
 * cf) onChange event 로 데이터 검색
 *    input value 의 마지막 글자가 잘리는 현상 해결
 * 1. input 에 onChange={event => setValue(event.target.value)} 를 setting
 * 2. state 변수인 value 를 사용하여 fetch 후 검색할 데이터를 가져오는 함수 getList(val) 만들기
 *    (val 의 인수는 event.target.value 여야)
 * 3. useEffect 의 body 영역에 getList(value), 배열에 value 를 각각 setting
 */
