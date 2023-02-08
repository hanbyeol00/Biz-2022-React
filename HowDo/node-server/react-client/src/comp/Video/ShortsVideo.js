import ReactPlayer from "react-player";
const ShortsVideo = ({ video }) => {
  return (
    <>
      <div className="inline-block items-center">
        <ReactPlayer
          className="react-player"
          url={video} // 플레이어 url
          width="500px" // 플레이어 크기 (가로)
          height="630px" // 플레이어 크기 (세로)
          playing={false} // 자동 재생 on
          muted={false} // 자동 재생 on
          controls={true} // 플레이어 컨트롤 노출 여부
          light={false} // 플레이어 모드
          pip={false} // pip 모드 설정 여부
          onEnded={() => console.log(video)}
        />
      </div>
    </>
  );
};

export default ShortsVideo;
