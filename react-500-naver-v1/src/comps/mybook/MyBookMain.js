import CardMain from "../CardMain";
import MyBookList from "./MyBookList";
import "../../css/Book.css";

const MyBookMain = () => {
  return (
    <CardMain maxHeight="800px" width="70%" header={<h1>내 도서 목록</h1>}>
      <MyBookList />
    </CardMain>
  );
};
export default MyBookMain;
