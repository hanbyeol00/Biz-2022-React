import { defer, useLoaderData, useNavigate } from "react-router-dom";
import {
  nameSpan,
  searchItemwrap,
  wrapperDiv,
} from "../../nav/classNames/ClassNames";
export const loader = async () => {
  const res = await fetch("/mypage/creater");
  const CreaterR = await res.json();
  console.log({ CreaterR });
  return defer({ CreaterR });
};
const CreaterMain = () => {
  const navigate = useNavigate();
  const CreaterR = useLoaderData();

  return (
    <div className="flex flex-col ml-40 w-full">
      <span className={nameSpan}>크리에이터</span>
      <div className={wrapperDiv}>
        {CreaterR ? (
          CreaterR.CreaterR?.map((item) => {
            return (
              <div
                className={searchItemwrap}
                key={item.username}
                onClick={() => navigate(`/creater/${item.nickname}`)}
              >
                <img
                  className="w-60 h-35 place-self-center"
                  src={
                    item?.profile_image
                      ? item.profile_image
                      : "../image/noimage.png"
                  }
                />
                <div className="mt-4 text-center">닉네임 : {item.nickname}</div>
              </div>
            );
          })
        ) : (
          <span className="m-auto"> 검색결과가 없습니다</span>
        )}
      </div>
    </div>
  );
};

export default CreaterMain;
