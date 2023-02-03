import "../css/Nav.css";
import { useState } from "react";
import VideoUpload from "./Video/VideoUpload";
const NavDynamic = ({ nOpen }) => {
  const [openModel, setOpenModel] = useState({
    video: false,
  });
  const ModelHandler = (name) => {
    setOpenModel({ ...openModel, [name]: !openModel[name] });
  };
  return (
    <>
      <VideoUpload open={openModel.video} close={() => ModelHandler("video")} />
      <div
        className={
          nOpen
            ? "fixed w-48 z-50 top-14 -left-20 transition-all duration-700 translate-x-20 bg-black text-white h-screen"
            : "fixed top-14 -left-24 z_1"
        }
      >
        <div>
          <img
            className="m-auto cursor-pointer"
            width="80px"
            height="80px"
            src="./image/memo.png"
            alt="post_upload"
          ></img>
          <div className="mb-12">게시글 업로드</div>
        </div>
        <div>
          <img
            onClick={() => ModelHandler("video")}
            className="m-auto cursor-pointer"
            width="80px"
            height="80px"
            src="./image/clapperboard.png"
            alt="video_upload"
          ></img>
          <div className="mb-12" onClick={() => ModelHandler("video")}>
            동영상 업로드
          </div>
        </div>
        <div>
          <img
            className="m-auto cursor-pointer"
            width="80px"
            height="80px"
            src="./image/photo.png"
            alt="image_upload"
          ></img>
          <div className="mb-12">이미지 업로드</div>
        </div>
        <div>
          <img
            className="m-auto cursor-pointer"
            width="80px"
            height="80px"
            src="./image/subscribe.png"
            alt="subscribe"
          ></img>
          <div className="mb-12">구독 관리</div>
        </div>
      </div>
    </>
  );
};
export default NavDynamic;
