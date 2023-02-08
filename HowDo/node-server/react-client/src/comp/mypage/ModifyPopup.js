import { useUserContext } from "../../context/UserContextProvider";
import { Modifier } from "../../nav/classNames/ClassNames";

const ModifyPopup = () => {
  const { userSession, modifierOpen } = useUserContext();
  return (
    <>
      {modifierOpen ? (
        <div className={Modifier}>
          <div className="m-auto w-1/2 h-4/6 border border-black bg-white">
            <img
              className="m-auto"
              width="150px"
              height="150px"
              src={
                userSession.profile_image
                  ? userSession.profile_image
                  : "./image/noimage.png"
              }
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default ModifyPopup;
