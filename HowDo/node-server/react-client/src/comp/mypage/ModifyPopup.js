import axios from "axios";
import { useRef, useState } from "react";
import { useUserContext } from "../../context/UserContextProvider";
import { Modifier } from "../../nav/classNames/ClassNames";

const ModifyPopup = () => {
  const { userSession, modifierOpen, setModifierOpen } = useUserContext();
  const [newProfileImage, setNewProfileImage] = useState();
  const [tempImage, setNewTempImage] = useState();
  const inputRef = useRef();
  // FormData 형식으로 fetch 할 경우 method POST를 사용
  // pormData 로 append 할 시 첫번째 파라미터는 노드쪽
  // "요소명" 과 같아야 함
  // multer의 storage 는 이름을 바꿔서 사용 불가
  const updateHandler = async () => {
    const profileImage = new FormData();
    profileImage.append("profile", newProfileImage);
    const fecthOption = {
      method: "POST",
      body: profileImage,
    };
    const res = await fetch(
      `/user/update/${userSession.username}`,
      fecthOption
    );
    setModifierOpen(false);
  };

  return (
    <>
      {modifierOpen ? (
        <div className={Modifier}>
          <div className="m-auto w-1/2 h-4/6 border border-black bg-white flex flex-col">
            <div
              className="mr-6 ml-auto max-h-fit max-w-fit  text-6xl hover:cursor-pointer hover:text-blue-600"
              onClick={() => {
                setModifierOpen(false);
              }}
            >
              &times;
            </div>
            <span className="m-auto mt-0">프로필 이미지</span>
            <img
              className="m-auto mt-12"
              width="150px"
              height="150px"
              src={
                tempImage
                  ? tempImage
                  : userSession.profile_image
                  ? userSession.profile_image
                  : "./image/noimage.png"
              }
            />
            <input
              name="file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                setNewProfileImage(e.target?.files[0]);
                setNewTempImage(URL.createObjectURL(e.target.files[0]));
              }}
              ref={inputRef}
            />
            <div className="m-auto mt-12">
              <div
                className="mr-12 cursor-pointer inline"
                onClick={() => {
                  inputRef.current.click();
                }}
              >
                업로드 파일 선택
              </div>
              <div className="cursor-pointer inline" onClick={updateHandler}>
                변경
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default ModifyPopup;
