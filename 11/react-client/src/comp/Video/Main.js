import Video from "./Video";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";

const VideoMain = () => {
  const { setVideoItemList, videoItemList } = useVideoContentContext();

  useEffect(() => {
    const item = async () => {
      const res = await fetch("/video");
      const result = await res.json();
      let tempArray = [...result];
      tempArray.sort(() => Math.random() - 0.5);
      setVideoItemList([...tempArray]);
    };
    item();
  }, []);

  const videoView = videoItemList.map((video) => {
    console.log(video);
    return <Video video={video.v_src} key={video.v_src} />;
  });

  return (
    <div className="text-center bg-black py-32">
      <Slider infinite={false}>
        {videoView}
        <div />
      </Slider>
    </div>
  );
};
export default VideoMain;
