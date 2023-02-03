import axios from "axios";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";

const VideoUpload = (props) => {
  const formData = new FormData();
  const { setDetail, detail, shorts, setShorts } = useVideoContentContext();
  const { open, close } = props;

  const imageUpload = (e) => {
    const videoType = e.target.files[0].type.includes("video");
    const filename = e.target.files[0].name;

    setDetail({
      ...detail,
      url: URL.createObjectURL(e.target.files[0]),
      video: videoType,
      v_save_file: filename,
    });
  };

  const titleOnChangeHandler = (e) => {
    setDetail({ ...detail, v_title: e.target.value });
  };

  const selectOnChangeHandler = (e) => {
    setDetail({ ...detail, v_category: e.target.value });
  };

  const v_priceOnChangeHandler = (e) => {
    setDetail({ ...detail, v_price: e.target.value });
  };

  const detailOnChangeHandler = (e) => {
    setDetail({ ...detail, v_detail: e.target.value });
  };

  const shortsOnChangeHandler = (e) => {
    const name = e.target.className;
    setShorts({ ...shorts, [name]: !shorts[name] });
    setDetail({ ...detail, v_price: 0 });
  };

  const onClickHandler = async () => {
    if (!detail.video) {
      return alert("업로드할 동영상을 선택해주세요");
    } else if (!detail.v_title) {
      console.log(detail.v_category);
      return alert("제목을 입력해주세요");
    } else if (detail.v_category === "" || detail.v_category === "none") {
      return alert("카테고리를 선택해주세요");
    } else if (!detail.v_detail) {
      return alert("내용을 입력해주세요");
    } else {
      formData.append("detail", JSON.stringify(detail));
      formData.append("shorts", JSON.stringify(shorts));
      const res = await axios.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = await res.json();
      console.log(result);
    }
  };
  return (
    <div
      className={
        open
          ? "modal z-50 justify-center items-center absolute top-0 right-0 bottom-0 left-0 flex "
          : "modal hidden"
      }
    >
      <div className="modal w-full bg-slate-800/50 p-96">
        <div className="modal bg-white rounded-md text-center">
          <div className="modal h-56 mt-10">
            {detail.video === true ? (
              <video
                className="m-auto pt-10"
                src={detail.url}
                controls
                width="350px"
                controlsList="nodownload"
              />
            ) : (
              <div className="modal h-full">
                <label
                  for="video_upload"
                  className="modal p-6 mt-20 leading-10 border-2 rounded-full inline-block cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="modal w-10 h-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </label>
              </div>
            )}
          </div>

          <input
            className="modal hidden"
            type="file"
            id="video_upload"
            accept="video/*"
            onChange={imageUpload}
          />
          <div className="modal block m-auto p-10">
            <input
              onChange={titleOnChangeHandler}
              placeholder="제목을 입력하세요"
              className="modal border-2 p-0.5 rounded-full w-2/4 p-1.5"
            />
            <select
              onChange={selectOnChangeHandler}
              className="modal p-1.5 border-2 rounded-full w-64 my-1"
            >
              <option value="none">카테고리</option>
              <option value="음악">음악</option>
              <option value="그림">그림</option>
              <option value="영상편집">영상편집</option>
            </select>
          </div>
          <div className="modal mb-12">
            <label for="detail" className="block">
              내용
            </label>
            <textarea
              id="detail"
              className="modal w-3/4 border-2"
              onChange={detailOnChangeHandler}
            ></textarea>
          </div>
          {shorts.shorts ? (
            <div className="modal ">
              <label for="v_price" className="modal ">
                가격설정
              </label>
              <input
                onChange={v_priceOnChangeHandler}
                id="v_price"
                className="modal border-2 w-1/4 mb-10"
                placeholder="가격을 입력해 주세요"
                type="number"
                value="0"
              />
              <label className="ml-10">쇼츠등록</label>
              <input
                type="checkbox"
                className="shorts"
                onChange={shortsOnChangeHandler}
              />
            </div>
          ) : (
            <div className="modal ">
              <label for="v_price" className="modal ">
                가격설정
              </label>
              <input
                onChange={v_priceOnChangeHandler}
                id="v_price"
                className="modal border-2 w-1/4 mb-10"
                placeholder="가격을 입력해 주세요"
                type="number"
                value={detail.v_price}
              />
              <label className="ml-10">쇼츠등록</label>
              <input
                type="checkbox"
                className="shorts"
                onChange={shortsOnChangeHandler}
              />
            </div>
          )}

          <div className="modal mb-7">
            <button
              class="modal px-4 py-2 rounded-l-xl text-white m-0 bg-red-500 hover:bg-red-600 transition"
              onClick={onClickHandler}
            >
              저장
            </button>
            <button
              class="modal px-4 py-2 rounded-r-xl bg-neutral-200 hover:bg-neutral-300 transition mb-16"
              onClick={close}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoUpload;
