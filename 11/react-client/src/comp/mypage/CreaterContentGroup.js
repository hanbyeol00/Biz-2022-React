import { useVideoContentContext } from "../../context/VideoContentContextProvide";

/**
 * map 을 이용한 컨텐츠 시리즈별 carousel 제작
 */
const CreaterContentGroup = () => {
  const { videoGroupCount, groupThumbnail } = useVideoContentContext();
  const countView = videoGroupCount?.map((item) => {
    return (
      <div>
        <span>{item.count}</span>
        <div></div>
      </div>
    );
  });
  return (
    <div className="w-full text-center min-h-64">
      <span className="p-4 border-b-2 border-black ">재생목록</span>
      <div className="m-12">{countView}</div>
    </div>
  );
};

export default CreaterContentGroup;
