import Layout from "./comps/main/Layout";
import Footer from "./comps/main/Footer";
import MainRouter from "./page/MainRouter";
import { BrowserRouter } from "react-router-dom";
import "./css/App.css";
import "./css/Main.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        <MainRouter />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
