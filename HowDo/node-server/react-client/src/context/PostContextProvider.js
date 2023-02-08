import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostContextProvider = ({ children }) => {
  const initPost = () => {
    const postData = {
      p_code: v4(),
      username: "",
      p_title: "",
      p_content: "",
      b_code: "",
      b_group_code: "",
    };
    return postData;
  };
  const initReply = () => {
    const replyData = {
      r_code: v4(),
      p_code: "",
      username: "",
      r_content: "",
      r_parent_code: null,
    };
    return replyData;
  };

  const [boardList, setBoardList] = useState([]);
  const [postData, setPostData] = useState(initPost);
  const [replyData, setReplyData] = useState(initReply);

  const [cReplyData, setCReplyData] = useState(initReply);

  const [replyCount, setReplyCount] = useState();
  const [replyList, setReplyList] = useState([]);
  const [boardData, setBoardData] = useState({
    b_code: "",
    b_eng: "",
    b_kor: "",
    b_group_code: "",
    b_group_eng: "",
    b_group_kor: "",
  });

  const props = {
    boardList,
    setBoardList,
    initPost,
    postData,
    setPostData,
    initReply,
    replyData,
    setReplyData,
    cReplyData,
    setCReplyData,
    replyCount,
    setReplyCount,
    replyList,
    setReplyList,
    boardData,
    setBoardData,
  };

  return <PostContext.Provider value={props}>{children}</PostContext.Provider>;
};
