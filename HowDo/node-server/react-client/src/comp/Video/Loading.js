import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <div className="absolute flex flex-col top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-10"></div>
      <SyncLoader
        color="#0000ff"
        className="absolute ml-6 z-[100] top-1/2 left-1/2"
      />
      <div className="absolute mt-12 top-1/2 left-1/2 font-xl z-[100] font-semibold ">
        로딩 중 입니다...
      </div>
    </>
  );
};

export default Loading;
