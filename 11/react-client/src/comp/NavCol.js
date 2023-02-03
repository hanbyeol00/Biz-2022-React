import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";

const NavCol = () => {
  const { userSession, logoutHandler } = useUserContext();
  return (
    <div className="flex flex-col top-15 min-w-fit bg-slate-700/60 h-screen p-1 content-center fixed">
      <Link
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center ring-1 ring-white"
        to="/"
      >
        <img
          className="m-auto"
          src="./image/images.png"
          width="50px"
          height="30px"
          alt="home"
        />
        <h3>Home</h3>
      </Link>
      <Link
        className="mt-12 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center ring-1 ring-white"
        to="/bbs"
      >
        게시판
      </Link>
      <Link
        className="mt-12 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center ring-1 ring-white"
        to="/contents"
      >
        노하우
      </Link>
      <Link
        className="mt-12 w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center ring-1 ring-white"
        height="50px"
        to="/creater"
      >
        크리에이터
      </Link>
      {userSession.username ? (
        <Link
          to=""
          className="mt-12 max-w-[112px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center ring-1 ring-white"
          onClick={logoutHandler}
        >
          {userSession.nickname} 님 로그아웃
        </Link>
      ) : (
        <Link
          className="mt-12 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ring-1 ring-white"
          to="/user/login"
        >
          로그인
        </Link>
      )}
      {userSession.username ? null : (
        <Link
          className="mt-12 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ring-1 ring-white"
          to="/user"
        >
          회원가입
        </Link>
      )}
    </div>
  );
};
export default NavCol;
