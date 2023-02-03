import { Outlet } from "react-router-dom";
import Nav from "./comp/NavCol";
import NavRow from "./comp/NavRow";
import "./css/App.css";

function AppSample() {
  return (
    <div className="App w3-container">
      <NavRow />
      <div className="flex flex-row">
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}

export default AppSample;
