import { User } from "../models/User";
// login 된 사용자 정보 가져오기
const getLoginUser = async () => {
  const res = await fetch("/api/user/session");
  const result = await res.json();
  if (result?.CODE_NUM > 200) return null;
  return result;
};

const setLogin = async (loginUser) => {
  const user = new User(loginUser.username, loginUser.password);
  const fetchOption = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch("/api/user/login", fetchOption);
  const result = await res.json();
  // if (result?.CODE_NUM === 401 && result.SUB_CODE === "USERNAME") {
  //   alert(`${user.username}은 가입된 사용자가 아닙니다`);
  // } else if (result?.CODE_NUM === 401 && result.SUB_CODE === "PASSWORD") {
  //   alert("비밀번호를 확인해 주세요");
  // } else {
  //   return result;
  // }
  return result;
};

const Auth = { getLoginUser, setLogin };
export default Auth;
