import { useContext, createContext, useState, useEffect } from "react";
import { VideoContent } from "../data/VideoContent";
import { useUserContext } from "./UserContextProvider";

const VideoContentContext = createContext();

export const useVideoContentContext = () => {
  return useContext(VideoContentContext);
};

export const VideoContentContextProvider = ({ children }) => {
  const [videoContent, setVideoContent] = useState(new VideoContent());
  const [videoContentList, setVideoContentList] = useState();
  const [videoGroupCount, setVideoGroupCount] = useState();
  const [groupThumbnail, setGroupThumbnail] = useState();
  const { userSession } = useUserContext();
  const [videoItemList, setVideoItemList] = useState([]);
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
    detail,
    setDetail,
    shorts,
    setShorts,
  };

  return (
    <VideoContentContext.Provider value={props}>
      {children}
    </VideoContentContext.Provider>
  );
};
