import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavDynamic from "./NavDynamic";
import { useAutoSearchContext } from "../context/AutoSearchProvider";
import { useUserContext } from "../context/UserContextProvider";
import MainButton from "./mainpage/MainButton";
import "../css/mainbar.css";
import { navRow, navRowMlAuto } from "../nav/classNames/ClassNames";
import { IoMenu, IoSearchOutline } from "react-icons/io5";
const NavRow = () => {
  const [nOpen, setNOpen] = useState(false);
  const navigate = useNavigate();
  const { currentSearch, onChange, onKeyUp, autoComplete, setCurrentSearch } =
    useAutoSearchContext();
  const { userSession, logoutHandler } = useUserContext();
  const { searchKeyword, setSearchKeyword } = useAutoSearchContext();
  const [idx, setIdx] = useState(0);
  const [temp, setTemp] = useState();
  const searchRef = useRef(null);
  const searchParentRef = useRef();
  const borderStyle = {
    padding: "1rem",
    borderBottomWidth: "2px",
    height: "40px",
    borderColor: "black",
    marginTop: "8px",
    marginBottom: "8px",
  };

  const onClick = async () => {
    if (currentSearch) {
      setSearchKeyword(currentSearch);
      navigate(`/search/${currentSearch}`);
    } else {
      alert("검색어를 입력하세요");
      searchRef.current.focus();
    }
  };

  const pressEnter = (e) => {
    setIdx(0);
    const word = searchParentRef?.current?.children;
    if (!currentSearch && e.keyCode === 13) {
      alert("검색어를 입력하세요");
      searchRef.current.focus();
    }
    if (currentSearch) {
      switch (e.keyCode) {
        case 38:
          if (idx - 1 === -1) {
            setIdx(searchParentRef.current.childElementCount - 1);
          } else setIdx(idx - 1);

          console.log(idx);

          setTemp(word[idx]?.innerText);
          console.log(temp);

          break;
        case 40:
          console.log(idx);
          setIdx(idx + 1);
          setTemp(word[idx]?.innerText);
          console.log(temp);
          if (searchParentRef.current.childElementCount === idx + 1) setIdx(0);

          break;
        case 27:
          setIdx(0);
          setCurrentSearch();
          break;
        case 13:
          if (temp) setCurrentSearch(temp);
          else setCurrentSearch(currentSearch);
          navigate(`/search/${currentSearch}`);
          setCurrentSearch();
          break;
      }
    }
  };

  const openClickHandler = () => {
    setNOpen(!nOpen);
    // console.log(nOpen);
  };

  const autoCompleteView = autoComplete?.map((word, index) => {
    return (
      <>
        {idx === index ? (
          <div
            key={index}
            className="autocomplete cursor-pointer pl-4 mb-1 hover:bg-gray-300 rounded-lg bg-gray-300"
          >
            {word}
          </div>
        ) : (
          <div
            key={index}
            className="autocomplete cursor-pointer pl-4 mb-1 hover:bg-gray-300 rounded-lg"
          >
            {word}
          </div>
        )}
      </>
    );
  });
  return (
    <>
      <div className="mainbar flex bg-black/90 top-0 left-0 right-0 mb-12 fixed pr-2 z-50">
        <div className="flex w-12 h-8 m-3 mr-0 content-center justify-center cursor-pointer ">
          <IoMenu color="white" size={30} onClick={openClickHandler} />
        </div>
        <div className="ml-auto">
          <MainButton />
        </div>

        <div className="flex m-auto relative ">
          <input
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyDown={pressEnter}
            value={currentSearch}
            ref={searchRef}
            className="bg-white outline-none rounded-full p-12 "
            style={borderStyle}
          />
          {autoComplete ? (
            <div
              className="absolute top-12 left-0 min-h-fit min-w-[213px] bg-white border-black rounded-lg shadow-lg"
              ref={searchParentRef}
            >
              {autoCompleteView}
            </div>
          ) : null}

          <label className="mt-3 bg-white h-8 rounded-full cursor-pointer">
            <IoSearchOutline
              onClick={onClick}
              size={31}
              className="rounded-full"
            />
          </label>
        </div>
        {userSession.username ? null : (
          <Link className={navRowMlAuto} to="/user/login">
            로그인
          </Link>
        )}
        {userSession.username ? (
          <div
            className={navRowMlAuto}
            onClick={() => {
              navigate(`/${userSession.nickname}`);
            }}
          >
            {userSession.nickname} 님의 페이지
          </div>
        ) : (
          <Link to="/user" className={navRow}>
            회원가입
          </Link>
        )}
        {userSession.username ? (
          <div onClick={logoutHandler} className={navRow}>
            {userSession.nickname} 로그아웃
          </div>
        ) : null}
      </div>
      <NavDynamic nOpen={nOpen} setNOpen={setNOpen} />
    </>
  );
};

export default NavRow;
