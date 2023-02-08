import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";
import { usePayContext } from "../../context/PayContextProvider";
import Purchase from "../purchase/Purchase";
import ModifyPopup from "./ModifyPopup";
import React from "react";
import Loading from "../Video/Loading";

// mypage 진입시 사용하는 정보 fetch
export const myPageFetch = async ({ params }) => {
  const username = params.id;
  const response = await fetch(`/mypage/${username}`);
  const result = await response?.json();
  return defer({ ...result });
};

const MyPageMain = () => {
  const CreaterContent = React.lazy(() => import("./CreaterContent"));
  const { userSession, modalHandler, setModifierOpen, modifierOpen } =
    useUserContext();
  const { payReadyBody, statePayReady } = usePayContext();
  const navigate = useNavigate();
  const twoClickEvent = () => {
    modalHandler();
    payReadyBody();
    console.log(statePayReady);
  };
  const result = useLoaderData();

  // 유저 세션에 username 이 존재할 때 mypage 구현 없으실 home으로 돌아가지도록 설정
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <Await
          resolve={result}
          errorElement={<div>Could not load result 😬</div>}
        >
          {userSession.username ? (
            <div className="w-full">
              <div className="m-12 ml-56 w-full h-60 container border-2 border-black">
                <img
                  className="w-full h-full"
                  src={
                    userSession.title_image
                      ? userSession.title_image
                      : "./image/noimage.png"
                  }
                />
              </div>
              <div className="mt-12 mb-6 pl-56 w-11/12 flex">
                <img
                  width="50px"
                  heigt="50px"
                  className="rounded-full"
                  src={
                    userSession.profile_image
                      ? userSession.profile_image
                      : "./image/noimage.png"
                  }
                  alt="profile"
                  onClick={() => {
                    setModifierOpen(!modifierOpen);
                  }}
                />
                <div className="ml-6 mt-auto mb-auto hover:text-blue-600 hover:cursor-pointer font-bold">
                  {userSession.nickname}
                </div>
                <div
                  className="ml-auto hover:text-blue-600 hover:cursor-pointer font-bold"
                  onClick={twoClickEvent}
                >
                  구독
                </div>
                <div className="ml-6 hover:text-blue-600 hover:cursor-pointer font-bold">
                  게시글 작성
                </div>
              </div>
              <div className="ml-44">
                <CreaterContent />
                {/* <CreaterContentFavorite /> */}
              </div>{" "}
              <Purchase />{" "}
            </div>
          ) : (
            navigate("/")
          )}
        </Await>
        <ModifyPopup />
      </React.Suspense>
    </>
  );
};

export default MyPageMain;
