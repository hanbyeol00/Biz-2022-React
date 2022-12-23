import "./css/App.css";
import "./css/Main.css";
import MainPage from "./comps/MainPage";
import Layout from "./comps/Main/Layout";
import { useState } from "react";
import Footer from "./comps/Footer";
import Map from "./comps/Main/Map";
import MainView from "./comps/community/MainView";

function App() {
  // const callApi = async () => {
  //   axios.get("/api").then((res) => console.log(res.data.test));
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  return (
    <div className="App">
      <Layout />
      <section className="mainPage">
        {/* <MainPage /> */}
        <Map />
        <MainView />
      </section>
      <Footer />
    </div>
  );
}

export default App;
