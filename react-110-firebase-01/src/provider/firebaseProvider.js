import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// import firebase from "firebase"
// firebase.getAuth()
// firebase dependency 중에서 auth중에 getAuth 함수만 사용하겠다
// 경량화 import
import { firebaseApp } from "../firebase/firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth(firebaseApp);

const FirebaseContext = createContext();
export const useFirebaseContext = () => {
  return useContext(FirebaseContext);
};

export const FirebaseContextProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState();
  const [loginMessage, setLoginMessage] = useState({ id: "", message: "" });

  useEffect(() => {
    // firebase 에 로그인이 되면 event 를 발생시키는 callback 함수
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        console.log(`로그인이 되었습니다 ${user.displayName}님`);
        setLoginUser({ ...user });
      } else {
        console.log("로그아웃");
        setLoginUser(null);
      }
    });
  }, [setLoginUser]);

  const googleSignIn = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (result != null) setLoginUser({ ...result.user });
  }, [setLoginUser]);

  const googleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  const emailLogin = useCallback(
    async (user) => {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((result) => setLoginUser({ ...result.currentUser.user }))
        .catch((e) => {
          if (e.code === "auth/wrong-password") {
            setLoginMessage({
              id: "password",
              message: "비밀번호를 확인하세요",
            });
          } else if (e.code === "auth/too-many-requests") {
            setLoginMessage({
              id: "many-requests",
              message: "로그인 요청을 너무 많이 시도했습니다",
            });
          } else if (e.code === "auth/user-not-found") {
            setLoginMessage({
              id: "email",
              message: "가입되지 않은 이메일입니다",
            });
          } else if (e.code === "auth/invalid-email") {
            setLoginMessage({
              id: "email",
              message: "이메일 형식이 틀렸거나 이메일이 입력되지 않았습니다",
            });
          } else {
            setLoginMessage({ id: "etc", message: e.code });
          }
        });
    },
    [setLoginMessage]
  );

  const props = {
    loginUser,
    setLoginUser,
    googleSignIn,
    googleSignOut,
    emailLogin,
    loginMessage,
  };

  return (
    <FirebaseContext.Provider value={props}>
      {children}
    </FirebaseContext.Provider>
  );
};
