import logo from "./logo.svg";
import "./css/App.css";
import "./css/index.css";
import VideoMain from "./comp/Video/main";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <VideoMain />
    </div>
  );
}

export default App;
