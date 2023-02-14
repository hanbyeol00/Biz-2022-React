import { useState, createContext, useContext } from "react";
const AutoSearchContext = createContext();

export const useAutoSearchContext = () => {
  return useContext(AutoSearchContext);
};

export const AutoSearchContextProvider = ({ children }) => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [savedKeyword, setSavedKeyword] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [searchedData, setSearchedData] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  // 입력창 value 변경 함수
  const onChange = (e) => {
    setCurrentSearch(e.target.value);
  };
  // delay 함수
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  // 자동완성 문구 fetch 함수
  const onKeyUp = async (e) => {
    sleep(500).then(async () => {
      const result = await fetch(`/mypage/search`);
      const keyword = await result?.json();
      setSavedKeyword([...keyword.keyword_v, ...keyword.keyword_u]);

      if (currentSearch) {
        const result = savedKeyword
          .filter((keyword) => {
            return (
              keyword.v_title?.includes(currentSearch) ||
              keyword.nickname?.includes(currentSearch)
            );
          })
          .map((keyword) => {
            return Object.values(keyword)[0];
          });
        setAutoComplete([...result]);
      } else return setAutoComplete([null]);
    });
  };

  // 자동완성 popup 에서 value 추출 후 input value 로 치환 함수
  const autoClick = (e) => {
    // console.log(e.target.className);
    if (e.target.className.indexOf("autocomplete") === 0) {
      setCurrentSearch(e.target.innerHTML);
      setAutoComplete([null]);
    }
    setAutoComplete([]);
  };
  const props = {
    currentSearch,
    setCurrentSearch,
    onChange,
    onKeyUp,
    autoComplete,
    setAutoComplete,
    searchedData,
    setSavedKeyword,
    autoClick,
    setSearchedData,
    searchKeyword,
    setSearchKeyword,
  };
  return (
    <AutoSearchContext.Provider value={props}>
      {children}
    </AutoSearchContext.Provider>
  );
};
