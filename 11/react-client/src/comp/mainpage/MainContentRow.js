import { useTransferContext } from "../../context/TransferContextProvider";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
const MainContentRow = () => {
  const { contentButton } = useTransferContext();
  return (
    <div
      className={
        contentButton
          ? "m-12 flex w-80 h-64 flex-col justify-center items-center shadow-lg p-3"
          : "hidden"
      }
    >
      <iframe
        className="w-full h-full columns-1 aspect-video border-black border-1"
        src="https://youtu.be/9IS-LYyMFGY"
      ></iframe>
      <div className="item-left">
        <img alt="profile"></img>
        <h3>영상제목1</h3>
        <h6>작성자</h6>
        <h6>조회수</h6>
      </div>
    </div>
  );
};

export default MainContentRow;
