import "./css/App.css";

import BookMain from "./comps/BookMain";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>나의 독서록</h1>
      </header>
      <BookMain />
    </div>
  );
};

export default App;
