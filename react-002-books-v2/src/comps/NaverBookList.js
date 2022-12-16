import "../css/NaverBookList.css";

const NaverBookList = (props) => {
  const { bookListData, bookInsert } = props;

  const naverClickHandler = (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const b_isbn = tr.dataset.isbn;
      const b_title = tr.cells[0].textContent;
      const b_author = tr.cells[1].textContent;
      // BookMain.js 에 있는 함수에게 전달
      bookInsert({ b_isbn, b_title, b_author });
    }
  };

  const bookListView = bookListData.map((book) => {
    return (
      <tr key={book.isbn} data-isbn={book.isbn}>
        {/* <td>{book.isbn} </td> */}
        <td>{book.title} </td>
        <td>{book.author}</td>
        <td>{book.publisher} </td>
      </tr>
    );
  });
  return (
    <table className="Naver">
      <tbody onClick={naverClickHandler}>{bookListView}</tbody>
    </table>
  );
};
export default NaverBookList;
