import React, { useEffect, useState } from "react";
import "../css/style.scss";

function Bookmark() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [data, setData] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/test/bookmark");
      const result = await res.json();
      setData([...result]);
    };
    fetchData();
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  console.log(data);
  return (
    <div className="BookMark">
      <div className="nav-container">
        <nav className={isNavOpen ? "nav-open" : ""}>
          <div className="menu-btn" onClick={toggleNav}>
            <div className="line line__1"></div>
            <div className="line line__2"></div>
            <div className="line line__3"></div>
          </div>
          <ul className="nav-links">
            <li
              className={selectedCategory === "All" ? "selected" : ""}
              onClick={() => handleCategoryClick("All")}
            >
              All
            </li>
          </ul>
        </nav>
      </div>
      <div className="content-container">
        <header className="App-header">
          <h1 className="FAQ">FAQ</h1>
        </header>
        <main>
          {data.map((qa, index) => (
            <div key={index} className="qa-set">
              <h2>{qa.f_talk_cate.question}</h2>
              <p>{qa.f_talk_cate.answer}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Bookmark;
