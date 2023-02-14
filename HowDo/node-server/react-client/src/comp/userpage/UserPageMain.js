import { useUserContext } from "../../context/UserContextProvider";
import { usePayContext } from "../../context/PayContextProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import Purchase from "../purchase/Purchase";
import Cancel from "../purchase/Cancel";
import CreaterPageContent from "./CreaterPageContent";

export const userPageFetch = async ({ params }) => {
  const username = params.id;
  const response = await fetch(`/mypage/creater/${username}`);
  const createrResult = await response?.json();
  return createrResult;
};

const UserPageMain = () => {
  const { userSession, modalHandler, cancelHandler } = useUserContext();
  const { payReadyBody, statePayReady } = usePayContext();
  const createrResult = useLoaderData();
  const navigate = useNavigate();
  const twoClickEvent = () => {
    const orderUser = createrResult?.u_result?.username;
    const price = createrResult?.u_result?.price;
    modalHandler();
    payReadyBody(orderUser, price);
    console.log(statePayReady);
  };
  const cancelClick = () => {
    cancelHandler();
  };

  // const returnHome = () => {
  // console.log(createrResult?.u_result?.username);
  // console.log(userSession);
  // if (createrResult?.u_result?.username === userSession.username) {
  // navigate(`/${userSession.nickname}`);
  // }
  // return false;
  // };
  // useEffect(() => {
  // returnHome();
  // }, []);

  return (
    <>
      {createrResult.u_result ? (
        <div className="w-full">
          <div className="m-12 ml-56 w-full h-60 container border-2 border-black">
            <img
              className="w-full h-full"
              src={
                createrResult?.u_result?.title_image
                  ? createrResult.u_result?.title_image
                  : "../image/noimage.png"
              }
            />
          </div>
          <div className="mt-12 mb-6 pl-56 w-11/12 flex">
            <img
              width="50px"
              heigt="50px"
              className="rounded-full"
              src={
                createrResult?.u_result?.profile_image
                  ? createrResult?.u_result?.profile_image
                  : "../image/noimage.png"
              }
              alt="profile"
            />
            <div className="ml-6 mt-auto mb-auto hover:text-blue-600 hover:cursor-pointer">
              {createrResult?.u_result?.nickname}
            </div>
            {createrResult.chkSub[0] &&
            createrResult.chkSub[0].inactivated_at === null ? (
              <div
                className="ml-auto hover:text-blue-600 hover:cursor-pointer"
                onClick={cancelClick}
              >
                구독 중
              </div>
            ) : userSession.nickname !== createrResult?.u_result?.nickname &&
              userSession.nickname ? (
              <div
                className="ml-auto hover:text-blue-600 hover:cursor-pointer"
                onClick={twoClickEvent}
              >
                구독
              </div>
            ) : null}

            {createrResult?.u_result?.username === userSession.username ? (
              <div>게시글 작성</div>
            ) : null}
          </div>
          <div className="ml-44">
            <CreaterPageContent />
          </div>{" "}
          <Purchase
            nickname={createrResult?.u_result?.nickname}
            price={createrResult?.u_result?.price}
          />{" "}
          <Cancel orderUser={createrResult?.u_result?.username} />
        </div>
      ) : (
        (alert("존재하지 않는 회원입니다"), navigate("/"))
      )}
    </>
  );
};

export default UserPageMain;
