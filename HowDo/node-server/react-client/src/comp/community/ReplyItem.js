import { useState } from "react";
import { getReply, insertReply, deleteReply } from "../../service/post.service";
import { useUserContext } from "../../context/UserContextProvider";
import { usePostContext } from "../../context/PostContextProvider";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const ReplyItem = ({ item, index }) => {
  const { userSession } = useUserContext();
  const { setReplyList, setReplyCount, initReply, cReplyData, setCReplyData } =
    usePostContext();
  const [inputValues, setInputValues] = useState([]);
  const [showChild, setShowChild] = useState(false);

  const btnClass02 =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const imgDefault = "inline-block h-10 w-10 text-slate-500";
  const inputClass =
    "bg-transparent border-b border-blue-700 flex-1 mr-3 py-1 px-2 leading-tight focus:outline-none";

  // map으로 생성한 여러 input state 관리. 아래 주석 참고
  const onChangeCReply = (event, index) => {
    const values = [...inputValues];
    values[index] = event.target.value;
    setInputValues(values);
  };

  // cf) eventHandler 에 값을 전달해야 할 경우 중첩 callback 을 사용해야 한다.
  // cf) 함수의 코드가 전부 실행된 이후에 state의 값이 변경된다.
  // !! state 값이 setting 되기 전에 함수가 먼저 호출되는 문제 !! => function updater 로 해결
  const onClickCReply = async (index) => {
    // cf) function updater
    // setState 내에서 callback 실행
    // 매개변수는 현재 state 값, callback 에서 return 되는 값은 state 에 저장될 값
    // 현재 값에 바로 setting 한 뒤 fetch 함수를 호출했다.
    setCReplyData(async (reply) => {
      reply = {
        ...cReplyData,
        username: userSession.username,
        p_code: item.p_code,
        r_content: inputValues[index],
        r_parent_code: item.r_code,
      };
      await insertReply(reply);
      let data = await getReply(reply.p_code);
      if (data) {
        setReplyList([...data.list]);
        setReplyCount(data.count);
        setCReplyData(initReply);
      }
      return reply;
    });
  };

  const onClickDelete = async () => {
    await deleteReply(item.r_code, item.p_code);
    let data = await getReply(item.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
    }
  };

  const ShowChildReply = () => {
    setShowChild(!showChild);
  };

  return (
    <li className="list-none w-full p-5 border-b border-gray-200 first:border-t">
      <div className="flex">
        {item?.user?.profile_image ? (
          <img
            className="inline-block mr-3 w-10 h-10"
            src={item["user.profile_image"]}
            alt="profile"
          />
        ) : (
          <UserCircleIcon className={imgDefault} />
        )}
        <span className="flex items-center flex-1 ml-3">
          {item?.user["nickname"]}
        </span>
        <span>{`${item.r_date} ${item.r_time}`}</span>
      </div>
      <div className="pt-5 pb-5">{item.r_content || "삭제된 댓글입니다."}</div>

      {userSession?.username === item?.username && (
        <div className="w-full flex justify-end">
          <button className="hover:text-blue-700" onClick={onClickDelete}>
            삭제
          </button>
        </div>
      )}

      <button className="hover:text-blue-700" onClick={ShowChildReply}>
        {item.r_count
          ? `${item.r_count} 개의 댓글`
          : userSession?.username
          ? "댓글 입력"
          : ""}
      </button>

      <section
        style={{
          display: showChild === true ? "block" : "none",
        }}
      >
        {item?.reply_child?.map((child, index) => {
          <ReplyItem item={child} index={index} />;
        })}

        <div
          className="reply-input-box gap-3 w-full mt-5"
          style={{
            display: userSession?.username && item.r_content ? "flex" : "none",
          }}
        >
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
            onChange={(event) => onChangeCReply(event, index)}
            className={inputClass}
            value={inputValues[index] || ""}
            placeholder={
              !userSession?.username
                ? "로그인 후 이용해주세요."
                : "댓글을 입력하세요."
            }
            disabled={!userSession?.username ? true : false}
          />
          <button
            className={btnClass02}
            disabled={
              !userSession?.username || inputValues[index] < 1 ? true : false
            }
            onClick={() => onClickCReply(index)}
          >
            등록
          </button>
        </div>
      </section>
    </li>
  );
};

export default ReplyItem;

/**
 * cf) map 을 이용해 생성한 여러 input 의 state 관리법
 *   단순히 event.target.value 를 저장할 경우
 *   모든 input 의 값이 동일하게 처리되는 문제 발생
 * 1. map 에서 각 input 의 index 를 저장
 * 2. 별도의 배열 state변수를 생성
 * 3. input 의 value 를 배열 state변수[index] 로 지정
 * 4. onChange 시 event 와 함께 callback 함수 호출
 * 5. 해당 callback 내에서 eventHandler를 event, index 와 함께 다시 callback 호출
 * 6. handler에서는 변수를 별도로 생성하여 배열 state변수를 spread(배열 복사)
 * 7. 새로 생성된 배열 변수의 index 에 해당하는 값에 event.target.value 저장
 * 8. setState의 인수로 새로운 배열 변수를 넘겨줌
 *    만약 3번째 input 에 값이 입력되면 [undefined, undefined, "문자열"] 이 저장됨
 */
