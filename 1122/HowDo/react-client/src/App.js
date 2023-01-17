import logo from "./logo.svg";
import "./css/App.css";
import "./css/index.css";
import Video from "./comp/Video/Video";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Video />
    </div>
  );
}

export default App;
