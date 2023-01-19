import { useBookContext } from "../../context/BookContextProvider";
import BookItem from "./BookItem";
import Modal from "./Modal";
import { useUserContext } from "../../context/UserContextProvider";
import { useMyBookContext } from "../../context/MyBookContextProvider";
const BookListView = (props) => {
  const { bookList } = props;
  return bookList?.map((book) => {
    return <BookItem book={book} key={book.isbn} />;
  });
};
const BookView = (props) => {
  const { myBook } = useMyBookContext();
  const { bookList } = props;
  const bookItem = bookList?.filter((book) => {
    return book.isbn == myBook.isbn;
  });
  return bookItem?.map((book) => {
    return <BookItem book={book} key={book.isbn} />;
  });
};
const BookList = () => {
  const { sessionUser, openModel, OpenModelHandler } = useUserContext();
  const { setMyBookList, myBook, setMyOdate, myodate } = useMyBookContext();

  const context = useBookContext();
  const onChangeHandler = (e) => {
    setMyOdate(e.target.value);
  };
  const onkeydownHandler = async (e) => {
    if (e.keyCode === 13) {
      if (!sessionUser.username) {
        alert("로그인이 필요한 기능입니다");
        return false;
      }
      const Item = {
        odate: myodate,
        username: sessionUser.username,
        isbn: myBook.isbn,
        title: myBook.title,
        link: myBook.link,
        image: myBook.image,
        author: myBook.author,
        discount: myBook.discount,
        publisher: myBook.publisher,
      };
      const fetchOption = {
        method: "POST",
        body: JSON.stringify(Item),
        headers: {
          "Content-Type": "application/json",
        },
      };
      setMyOdate();
      OpenModelHandler("input");
      try {
        const res = await fetch("/api/book/insert", fetchOption);
        const result = await res.json();
        if (result) setMyBookList([...result]);
      } catch (e) {
        return console.log(e);
      }
    }
  };

  return (
    <>
      <ul className="w3-ul book">
        <BookListView bookList={context.bookList} />
      </ul>
      <Modal open={openModel.input} close={() => OpenModelHandler("input")}>
        <BookView bookList={context.bookList} />
        <input
          placeholder="구매일 입력후 Enter..."
          value={myodate}
          type="date"
          onChange={onChangeHandler}
          onKeyDown={onkeydownHandler}
        />
      </Modal>
    </>
  );
};

export default BookList;
