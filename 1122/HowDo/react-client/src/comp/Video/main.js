import Video from "./Video";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";

const VideoMain = () => {
  const video = [
    "https://www.youtube.com/watch?v=oUFJJNQGwhk",
    "https://www.youtube.com/watch?v=jNgP6d9HraI",
    "https://www.youtube.com/watch?v=sm1DrK22Chg",
    "https://www.youtube.com/watch?v=NXOHRi3wf8s",
    "https://youtu.be/fNpTIbsagpw",
    "https://www.youtube.com/watch?v=FWZoL39oFlQ",
  ];
  const [videoItemList, setVideoItemList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    setVideoItemList(video);
    const randomVideo = async () => {
      const randomNum = Math.floor(Math.random() * videoItemList.length);
      setVideoList([...videoList, videoItemList[randomNum]]);
      const item = video[randomNum];
      const videoItem = video.filter((video) => {
        return video !== item;
      });
      setVideoItemList(videoItem);
    };
    randomVideo();
  }, []);

  const afterChangeHandler = (slide) => {
    if (slide >= 1) {
      const randomNum = Math.floor(Math.random() * videoItemList.length);
      setVideoList([...videoList, videoItemList[randomNum]]);
      const item = video[randomNum];
      const videoItem = videoItemList.filter((video) => {
        return video !== item;
      });
      setVideoItemList(videoItem);
    }
  };
  console.log(videoList);

  const videoView = videoList.map((video) => {
    return <Video video={video} key={video} />;
  });

  return (
    <>
      <div>
        <Slider infinite={false} afterChange={afterChangeHandler}>
          {videoView}
          <div />
        </Slider>
      </div>
    </>
  );
};
export default VideoMain;
