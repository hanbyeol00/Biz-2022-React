import "./css/App.css";
import "./css/Main.css";
import MainPage from "./comps/MainPage";
import Layout from "./comps/Main/Layout";
import Footer from "./comps/Footer";
import Map from "./comps/Main/Map";

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
        <MainPage />
        <Map />
      </section>
      <Footer />
    </div>
  );
}

export default App;
