import ReactPlayer from "react-player";
import { useState } from "react";
/**
 * map 을 이용한 컨텐츠 시리즈별 carousel 제작
 */
const CreaterContentFavorite = () => {
  const [hover, setHover] = useState(false);
  console.log(hover);
  return (
    <div className="w-full text-center min-h-64">
      <span className="p-4 border-b-2 border-black">인기 업로드 영상</span>
      <div
        className="m-12 flex w-80 h-64 flex-col justify-center items-center transition-all duration-700 hover:h-72 hover:w-96 hover:ml-4 hover:mr-4 hover:mb-4 shadow-lg"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {hover ? (
          <ReactPlayer
            width="100%"
            url="https://www.youtube.com/embed/1hcdQixxJdA"
            playing={true}
            muted={true}
          />
        ) : (
          <ReactPlayer
            width="100%"
            url="https://www.youtube.com/embed/1hcdQixxJdA"
            playing={false}
            muted={false}
          />
        )}
        <div>
          <img alt="profile"></img>
          <h3>영상제목1</h3>
          <h6>작성자</h6>
          <h6>조회수</h6>
        </div>
      </div>
    </div>
  );
};

export default CreaterContentFavorite;
