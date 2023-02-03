import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavDynamic from "./NavDynamic";
import { useAutoSearchContext } from "../context/AutoSearchProvider";
import { useUserContext } from "../context/UserContextProvider";
import MainButton from "./mainpage/MainButton";
import "../css/mainbar.css";

const NavRow = () => {
  const [nOpen, setNOpen] = useState(false);
  const navigate = useNavigate();
  const {
    currentSearch,
    setCurrentSearch,
    onChange,
    onKeyUp,
    autoComplete,
    setAutoComplete,
  } = useAutoSearchContext();
  const { userSession, logoutHandler } = useUserContext();
  const searchRef = useRef();

  const borderStyle = {
    padding: "1rem",
    borderBottomWidth: "2px",
    height: "40px",
    borderColor: "black",
    marginTop: "8px",
    marginBottom: "8px",
  };
  const onClick = () => {
    if (currentSearch) {
      navigate("/search");
    } else {
      alert("검색어를 입력하세요");
      searchRef();
    }
  };

  const autoClick = (e) => {
    setCurrentSearch(e.target.innerHTML);
    setAutoComplete([null]);
  };
  const openClickHandler = () => {
    setNOpen(!nOpen);
    console.log(nOpen);
  };
  const autoCompleteView = autoComplete?.map((word, index) => {
    return (
      <div
        key={index}
        className="cursor-pointer hover:bg-gray-300 rounded-lg"
        onClick={autoClick}
      >
        {word}
      </div>
    );
  });

  return (
    <>
      <div className="mainbar flex bg-slate-700/60 top-0 left-0 right-0 mb-12 fixed pr-2 z-50">
        <div
          className="flex w-12 h-8 m-3 mr-0 content-center justify-center cursor-pointer"
          onClick={openClickHandler}
        >
          <img
            src="./image/burger.png"
            width="40px"
            height="50px"
            alt="burgermenu"
          />
        </div>
        <div className="ml-auto">
          <MainButton />
        </div>

        <div className="flex m-auto relative ">
          <input
            onChange={onChange}
            onKeyUp={onKeyUp}
            value={currentSearch}
            // ref={searchRef.inputRef}
            className="bg-white outline-none rounded-full p-12 "
            style={borderStyle}
            id="search"
          />
          {autoComplete ? (
            <div className="absolute top-11 left-0 min-h-fit min-w-full bg-white border-black rounded-lg shadow-lg">
              {autoCompleteView}
            </div>
          ) : (
            ""
          )}

          <label
            className="mt-3 bg-white h-8 rounded-full cursor-pointer"
            htmlFor="search"
          >
            <img
              onClick={onClick}
              src="./image/images.png"
              alt="searchImage"
              width="50px"
              height="30px"
              className="rounded-full"
            ></img>
          </label>
        </div>
        {userSession.username ? null : (
          <Link
            className="ml-auto mt-2 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ring-1 ring-white"
            to="/user/login"
          >
            로그인
          </Link>
        )}
        {userSession.username ? (
          <Link
            className="ml-auto mt-2 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ring-1 ring-white"
            to="/mypage"
          >
            {userSession.nickname} 님의 페이지
          </Link>
        ) : (
          <Link
            to="/regist"
            className="ml-2 mt-2 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ring-1 ring-white"
          >
            회원가입
          </Link>
        )}
        {userSession.username ? (
          <div
            onClick={logoutHandler}
            className="ml-2 mt-2 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ring-1 ring-white"
          >
            {userSession.nickname} 로그아웃
          </div>
        ) : null}
      </div>
      <NavDynamic nOpen={nOpen} />
    </>
  );
};

export default NavRow;
