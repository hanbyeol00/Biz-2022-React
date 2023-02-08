import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
import ShortsVideo from "./ShortsVideo";

const ShortsMain = () => {
  const { setVideoItemList, videoItemList } = useVideoContentContext();

  useEffect(() => {
    const item = async () => {
      const res = await fetch("/video/shorts");
      const result = await res.json();
      let tempArray = [...result];
      tempArray.sort(() => Math.random() - 0.5);
      setVideoItemList([...tempArray]);
    };
    item();
  }, []);

  const videoView = videoItemList.map((video) => {
    return <ShortsVideo video={video.sh_src} key={video.v_src} />;
  });

  const shortsStyle = {
    marginLeft: "120px",
    width: "92%",
  };

  return (
    <div style={shortsStyle} className="text-center mt-10">
      <Slider infinite={false}>{videoView}</Slider>
    </div>
  );
};
export default ShortsMain;
