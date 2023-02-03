import ReactPlayer from "react-player";
import { useState } from "react";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";

/**
 * map 을 이용한 컨텐츠 시리즈별 carousel 제작
 */
const CreaterContent = () => {
  const { videoContentList, setVideoContentList } = useVideoContentContext();

  const setHover = (v_code, toggle) => {
    setVideoContentList([
      ...videoContentList.map((item) => {
        if (item.v_code === v_code) return { ...item, v_hover: toggle };
        else return item;
      }),
    ]);
    console.log(videoContentList);
  };
  const onMouseOverHandler = (v_code) => {
    setHover(v_code, true);
  };
  const onMouseOutHandler = (v_code) => {
    setHover(v_code, false);
  };

  const settings = {
    className: "center flex",
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const videoView = videoContentList?.map((item) => {
    return (
      <div
        className="m-12 flex w-80 h-64 flex-col justify-center items-center transition-all duration-700 hover:h-72 hover:w-96 hover:ml-4 hover:mr-4 hover:mb-4 shadow-lg"
        onMouseOver={() => onMouseOverHandler(item.v_code)}
        onMouseOut={() => onMouseOutHandler(item.v_code)}
        key={item.v_code}
      >
        <ReactPlayer
          width="100%"
          url={item.v_src}
          playing={item.v_hover}
          muted={item.v_hover}
        />
        ;
        <div>
          <img alt="profile"></img>
          <h3>{item.v_title}</h3>
          <h6>{item.username}</h6>
          <h6>{item.v_count}</h6>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full text-center min-h-64">
      <span className="p-4  border-b-2 border-black text-center">
        최근 업로드한 영상
      </span>
      <div className="flex">{videoView}</div>
    </div>
  );
};

export default CreaterContent;
