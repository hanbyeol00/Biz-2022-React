import { useEffect, useState } from "react";
import "../css/Book.css";
import Modal from "./ModalMain";
import BookInput from "./BookInput";
import BookList from "./BookList";
import { getQueryData } from "../modules/NaverBookFetch";
// default 로 export 한 모듈과 이름으로 export 한 모듈을 동시에 가져오기
import BookListData, { BookData } from "../data/BookListData";
import NaverBookList from "./NaverBookList";

const BookMain = () => {
  // 임시로 만들어진 List 데이터를 가져와서 state 배열 생성
  // List 를 보여줄때 사용할 데이터
  const [bookListData, setBookList] = useState(BookListData);
  // 한개 도서의 데이터
  // input box 에 입력한 내용을 임시 저장할 변수
  const [bookData, setBookData] = useState(BookData);
  const [naverBookListData, setNaverBookListData] = useState([]);
  const [openModel, setOpenModel] = useState({
    input: false,
    naver: false,
  });

  /**
   * useEffect( 함수, [] ) 형식의 사용
   * - 화면이 최초 rendering 될때 "한번만" 실행 하라
   */
  useEffect(() => {
    const fetchBook = async () => {
      const result = await getQueryData("자바스크립트");
      setNaverBookListData(result);
      console.log(result);
    };
    fetchBook();
  }, []);
  const bookDataInsert = () => {
    const length = bookListData.length;

    setBookList([
      ...bookListData,
      {
        b_isbn: Number(bookListData[length - 1].b_isbn) + 1,
        b_title: bookData.b_title,
      },
    ]);
  };

  const modalOpenToggle = (name) => {
    // [name] : true
    // 이 코드가 실행되는 원리
    // name 변수에 "naver" 라는 문자열이 전달되어 오면 naver:true 가 만들어진다
    // name 변수에 "input" 라는 문자열이 전달되어 오면 input:true 가 만들어진다
    // name 변수에 "naver" 라는 문자열이 전달되어 오면
    //      naver : !openModel["naver"] == true 와 false 를 반전시키기
    setOpenModel({ ...openModel, [name]: !openModel[name] });
  };

  return (
    <div className="Book">
      <div>{bookData.b_title}</div>
      <BookList bookListData={bookListData} />
      <div>
        <button onClick={() => modalOpenToggle("input")}>입력창</button>
        <button onClick={() => modalOpenToggle("naver")}>네이버</button>
      </div>
      <Modal open={openModel.input} close={() => modalOpenToggle("input")}>
        <BookInput
          bookData={bookData}
          setBookData={setBookData}
          bookDataInsert={bookDataInsert}
        />
      </Modal>
      <Modal
        open={openModel.naver}
        close={() => modalOpenToggle("naver")}
        width="1200"
      >
        <NaverBookList bookListData={naverBookListData} />
      </Modal>
    </div>
  );
};
export default BookMain;
