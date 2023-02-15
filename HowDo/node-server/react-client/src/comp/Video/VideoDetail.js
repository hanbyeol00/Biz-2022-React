import { useEffect, useState } from "react";
import "../../css/detailsTag.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
import Reply from "../community/Reply";
const VideoDetail = () => {
  const {
    videoDetail,
    relationship,
    onClickDetailHandler,
    deleteVideo,
    setOpenModel,
    setDetail,
    setShorts,
    replyList,
  } = useVideoContentContext();
  const { userSession } = useUserContext();
  const { detailsOpen, setDetailsOpen } = useState(false);
  const nav = useNavigate();
  const relationshipItems = relationship.filter((item) => {
    return item.v_code !== videoDetail.v_code;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClickHandler = (e) => {
    const v_code = e.target.dataset.v_code;
    nav(`/video/detail/${v_code}`);
    return onClickDetailHandler(v_code);
  };

  const deleteHandler = (e) => {
    const v_code = e.target.dataset.v_code;
    const Username = userSession.username;
    const deleteData = { Username, v_code };
    deleteVideo(deleteData);
    nav("/");
  };

  const videoEditingHandler = async (e) => {
    const v_code = e.target.dataset.v_code;
    setOpenModel({ video: true });
    const res = await fetch(`/video/editing/select/${v_code}`);
    const { videoInfo, shorts } = await res.json();
    setDetail({ ...videoInfo });
    setShorts({ ...shorts });
  };

  const clickHandler = (e) => {
    const details = e.target.closest("details");
    if (!details.open) {
      console.log(details.open);
      e.target.innerText = "동영상 설명 접기";
    } else {
      e.target.innerText = "동영상 설명 펼치기";
    }
  };

  const timeForToday = () => {
    const today = new Date(); // 현재 시간
    const videoCreateDate = new Date(videoDetail.v_create_date); // 영상의 업로드된 시간

    /**
     * obj.getTime() = 1970 년 1 월 1 일 00:00:00 와 주어진 날짜의 경과시간을 밀리초 단위로 나타내는 숫자
     */

    const betweenTime = Math.floor(
      (today.getTime() - videoCreateDate.getTime()) / 1000 / 60 // 분단위를 계산하는 식
    );
    if (betweenTime < 1) return "방금전"; // 1분미만 초단위는 방금전으로 표시
    if (betweenTime < 60) {
      // 업로드 시간이 60분보다 작을시 "N분전" 으로 표시
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60); // 시간 단위를 계산하는 식
    if (betweenTimeHour < 24) {
      // 업로드 시간이 24시간보다 작을시 "N시간전" 으로 표시
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24); // 일 단위를 계산하는 식
    if (betweenTimeDay < 30) {
      // 업로드 시간이 30일보다 작을시 "N일전" 으로 표시
      return `${betweenTimeDay}일 전`;
    }
    const betweenTimeMonth = Math.floor(betweenTimeDay / 30); // 월 단위를 계산하는 식
    if (betweenTimeDay < 12) {
      // 업로드 시간이 12월보다 작을시 "N개월 전" 으로 표시
      return `${betweenTimeMonth}개월 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`; // 년 단위를 계산하는 식
  };

  const videoRelationshipView = relationshipItems.map((video) => {
    return (
      <div
        data-v_code={video.v_code}
        className="mx-7 flex w-80 h-64 flex-col justify-center items-center shadow-lg p-3"
        onClick={onClickHandler}
        onContextMenu={(e) => e.preventDefault()}
        key={video.v_code}
      >
        {video.v_price === 0 ? (
          <video
            className="w-full h-full columns-1 aspect-video border-black border-1"
            src={video.v_src}
            controlsList="nodownload"
            controls
            data-v_code={video.v_code}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <video
            className="w-full h-full columns-1 aspect-video border-black border-1"
            src={video.v_src}
            controlsList="nodownload"
            data-v_code={video.v_code}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
        <div className="item-left">
          <h3 data-v_code={video.v_code}>제목 : {video.v_title}</h3>
        </div>
      </div>
    );
  });
  if (videoDetail.code === 404) {
    alert(videoDetail.message);
    return <Navigate to="/" />;
  } else if (videoDetail.v_price === 0) {
    return (
      <div className="flex ml-32 mt-2 w-full">
        <div className="flex-1 ">
          <div className="pb-10 pr-10 block border-b-2 ">
            <iframe
              className="w-full"
              src={videoDetail.v_src}
              height="550vw"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div className="w-full">
            <div className="m-4">
              <div className="text-4xl">{videoDetail.v_title}</div>
              <div>{videoDetail.f_user_video.nickname}</div>
              <div className="flex flex-wrap">
                <div>{timeForToday()}</div>
                <div className="ml-4">조회수 : {videoDetail.v_views}</div>
              </div>
              <details className="bg-gray-100 p-2 rounded">
                <summary onClick={clickHandler} className="text-zinc-700">
                  동영상 설명 펼치기
                </summary>
                <div className="video_detail">{videoDetail.v_detail}</div>
              </details>
            </div>
          </div>
          {userSession.username === videoDetail.username ? (
            <div className="flex justify-end">
              <button
                data-v_code={videoDetail.v_code}
                onClick={videoEditingHandler}
                className="bg-cyan-600 rounded-md mr-2 text-white p-2 px-3"
              >
                수정
              </button>
              <button
                data-v_code={videoDetail.v_code}
                onClick={deleteHandler}
                className="bg-cyan-600 rounded-md mr-10 text-white p-2 px-3 "
              >
                삭제
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="flex">
            <Reply
              writer={videoDetail?.f_user_video?.nickname}
              v_code={videoDetail?.v_code}
              list={replyList}
            />
          </div>
        </div>
        <aside className="border-l-2 pb-80 flex-2">
          {videoRelationshipView}
        </aside>
      </div>
    );
  } else if (videoDetail.v_price !== 0) {
    alert("결제가 필요한 동영상 입니다");
    return <Navigate to="/" />;
  }
};
export default VideoDetail;
