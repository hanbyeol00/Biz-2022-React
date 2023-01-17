import { useState } from "react";
import "./css/App.css";
import Nav from "./layout/nav";
import CardMain from "./comps/CardMain";
import BookList from "./comps/books/BookList";

function App() {
  const [search, setSearch] = useState("");
  const SearchInput = () => {
    return (
      <input
        className="w3-input w3-border w3-round"
        placeholder="검색어 입력..."
        value={search}
      />
    );
  };
  return (
    <div className="App w3-container">
      <header className="App-header w3-padding-24">
        <h1>나의 도서 정보</h1>
        <p>네이버 openAPI 를 연동한 도서정보</p>
      </header>
      <Nav />
      <CardMain maxHeight="600px" width="80%" header={<SearchInput />}>
        <BookList />
      </CardMain>
    </div>
  );
}

export default App;
