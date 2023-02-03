import {
  KAKAO_APP_ADMIN_KEY,
  READY_URL,
  APPROVE_URL,
} from "../config/kakao_config.js";

export const fetchJoin = async (joinUser) => {
  const fetchOption = {
    method: "POST",
    body: JSON.stringify(joinUser),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/user", fetchOption);
  const result = await response.json();

  // console.log(result);
  return result;
};

export const fetchLogin = async (loginUser) => {
  const fetchOption = {
    method: "POST",
    body: JSON.stringify(loginUser),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/user/login", fetchOption);
  const result = await response.json();

  // console.log(result);
  return result;
};

export const fetchUser = async () => {
  const response = await fetch("/user/session");
  const result = await response.json();
  console.log("11111111111", result);

  // console.log(result);
  return result;
};

// 결제
// 결제 승인

export const payApprove = async (dataPayApprove) => {
  const approveFetchOption = {
    method: "POST",
    body: new URLSearchParams(JSON.parse(dataPayApprove)),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(APPROVE_URL, approveFetchOption);
    const result = await res.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

// 결제 준비
export const payReady = async (statePayReady) => {
  const parseStatePayReady = JSON.parse(statePayReady);
  console.log(parseStatePayReady);

  const kakaoFetchOption = {
    method: "POST",
    body: new URLSearchParams(parseStatePayReady),
    headers: {
      Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  try {
    const res = await fetch(READY_URL, kakaoFetchOption);
    const result = await res.json();
    console.log(result);
    localStorage.setItem("tid", result.tid);
    document.location.href = result.next_redirect_pc_url;
  } catch (e) {
    console.log("kakao error", e);
  }
};
