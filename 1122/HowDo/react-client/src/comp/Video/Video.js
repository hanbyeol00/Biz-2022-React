import ReactPlayer from "react-player";

const Video = ({ playList, index, video }) => {
  return (
    <>
      <h2>Player Test</h2>
      <div className="inline-block items-center">
        <ReactPlayer
          className="react-player"
          url={video} // 플레이어 url
          width="500px" // 플레이어 크기 (가로)
          height="630px" // 플레이어 크기 (세로)
          playing={true} // 자동 재생 on
          muted={false} // 자동 재생 on
          controls={true} // 플레이어 컨트롤 노출 여부
          light={false} // 플레이어 모드
          pip={false} // pip 모드 설정 여부
          //   onEnded={() => handleVideo()} // 플레이어 끝났을 때 이벤트
        />
      </div>
    </>
  );
};

export default Video;
