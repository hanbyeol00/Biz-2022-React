import { createContext, useContext, useState, useEffect } from "react";
import { getMyBooks } from "../service/book.service";
import { useUserContext } from "./UserContextProvider";

const MyBookContext = createContext();

export const useMyBookContext = () => {
  return useContext(MyBookContext);
};

export const MyBookContextProvider = ({ children }) => {
  const [myBookList, setMyBookList] = useState([]);
  const { sessionUser } = useUserContext();
  const [myBook, setMyBook] = useState({
    title: "",
    link: "",
    isbn: "",
    image: "",
    author: "",
    publisher: "",
    discount: "",
  });
  const [myodate, setMyOdate] = useState("");

  useEffect(() => {
    const MyBookFetch = async () => {
      const result = await getMyBooks(sessionUser.username);
      if (result) setMyBookList([...result]);
    };
    MyBookFetch();
    console.log(myBookList);
  }, [sessionUser]);

  const myBookAdd = (isbn) => {
    if (!sessionUser?.username) {
      alert("로그인을 다시 수행 하세요");
      return false;
    }
  };

  const props = {
    myBookList,
    setMyBookList,
    myBookAdd,
    myBook,
    setMyBook,
    myodate,
    setMyOdate,
  };

  return (
    <MyBookContext.Provider value={props}>{children}</MyBookContext.Provider>
  );
};
