import React, { useState } from "react";
import "./BookmarkPage.css";

const initialData = {
  general: [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript, used with React to describe what the user interface should look like.",
    },
  ],
  programming: [
    {
      question: "What is a loop?",
      answer:
        "A loop is a programming construct that repeats a sequence of instructions until a specific condition is met.",
    },
    {
      question: "What is a variable?",
      answer:
        "A variable is a storage location for data in a computer program.",
    },
  ],
  framework: [
    {
      question: "What is Angular?",
      answer:
        "Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google.",
    },
    {
      question: "What is Vue.js?",
      answer:
        "Vue.js is an open-source progressive JavaScript framework for building user interfaces.",
    },
  ],
};

function Bookmark() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [data, setData] = useState(initialData);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="hamburger-button" onClick={toggleMenu}>
          <span className="hamburger-icon" />
        </button>
        <h1>FAQ</h1>
      </header>
      <div className={`category-menu ${showMenu ? "show-menu" : ""}`}>
        <ul>
          <li
            className={selectedCategory === "general" ? "selected" : ""}
            onClick={() => handleCategoryClick("general")}
          >
            General
          </li>
          <li
            className={selectedCategory === "programming" ? "selected" : ""}
            onClick={() => handleCategoryClick("programming")}
          >
            Programming
          </li>
          <li
            className={selectedCategory === "framework" ? "selected" : ""}
            onClick={() => handleCategoryClick("framework")}
          >
            Framework
          </li>
        </ul>
      </div>
      <main>
        {data[selectedCategory].map((qa, index) => (
          <div key={index} className="qa-set">
            <h2>{qa.question}</h2>
            <p>{qa.answer}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Bookmark;
