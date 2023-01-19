import { createContext, useContext, useState, useEffect, useRef } from "react";
import { User } from "../models/User";
import AuthService from "../service/auth.service";
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(new User());
  const [sessionUser, setSessionUser] = useState(new User());
  const [openModel, setOpenModel] = useState({
    input: false,
  });
  // html의 id 속성을 UUID 로 생성해 주는 hook
  const usernameRef = useRef();
  const passwordRef = useRef();
  const inputRef = { usernameRef, passwordRef };

  const OpenModelHandler = (name) => {
    setOpenModel({ ...openModel, [name]: !openModel[name] });
  };
  useEffect(() => {
    const userFetch = async () => {
      let user = await AuthService.getLoginUser();
      if (user) {
        console.log("Provider", sessionUser);
        setSessionUser(user);
      } else {
        setSessionUser({});
      }
    };
    userFetch();
  }, []);

  const userLogin = async () => {
    const result = await AuthService.setLogin(loginUser);
    if (result?.CODE === "REQ_USERNAME") {
      alert("USERNAME 은 반드시 입력해야 합니다");
      usernameRef.current.select();
    } else if (result?.CODE === "MATCH_NOT_USERNAME") {
      alert(`${loginUser.username} 은 가입된 사용자가 아님`);
      usernameRef.current.select();
    } else if (result?.CODE === "REQ_PASSWORD") {
      alert(`비밀번호를 반드시 입력해 주세요`);
      passwordRef.current.select();
    } else if (result?.CODE === "MATCH_NOT_PASSWORD") {
      alert(`비밀번호가 일치하지 않습니다`);
      passwordRef.current.select();
    } else {
      setSessionUser(result);
    }
  };

  const props = {
    loginUser,
    setLoginUser,
    userLogin,
    sessionUser,
    setSessionUser,
    inputRef,
    openModel,
    setOpenModel,
    OpenModelHandler,
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
