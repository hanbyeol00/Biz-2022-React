import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import { navCol } from "../nav/classNames/ClassNames";
import { FaPenSquare, FaHome } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { IoPeopleCircleSharp, IoLayersSharp } from "react-icons/io5";

const NavCol = () => {
  const { userSession, logoutHandler } = useUserContext();
  const regist = "회원\n가입";
  return (
    <div className="flex flex-col p-3 top-15 min-w-fit bg-black/90 h-screen p-1 content-center fixed">
      <Link className={navCol} to="/">
        <FaHome size={30} />
      </Link>

      <Link className={navCol} to="/community">
        <FaPenSquare size={30} />
      </Link>
      <Link className={navCol} to="/contents">
        <IoLayersSharp size={30} />
      </Link>
      <Link className={navCol} height="50px" to="/creater">
        <IoPeopleCircleSharp size={30} />
      </Link>
      {userSession.username ? (
        <Link className={navCol} onClick={logoutHandler} to="#">
          {userSession.nickname}
          <FiLogOut siez={20} className="m-auto" />
        </Link>
      ) : (
        <Link className={navCol} to="/user/login">
          <FiLogIn size={30} />
        </Link>
      )}
      {userSession.username ? null : (
        <Link className={navCol} to="/user">
          {regist}
        </Link>
      )}
    </div>
  );
};
export default NavCol;
