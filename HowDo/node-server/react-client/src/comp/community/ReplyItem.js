import { useState } from "react";
import { getReply, insertReply, deleteReply } from "../../service/post.service";
import { useUserContext } from "../../context/UserContextProvider";
import { usePostContext } from "../../context/PostContextProvider";
import { UserCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ReplyItem = ({ writer, item, index }) => {
  console.log(writer);
  const { userSession } = useUserContext();
  const { initReply, setReplyList, setReplyCount } = usePostContext();
  const [showChild, setShowChild] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [cReplyInput, setCReplyInput] = useState(initReply);
  const [cReplyCount, setCReplyCount] = useState(item.r_children);

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
    // 저장할 값을 변수로 선언하고 fetch 함수를 호출했다.
    setCReplyInput(async (reply) => {
      reply = {
        ...cReplyInput,
        username: userSession.username,
        p_code: item.p_code,
        v_code: item.v_code,
        r_content: inputValues[index],
        r_parent_code: item.r_code,
      };
      await insertReply(reply);
      let data = await getReply(
        reply.p_code == null ? reply.v_code : reply.p_code
      );
      if (data) {
        setReplyList([...data.list]);
        setReplyCount(data.count);
        setInputValues([]);
      }
      return initReply;
    });
  };

  const onClickDelete = async () => {
    await deleteReply(item.r_code);
    const data = await getReply(
      item.p_code == null ? item.v_code : item.p_code
    );
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
    }
  };

  const ShowChildReply = async () => {
    setShowChild(!showChild);
  };

  // cf) anchor 와 id 의 hash(#) 를 이용해 scroll 위치 이동...
  // 만약 상단 nav 밑으로 요소가 가려질 경우 css 로 해결한다.
  // 부모 요소에 scroll-snap-type 을 주고
  // id 가 있는 해당 요소에 scroll-margin-top 을 줄 것
  // 일반적인 스크롤에 영향을 주지 않는다.
  return (
    <section className="flex w-full border-gray-200 border-t first:border-t-0 snap-mandatory">
      <ChevronRightIcon
        className="ml-10 mt-7 w-6 h-6 text-slate-500"
        style={{ display: item.r_parent_code ? "inline-block" : "none" }}
      />
      <div className="w-full">
        <div
          className="w-full p-5 scroll-mt-16"
          id={item?.r_code}
          style={{
            backgroundColor:
              window?.location?.hash === `#${item?.r_code}` && "#EFE7DB",
          }}
        >
          <div className="flex">
            {item?.user?.profile_image ? (
              <img
                className="inline-block mr-3 w-10 h-10"
                src={item?.profile_image}
                alt="profile"
              />
            ) : (
              <UserCircleIcon className={imgDefault} />
            )}
            <div className="flex items-center flex-1 ml-3">
              <span>{item?.nickname}</span>
              <span
                className="ml-3 p-1 text-xs text-slate-500 border border-slate-500 rounded-lg"
                style={{
                  display: item?.nickname === writer ? "inline-block" : "none",
                }}
              >
                {"작성자"}
              </span>
            </div>
            <span>{`${item?.r_date} ${item?.r_time}`}</span>
          </div>
          <div className="pt-5 pb-5">
            {item?.r_content || "삭제된 댓글입니다."}
          </div>

          {userSession?.username === item?.username && (
            <div className="w-full flex justify-end">
              <button className="hover:text-blue-700" onClick={onClickDelete}>
                삭제
              </button>
            </div>
          )}

          <div className="px-3">
            <span
              className="mr-5 text-slate-500"
              style={{ display: cReplyCount ? "inline-block" : "none" }}
            >
              {cReplyCount && `${cReplyCount} 개의 댓글`}
            </span>
            <button
              className={`hover:text-blue-700 ${
                showChild ? "text-blue-700" : ""
              }`}
              style={{
                display: userSession?.username ? "inline-block" : "none",
              }}
              onClick={() => ShowChildReply(item.r_code)}
              disabled={!userSession?.username ? true : false}
            >
              {userSession?.username && "댓글 쓰기"}
            </button>
          </div>

          <div
            style={{
              display: showChild === true ? "block" : "none",
            }}
          >
            <div
              className="reply-input-box gap-3 w-full p-5 my-5 border border-gray-300 rounded"
              style={{
                display:
                  userSession?.username && item.r_content ? "flex" : "none",
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
                  !userSession?.username || inputValues[index] < 1
                    ? true
                    : false
                }
                onClick={() => onClickCReply(index)}
              >
                등록
              </button>
            </div>
          </div>
        </div>
        {item?.reply_child?.map((child, index) => (
          <ReplyItem
            key={child.r_code}
            writer={writer}
            item={child}
            index={index}
          />
        ))}
      </div>
    </section>
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
