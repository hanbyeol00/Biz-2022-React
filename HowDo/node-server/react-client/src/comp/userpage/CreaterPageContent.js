import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLoaderData } from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
import {
  moreButton,
  myPageContentMain,
  nameLabel,
  videoBeforeButton,
  videoContenView,
  videoNextButton,
  videoNohover,
} from "../../nav/classNames/ClassNames";
import {
  IoArrowForwardCircleSharp,
  IoArrowBackCircleSharp,
} from "react-icons/io5";
const CreaterPageContent = () => {
  const createrResult = useLoaderData();
  const { videoContentList, setVideoContentList } = useVideoContentContext();
  const [position, setPosition] = useState(0);
  const CONTENT_WIDTH = 392;
  useEffect(() => {
    setVideoContentList(createrResult.v_result);
  }, []);

  const setHover = (v_code, toggle) => {
    setVideoContentList([
      ...videoContentList.map((item) => {
        if (item.v_code === v_code) return { ...item, v_hover: toggle };
        else return item;
      }),
    ]);
  };
  const onMouseOverHandler = (v_code) => {
    setHover(v_code, true);
  };
  const onMouseOutHandler = (v_code) => {
    setHover(v_code, false);
  };

  const before = () => {
    let newPosition = position - CONTENT_WIDTH;
    if (position <= (CONTENT_WIDTH * videoContentList.length - 1) * -1) {
      newPosition = 0;
    }
    setPosition(newPosition);
  };

  const next = () => {
    let newPosition = position + CONTENT_WIDTH;
    if (position === 0) {
      newPosition = CONTENT_WIDTH * (videoContentList.length - 1) * -1;
    }
    setPosition(newPosition);
  };
  const videoView = videoContentList?.map((item) => {
    return (
      <div
        className={videoNohover}
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
    <div className={myPageContentMain}>
      <span className={nameLabel}>최근 업로드한 영상</span>
      {createrResult?.v_result[0] ? (
        <>
          <IoArrowBackCircleSharp
            className={videoNextButton}
            onClick={before}
            size={40}
          />
          <IoArrowForwardCircleSharp
            className={videoBeforeButton}
            onClick={next}
            size={40}
          />
          <div
            className={videoContenView}
            style={{ transform: `translateX(${position}px)` }}
          >
            <div className="flex">
              {videoView}
              <div className={moreButton}>더보기</div>
            </div>
          </div>
        </>
      ) : (
        <div className="m-auto text-3xl">영상이 없습니다</div>
      )}
    </div>
  );
};

export default CreaterPageContent;
