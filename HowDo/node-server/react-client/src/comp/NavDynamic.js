import "../css/Nav.css";
import { useState } from "react";
import VideoUpload from "./Video/VideoUpload";
import { navDyna } from "../nav/classNames/ClassNames";
import { useUserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { useVideoContentContext } from "../context/VideoContentContextProvide";
const NavDynamic = ({ nOpen, setNOpen }) => {
  const nav = useNavigate();
  const { userSession } = useUserContext();
  const { openModel, setOpenModel } = useVideoContentContext();
  const ModelHandler = (name) => {
    if (userSession.username) {
      return setOpenModel({ ...openModel, [name]: !openModel[name] });
    } else {
      alert("로그인이 필요한 기능입니다");
      nav("/user/login");
      return setNOpen(!nOpen);
    }
  };
  return (
    <>
      <VideoUpload open={openModel.video} close={() => ModelHandler("video")} />
      <div
        className={
          nOpen
            ? "fixed w-48 z-50 p-4 top-14 -left-20 transition-all duration-700 translate-x-20 bg-black/100 text-white h-screen"
            : "fixed top-14 -left-24 z_1 p-4"
        }
      >
        <div>
          <img
            className={navDyna}
            src="./image/memo.png"
            alt="post_upload"
          ></img>
          <div className="text-center mb-12 ">게시글 업로드</div>
        </div>
        <div>
          <img
            onClick={() => ModelHandler("video")}
            className={navDyna}
            src="./image/clapperboard.png"
            alt="video_upload"
          ></img>
          <div
            className="mb-12 text-center"
            onClick={() => ModelHandler("video")}
          >
            동영상 업로드
          </div>
        </div>
        <div>
          <img
            className={navDyna}
            src="./image/photo.png"
            alt="image_upload"
          ></img>
          <div className="mb-12 text-center">이미지 업로드</div>
        </div>
        <div>
          <img
            className={navDyna}
            src="./image/subscribe.png"
            alt="subscribe"
          ></img>
          <div className="mb-12 text-center">구독 관리</div>
        </div>
      </div>
    </>
  );
};
export default NavDynamic;
