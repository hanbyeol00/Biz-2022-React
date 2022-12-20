import axios from "axios";
import { useEffect } from "react";
import "./css/App.css";
import MainPage from "./comps/MainPage";
import "./css/Main.css";

function App() {
  const callApi = async () => {
    axios.get("/api").then((res) => console.log(res.data.test));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      <MainPage />
    </div>
  );
}

export default App;
