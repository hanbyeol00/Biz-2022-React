import { useCallback, useState } from "react";
import "../css/Book.css";
import Modal from "./ModalMain";
import BookInput from "./BookInput";
import BookList from "./BookList";
import BookComment from "./BookComment";

import { getQueryData } from "../modules/NaverBookFetch";
import { BookData } from "../data/BookListData";
import NaverBookList from "./NaverBookList";

const BookMain = () => {
  const [bookListData, setBookList] = useState([]);
  const [bookData, setBookData] = useState(BookData);
  const [naverBookListData, setNaverBookListData] = useState([]);
  const [openModel, setOpenModel] = useState({
    input: false,
    naver: false,
    comment: false,
  });

  /*
  naverFetch 함수는 BookMain.js 컴포넌트가 렌더링 될때마다 새롭게 생성된다
  이미 기존에 생성된 함수가 있지만 무시하고 새로만들고, 기존의 함수는 삭제한다
  생성->삭제->생성->삭제->생성->삭제 하는 반복이 계속적으로 일어날 것이다
  매번 똑같은 함수를 반복적으로 생성, 삭제 하는 것은 매우 비 효율적이다

  const naverFetch = async (b_title) => {
    const result = await getQueryData(b_title);
    setNaverBookListData(result);
    modalOpenToggle("naver");
  }
  */

  /**
   * 반복적으로 생성, 삭제가 이루어지는 함수를
   * Callback 메모이제이션(memoization) 함수로 생성을 한다
   * 누가? useCallback() 함수를 사용하여
   *
   * 메모이제이션(memoization) : 동일한 계산, 동일한 객체생성, 함수생성 등이 일어나는 경우
   * 이전에 계산된 결과를 메모리에 저장해두고, 동일한 계산의 반복을 제거하여
   * 실행하는 속도를 개선하는 기술
   * => 동적 계획법의 핵심기술
   */
  const naverFetch = useCallback((b_title) => {
    const fetchBook = async () => {
      const result = await getQueryData(b_title);
      setNaverBookListData(result);
      modalOpenToggle("naver");
    };
    fetchBook();
  }, []);

  const bookInsert = useCallback(
    (bookData) => {
      setBookList([...bookListData, bookData]);
      modalOpenToggle("naver");
    },
    [bookListData, bookData, openModel]
  );

  // BookInput 에서 Enter 를 눌렀을때 호출되는 함수
  const bookSearch = (b_title) => {
    // alert(b_title);
    // naverFetch() 라는 Callback "메모이제이션" 함수를 호출
    naverFetch(b_title);
  };

  const bookComment = (book) => {
    setBookData({ ...bookData, ...book });
    modalOpenToggle("comment");
  };

  const modalOpenToggle = (name) => {
    setOpenModel({ ...openModel, [name]: !openModel[name] });
  };

  return (
    <div className="Book">
      <BookInput
        bookData={bookData}
        setBookData={setBookData}
        bookSearch={bookSearch}
      />
      <BookList bookListData={bookListData} bookComment={bookComment} />
      <Modal
        header="네이버 도서 정보 검색 결과"
        open={openModel.naver}
        close={() => modalOpenToggle("naver")}
        width="1200"
      >
        <NaverBookList
          bookListData={naverBookListData}
          bookInsert={bookInsert}
        />
      </Modal>
      <Modal
        header="독서 소감"
        close={() => modalOpenToggle("comment")}
        open={openModel.comment}
      >
        <BookComment book={bookData} />
      </Modal>
    </div>
  );
};
export default BookMain;
