import logo from "./logo.svg";
import "./App.css";
import { images } from "./modules/image";
import { useState } from "react";

function App() {
  const [position, setPosition] = useState(0);
  const [mouseX, setMouseX] = useState(0);

  const IMAGE_WIDTH = 500;

  const imagePrev = () => {
    setPosition(true);
  };
  const imageNext = () => {
    setPosition(false);
  };

  const onDragOverHandler = (e) => {
    e.preventDefault();
    e.currentTarget.style.opacity = "0.4";
  };
  const onDragEndHandler = (e) => {
    const box = e.currentTarget;
    box.style.opacity = "1";
    if (e.pageX < mouseX && position > -1 * (images.length - 1) * IMAGE_WIDTH) {
      setPosition(position - IMAGE_WIDTH);
    } else if (e.pageX > mouseX && position < 0) {
      setPosition(position + IMAGE_WIDTH);
    }
    setMouseX(e.pageX);
  };

  const onMouseDownHandler = (e) => {
    setMouseX(e.pageX);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div
        className="image-view"
        draggable="true"
        onDragEnd={onDragEndHandler}
        onDragOver={onDragOverHandler}
        onMouseDown={onMouseDownHandler}
      >
        <div
          className="image-box"
          style={{ transform: `translateX(${position}px)` }}
          draggable="false"
        >
          {images.map((image, index) => (
            <img
              src={image}
              width="100%"
              height="100%"
              alt={index}
              key={index}
              draggable={false}
            />
          ))}
          {images.map((image, index) => (
            <img
              src={image}
              width="100%"
              height="100%"
              alt={`2_${index}`}
              key={`2_${index}`}
            />
          ))}
        </div>
      </div>
      <div className="button-box">
        <div className="button" onClick={imagePrev}>
          Prev
        </div>
        <div className="button" onClick={imageNext}>
          Next
        </div>
      </div>
    </div>
  );
}

export default App;
