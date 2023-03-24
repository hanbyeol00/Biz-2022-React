import React, { useEffect, useState } from "react";
import "../css/style.scss";
import CategoryAddModal from "./CategoryAddModal";
import CustomContextMenu from "./CustomContextMenu";

function Bookmark() {
  const [selectedCategory, setSelectedCategory] = useState({
    category: "All",
  });
  const [categoryItem, setCategoryItem] = useState([]);
  const [data, setData] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [audioID, setAudioID] = useState("");
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [categoryEdit, setCategoryEdit] = useState({
    prevCategory: "",
    t_seq: [],
    category: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/test/bookmark/${selectedCategory.category}`);
      const { result, categoryList } = await res.json();
      setData([...result]);
      setCategoryItem([...categoryList]);
    };
    fetchData();
  }, [selectedCategory]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleCategoryClick = (c) => {
    setSelectedCategory((prevState) => ({ ...prevState, category: c }));
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

    setSelectedCategory((prevState) => ({ ...prevState, category: "All" }));
  };

  const editOnClickHandler = (c) => {
    const tSeqArray = data.map((item) => item.t_seq);
    setCategoryEdit((prevState) => ({
      ...prevState,
      prevCategory: c,
      category: c,
      t_seq: tSeqArray,
    }));
    setSelectedCategory((prevState) => ({ ...prevState, category: c }));
    toggleModal();
  };

  const audioPlay = async (t_seq) => {
    try {
      const res = await fetch(`/test/audio`, {
        method: "POST",
        body: JSON.stringify({ t_seq: t_seq }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }

      const base64Audio = await res.json();
      const audio = new Audio(`data:audio/mp3;base64,${base64Audio.audio}`);
      audio.play();
      audio.addEventListener("ended", () => {
        console.log("오디오가 종료되었습니다.");
      });
      return audio;
    } catch (error) {
      alert(error.message);
    }
  };

  const onContextMenuHandler = (e) => {
    e.preventDefault();
    setContextMenuPosition({
      top: e.pageY + "px", // 마우스 클릭 위치
      left: e.pageX + "px", // 마우스 클릭 위치
    });
  };

  const closeContextMenu = () => {
    setContextMenuPosition(null); // 메뉴 닫기
  };

  const onBookmarkDeleteHandler = async () => {
    if (window.confirm("북마크를 삭제하시겠습니까?")) {
      setSelectedCategory((prevState) => ({ ...prevState, category: "All" }));
      await fetch(`/test/all/bookmark/delete`, {
        method: "DELETE",
        body: JSON.stringify({ t_seq: audioID }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return;
    }
  };

  return (
    <div className="BookMark">
      <div className="nav-container">
        <nav className={isNavOpen ? "nav-open category" : "category"}>
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
                    selectedCategory.category === `${category.category}`
                      ? "selected"
                      : ""
                  }
                  onClick={() => handleCategoryClick(`${category.category}`)}
                >
                  {category.category}
                  {category.category !== "All" &&
                    selectedCategory.category === category.category && (
                      <div
                        className="edit_category_button"
                        onClick={() => editOnClickHandler(category.category)}
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
            className={
              selectedCategory.category === "All"
                ? "category-all"
                : "category-list"
            }
          >
            카테고리 : {selectedCategory.category}
            {selectedCategory.category !== "All" && (
              <span
                className="bookmarks-delete"
                data-category={selectedCategory.category}
                onClick={onDeleteHandler}
              >
                &times;
              </span>
            )}
          </h2>
        </header>
        <main>
          {selectedCategory.category === "All"
            ? data.map((qa, index) => (
                <div
                  key={index}
                  className="qa-set"
                  onContextMenu={(e) => {
                    onContextMenuHandler(e);
                    setAudioID(qa.t_seq);
                  }}
                >
                  <div className="question">{qa.f_talk_cate.question}</div>
                  <p>{qa.f_talk_cate.answer}</p>
                </div>
              ))
            : data.map((qa, index) => (
                <div key={index} className="qa-set">
                  <div className="question">{qa.f_talk_cate.question}</div>
                  <p>{qa.f_talk_cate.answer}</p>
                </div>
              ))}
        </main>
      </div>
      {contextMenuPosition && (
        <CustomContextMenu
          audioPlay={audioPlay}
          audioID={audioID}
          onDeleteHandler={onBookmarkDeleteHandler}
          style={contextMenuPosition}
          onClose={closeContextMenu}
        />
      )}
      <CategoryAddModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        qaData={categoryItem}
        setSelectedCategory={setSelectedCategory}
        categoryEdit={categoryEdit}
        setCategoryEdit={setCategoryEdit}
      />
    </div>
  );
}

export default Bookmark;
