import { createContext, useContext, useState, useEffect } from "react";
import MyBookList from "../comps/mybook/MyBookList";
import { getMyBooks } from "../service/book.service";
import { useUserContext } from "./UserContextProvider";

const MyBookContext = createContext();

export const useMyBookContext = () => {
  return useContext(MyBookContext);
};

export const MyBookContextProvider = ({ children }) => {
  const [myBookList, setMyBookList] = useState([]);
  const { sessionUser } = useUserContext();

  useEffect(() => {
    const MyBookFetch = async () => {
      const result = await getMyBooks(sessionUser.username);
      if (result) setMyBookList([...result.MYBOOKS]);
    };
    MyBookFetch();
    console.log(myBookList);
  }, [sessionUser]);

  const props = { myBookList, setMyBookList };

  return (
    <MyBookContext.Provider value={props}>{children}</MyBookContext.Provider>
  );
};
