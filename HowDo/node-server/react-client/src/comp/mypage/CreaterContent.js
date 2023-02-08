import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
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

import { useUserContext } from "../../context/UserContextProvider";
import { useLoaderData } from "react-router-dom";
import {
  IoArrowForwardCircleSharp,
  IoArrowBackCircleSharp,
} from "react-icons/io5";
/**
 * map 을 이용한 컨텐츠 시리즈별 carousel 제작
 */
const CreaterContent = () => {
  const { videoContentList, setVideoContentList, loading, setLoading } =
    useVideoContentContext();
  const result = useLoaderData();

  const [position, setPosition] = useState(0);

  const { userSession } = useUserContext();

  useEffect(() => {
    setVideoContentList(result.recent);
    console.log(videoContentList);
  }, []);
  const CONTENT_WIDTH = 392;
  const setHover = (v_code, toggle) => {
    setVideoContentList([
      ...videoContentList?.map((item) => {
        console.log(item);
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
      {result?.recent[0] ? (
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
        </>
      ) : null}

      <div
        className={videoContenView}
        style={{ transform: `translateX(${position}px)` }}
      >
        {userSession.username ? (
          <div className="flex">
            {videoView}
            <div className={moreButton}>더보기</div>
          </div>
        ) : (
          <div className="m-auto text-3xl">영상이 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default CreaterContent;
