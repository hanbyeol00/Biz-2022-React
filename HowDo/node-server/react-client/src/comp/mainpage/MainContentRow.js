import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../../context/PostContextProvider";
import { useTransferContext } from "../../context/TransferContextProvider";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
import { getReply } from "../../service/post.service";
import VideoInfiniteScrolling from "../../context/VideoInfiniteScrolling";
const MainContentRow = () => {
  const { contentButton } = useTransferContext();
  const {
    videoItemList,
    onClickDetailHandler,
    setVideoItemList,
    setReplyList,
    page,
    setPage,
  } = useVideoContentContext();
  const { loading, error } = VideoInfiniteScrolling(page);
  const { setReplyCount } = usePostContext();
  const nav = useNavigate();
  const observer = useRef();

  useEffect(() => {
    setPage(1);
  }, []);

  const lastVideoElementRef = useCallback((lastVideo) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (lastVideo) observer.current.observe(lastVideo);
  }, []);

  const onClickHandler = async (e) => {
    const v_code = e.target.dataset.v_code;
    await onClickDetailHandler(v_code);
    const reply = await getReply(v_code);
    setReplyList(reply?.list);
    setReplyCount(reply?.count);
    await new Promise((r) => setTimeout(r, 100));
    return nav(`/video/detail/${v_code}`);
  };

  const videoView = videoItemList.map((video, i) => {
    const isLastElement = videoItemList.length === i + 1;
    return isLastElement ? (
      <div
        data-v_code={video.v_code}
        key={i}
        onClick={onClickHandler}
        ref={lastVideoElementRef}
        className={
          contentButton
            ? "m-8 flex w-80 h-64 flex-col justify-center items-center shadow-lg p-3"
            : "hidden"
        }
      >
        <video
          className="w-full h-full columns-1 aspect-video border-black border-1"
          src={video.v_src}
          controls
        ></video>
        <div className="item-left">
          <img data-v_code={video.v_code} alt="profile"></img>
          <h3 data-v_code={video.v_code}>{video.v_title}</h3>
          <h6 data-v_code={video.v_code}>{video.username}</h6>
        </div>
      </div>
    ) : (
      <div
        data-v_code={video.v_code}
        key={i}
        onClick={onClickHandler}
        className={
          contentButton
            ? "m-8 flex w-80 h-64 flex-col justify-center items-center shadow-lg p-3"
            : "hidden"
        }
      >
        <video
          className="w-full h-full columns-1 aspect-video border-black border-1"
          src={video.v_src}
          controls
        ></video>
        <div className="item-left">
          <img data-v_code={video.v_code} alt="profile"></img>
          <h3 data-v_code={video.v_code}>{video.v_title}</h3>
          <h6 data-v_code={video.v_code}>{video.username}</h6>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full text-center ">
      <div className="grid grid-cols-1">{videoView}</div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
};

export default MainContentRow;
