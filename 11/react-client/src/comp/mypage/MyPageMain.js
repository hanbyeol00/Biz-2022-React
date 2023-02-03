import CreaterContent from "./CreaterContent";
import CreaterContentFavorite from "./CreaterContentFavorite";
import { useUserContext } from "../../context/UserContextProvider";
import { usePayContext } from "../../context/PayContextProvider";
import Purchase from "../purchase/Purchase";

const MyPageMain = () => {
  const { userSession, modalHandler } = useUserContext();
  const { payReadyBody, statePayReady } = usePayContext();

  const twoClickEvent = () => {
    modalHandler();
    payReadyBody();
    console.log(statePayReady);
  };

  //  console.log(userSession.username);

  return (
    <div>
      <div className="m-12 ml-56 w-screen h-60 container border-2 border-black border-current">
        <img src="https://picsum.photos/1540/240"></img>
      </div>
      <div className="m-12 ml-56 flex">
        <img
          width="20px"
          heigt="20px"
          className="rounded-full"
          src={userSession.profile_image}
          alt="profile"
        ></img>
        <div>{userSession.nickname}</div>
        <div className="ml-auto" onClick={twoClickEvent}>
          구독
        </div>
        <div>게시글 작성</div>
      </div>
      <div className="ml-44">
        <CreaterContent />
        <CreaterContentFavorite />
      </div>
      <Purchase />
    </div>
  );
};

export default MyPageMain;
