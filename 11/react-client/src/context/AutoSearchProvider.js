import { useState, createContext, useContext, useEffect } from "react";
import { SearchedData } from "../data/searcheddata";
const AutoSearchContext = createContext();

export const useAutoSearchContext = () => {
  return useContext(AutoSearchContext);
};

export const AutoSearchContextProvider = ({ children }) => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [savedKeyword, setSavedKeyword] = useState("");
  const [autoComplete, setAutoComplete] = useState([null]);
  const [searchedData, setSearchedData] = useState(SearchedData);
  const onChange = (e) => {
    setCurrentSearch(e.target.value);
  };
  console.log(searchedData);
  useEffect(() => {
    (async () => {
      const result = await fetch(`/mypage/search/search`);
      const keyword = await result?.json();
      // console.log(keyword);
      setSavedKeyword([...keyword.keyword_v, ...keyword.keyword_u]);
      // console.log(savedKeyword);
    })();
  }, [currentSearch]);

  const onKeyUp = (e) => {
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
      console.log(autoComplete);
    } else return setAutoComplete([null]);
  };

  const props = {
    currentSearch,
    setCurrentSearch,
    onChange,
    onKeyUp,
    autoComplete,
    setAutoComplete,
    searchedData,
  };
  return (
    <AutoSearchContext.Provider value={props}>
      {children}
    </AutoSearchContext.Provider>
  );
};
