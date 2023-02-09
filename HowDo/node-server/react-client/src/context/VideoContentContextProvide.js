import { useContext, createContext, useState, useEffect } from "react";
import { VideoContent } from "../data/VideoContent";
import { useUserContext } from "./UserContextProvider";

const VideoContentContext = createContext();

export const useVideoContentContext = () => {
  return useContext(VideoContentContext);
};

export const VideoContentContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [videoContent, setVideoContent] = useState(new VideoContent());
  const [videoContentList, setVideoContentList] = useState();
  const [videoGroupCount, setVideoGroupCount] = useState();
  const [groupThumbnail, setGroupThumbnail] = useState();

  const { userSession } = useUserContext();

  const [videoItemList, setVideoItemList] = useState([]);
  const [file, setFile] = useState({}); // 동영상 업로드 미리보기용 state
  const [shorts, setShorts] = useState({
    shorts: false,
  });
  const [detail, setDetail] = useState({
    url: "",
    video: false,
    v_title: "",
    v_price: 0,
    v_detail: "",
    v_category: "",
    v_save_file: "",
  });
  const [videoDetail, setVideoDetail] = useState({});
  const [relationship, setRelationship] = useState([]);
  const [videoTime, setVideoTime] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/mypage/${userSession.username}`);
      const result = await response?.json();
      console.log(result);
      setVideoContentList(result.recent);
      setVideoGroupCount(result.count);
      setGroupThumbnail(result.group);
    })();
  }, [userSession]);

  const onClickDetailHandler = async (v_code) => {
    const res = await fetch(`/video/detail/${v_code}`);
    const { video, category } = await res.json();
    setVideoDetail({ ...video });
    setRelationship([...category]);
    await new Promise((r) => setTimeout(r, 100));
  };

  const deleteVideo = (deleteData) => {
    console.log(deleteData);
    const fetchOption = {
      method: "POST",
      body: JSON.stringify(deleteData),
      headers: { "Content-Type": "application/json" },
    };
    const res = fetch(`/video/delete`, fetchOption);
  };

  const props = {
    videoContentList,
    setVideoContentList,
    videoContent,
    setVideoContent,
    videoGroupCount,
    setVideoGroupCount,
    groupThumbnail,
    setGroupThumbnail,
    videoItemList,
    setVideoItemList,
    file,
    setFile,
    detail,
    setDetail,
    shorts,
    setShorts,

    loading,
    setLoading,
    videoDetail,
    setVideoDetail,
    relationship,
    setRelationship,
    onClickDetailHandler,
    deleteVideo,
    videoTime,
    setVideoTime,
  };

  return (
    <VideoContentContext.Provider value={props}>
      {children}
    </VideoContentContext.Provider>
  );
};
