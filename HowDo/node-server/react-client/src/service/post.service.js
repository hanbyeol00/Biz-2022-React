export const getBoardList = async () => {
  try {
    const response = await fetch("/community/boards/get");
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const getMainPosts = async () => {
  try {
    const response = await fetch("/community/posts/get");
    const result = await response.json();
    // noticeList, freeList, boardList
    return result;
  } catch (err) {
    return null;
  }
};

export const getBoardPosts = async (bEng, order) => {
  try {
    const response = await fetch(`/community/board/${bEng}/${order}/get`);
    const result = await response.json();
    // board, data;
    return result;
  } catch (err) {
    return null;
  }
};

export const getDetailPost = async (pCode) => {
  try {
    const response = await fetch(`/community/post/${pCode}/get`);
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      // post, board
      return result;
    }
    return result;
  } catch (err) {
    return null;
  }
};

export const submitPost = async (data, pCode = null) => {
  const fetchOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    let response;
    // insert
    if (!pCode) {
      response = await fetch("/community/post/insert", fetchOption);
    }
    // update
    if (pCode) {
      fetchOption.method = "PATCH";
      response = await fetch("/community/post/update", fetchOption);
    }
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      return null;
    }
    alert(result.MESSAGE);
    return result;
  } catch (err) {
    return null;
  }
};

export const deletePost = async (pCode) => {
  if (window.confirm("이 게시글을 삭제할까요?"))
    try {
      const response = await fetch(`/community/post/${pCode}/delete`);
      const result = await response.json();
      if (result.ERROR) {
        alert(result.ERROR);
        return null;
      }
      alert(result.MESSAGE);
      return result.MESSAGE;
    } catch (err) {
      return null;
    }
};

export const upvotePost = async (pCode, pUser, username) => {
  try {
    const fetchOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        p_code: pCode,
        p_user: pUser,
        username: username,
      }),
    };
    const response = await fetch(`/community/post/upvote`, fetchOption);
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      return null;
    } else {
      return result;
    }
  } catch (err) {
    return null;
  }
};

export const getReply = async (pCode) => {
  try {
    const response = await fetch(`/community/reply/${pCode}/get`);
    const result = await response.json();
    const data = {
      list: result.replyList,
      count: result.replyCount.p_replies,
    };
    return data;
  } catch (err) {
    return null;
  }
};

export const insertReply = async (data) => {
  try {
    const fetchOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`/community/reply/insert`, fetchOption);
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      return null;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const deleteReply = async (rCode, pCode) => {
  if (window.confirm("이 댓글을 삭제할까요?"))
    try {
      const response = await fetch(`/community/reply/${rCode}/${pCode}/delete`);
      const result = await response.json();
      if (result.ERROR) {
        alert(result.ERROR);
        return null;
      }
      alert(result.MESSAGE);
      return null;
    } catch (err) {
      return null;
    }
};
