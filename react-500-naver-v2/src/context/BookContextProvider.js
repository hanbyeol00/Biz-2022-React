import { createContext, useState, useContext } from "react";

const BookContext = createContext();

export const useBookContext = () => {
  return useContext(BookContext);
};

export const BookContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);

  const naver_search = async () => {
    const res = await fetch(`/api/book/search?search=${search}`);
    const result = await res.json();
    if (!result?.CODE) {
      setBookList([...result]);
    }
    console.log(result);
  };

  const propsStore = {
    search,
    setSearch,
    bookList,
    setBookList,
    naver_search,
  };

  return (
    <BookContext.Provider value={propsStore}>{children}</BookContext.Provider>
  );
};
