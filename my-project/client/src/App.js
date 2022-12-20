import axios from "axios";
import { useEffect } from "react";
import "./css/App.css";
import Layout from "./comps/Layout";
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
      <Layout />
    </div>
  );
}

export default App;
