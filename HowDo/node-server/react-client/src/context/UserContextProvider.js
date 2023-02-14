import { createContext, useContext, useState, useRef, useEffect } from "react";
import { User } from "../data/User";
import { Login } from "../data/Login";
import { UserSession } from "../data/UserSession";
import { fetchUser, fetchLogin, expireUser } from "../service/auth.service";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [creater, setCreater] = useState();
  const [modifierOpen, setModifierOpen] = useState(false);
  const [joinUser, setJoinUser] = useState(new User());
  const [login, setLogin] = useState(new Login());
  const [error, setError] = useState({});
  const [loginError, setLoginError] = useState({});
  const [userSession, setUserSession] = useState(new UserSession());
  const [modal, setModal] = useState({
    open: false,
  });
  const [cancel, setCancel] = useState({ open: false });

  const usernameRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const inputRef = { usernameRef, nicknameRef, passwordRef, rePasswordRef };

  const onClickHandler = async () => {
    const result = await fetchLogin(login);
    if (result.CODE) {
      setLoginError({ ...result });
    }
    setUserSession(result);
    if (result.username) document.location.href = "/";
    console.log(result);
  };

  // 모달창 열고 닫는 함수
  const modalHandler = () => {
    setModal({ ...modal, open: !modal.open });
    console.log(userSession);
  };

  const cancelHandler = () => {
    setCancel({ ...cancel, open: !cancel.open });
  };

  const logoutHandler = (e) => {
    fetch(`/user/logout`);
    setUserSession(new UserSession());
    document.location.href = "/";
    console.log(userSession);
  };

  let dataExpireUser;

  useEffect(() => {
    (async () => {
      const loginUser = await fetchUser();
      if (loginUser) {
        setUserSession(loginUser);
      } else {
        setUserSession(new UserSession());
      }
    })();
    console.log(userSession);
  }, []);

  const props = {
    joinUser,
    setJoinUser,
    inputRef,
    error,
    setError,
    loginError,
    setLoginError,
    login,
    setLogin,
    userSession,
    setUserSession,
    onClickHandler,
    logoutHandler,
    modal,
    setModal,
    modalHandler,
    cancel,
    setCancel,
    cancelHandler,

    creater,
    setCreater,
    modifierOpen,
    setModifierOpen,
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
