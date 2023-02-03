import { useState, useRef } from "react";

const ReplyItem = ({ data, item }) => {
  const itemRef = useRef(null);
  const [inputData, setInputData] = useState();

  const ShowChildReply = () => {
    itemRef.current.style.display = "flex";
  };

  return (
    <li className="list-none w-full p-5 border-b border-gray-200 first:border-t">
      <div className="flex">
        <img className="inline-block mr-3" alt="프로필 이미지" />
        <span className="flex-1">{item.username}</span>
        <span>{`${item.r_date} ${item.r_time}`}</span>
      </div>
      <div className="pt-5 pb-5">{item.r_content || "삭제된 댓글입니다."}</div>
      <div className="w-full flex justify-end">
        <button>수정</button>
        <button>삭제</button>
      </div>
      {item.r_content && (
        <>
          <button onClick={ShowChildReply}>
            {item.r_count ? `${item.r_count} 개의 댓글` : "댓글 입력"}
          </button>
          {item.r_parent_code === item.r_code ? (
            <ReplyItem ref={itemRef} item={item} style={{ display: "none" }} />
          ) : null}
          <div className="reply-input-box flex w-full">
            <input className="flex-1" />
            <button>게시</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ReplyItem;
