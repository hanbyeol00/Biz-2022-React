import Video from "./Video";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import { useEffect, useState } from "react";

const VideoMain = () => {
  const video = [
    "https://www.youtube.com/watch?v=oUFJJNQGwhk",
    "https://www.youtube.com/watch?v=jNgP6d9HraI",
    "https://www.youtube.com/watch?v=sm1DrK22Chg",
    "https://www.youtube.com/watch?v=NXOHRi3wf8s",
    "https://youtu.be/fNpTIbsagpw",
    "https://www.youtube.com/watch?v=FWZoL39oFlQ",
  ];

  const videoView = video.map((video, index) => {
    return <Video video={video} index={index} key={video} />;
  });
  return (
    <>
      <div>
        <Slider afterChange={(slide) => console.log(slide)}>{videoView}</Slider>
      </div>
    </>
  );
};
export default VideoMain;
