import React, { useEffect, useState } from "react";
import "../css/style.scss";
import CategoryAddModal from "./CategoryAddModal";

function Bookmark() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryItem, setCategoryItem] = useState([]);
  const [data, setData] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/test/bookmark/${selectedCategory}`);
      const { result, categoryList } = await res.json();
      setData([...result]);
      setCategoryItem([...categoryList]);
    };
    fetchData();
  }, [selectedCategory]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const uniqueCategories = [
    ...new Set(categoryItem.map((category) => category.category)),
  ];

  const onDeleteHandler = (e) => {
    const category = e.target.getAttribute("data-category");
    const confirmed = window.confirm(
      `${category} 카테고리의 북마크를 삭제하시겠습니까?`
    );
    if (!confirmed) {
      return;
    }

    const url = `/test/bookmark/delete?category=${category}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다");
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        // 새로운 상태를 적용해주는 함수 호출 등 추가 로직 수행
      })
      .catch((error) => {
        console.error("네트워크 작업에 문제가 있습니다:", error);
      });

    setSelectedCategory("All");
  };

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
            {uniqueCategories.map((categoryName) => {
              const category = categoryItem.find(
                (c) => c.category === categoryName
              );
              return (
                <li
                  key={category.category}
                  className={
                    selectedCategory === `${category.category}`
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleCategoryClick(`${category.category}`)}
                >
                  {category.category}
                  {category.category !== "All" && (
                    <div
                      className="edit_category_button"
                      onClick={() => {
                        setSelectedCategory(category.category);
                        toggleModal();
                      }}
                    >
                      수정
                    </div>
                  )}
                </li>
              );
            })}
            <div className="add_button" onClick={toggleModal}>
              +
            </div>
          </ul>
        </nav>
      </div>
      <div className="content-container">
        <header className="App-header">
          <h1 className="FAQ">FAQ</h1>
          <h2
            className="category"
            style={{ marginLeft: selectedCategory === "All" ? "6em" : "8em" }}
          >
            카테고리 : {selectedCategory}
            {selectedCategory !== "All" && (
              <span
                className="bookmark-delete"
                data-category={selectedCategory}
                onClick={onDeleteHandler}
              >
                &times;
              </span>
            )}
          </h2>
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
      <CategoryAddModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        qaData={categoryItem}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default Bookmark;
