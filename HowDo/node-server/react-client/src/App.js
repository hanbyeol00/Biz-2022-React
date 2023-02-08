import { Outlet } from "react-router-dom";
import Nav from "./comp/NavCol";
import NavRow from "./comp/NavRow";
import "./css/App.css";

import { useVideoContentContext } from "./context/VideoContentContextProvide";
import { useAutoSearchContext } from "./context/AutoSearchProvider";
import Loading from "./comp/Video/Loading";
function AppSample() {
  const { loading } = useVideoContentContext();
  const { autoClick } = useAutoSearchContext();
  return (
    <>
      {loading ? (
        <Loading>
          <div className="App w3-container" onClick={autoClick}>
            <NavRow />
            <div className="flex flex-row">
              <Nav />
              <Outlet />
            </div>
          </div>
        </Loading>
      ) : (
        <div className="App w3-container" onClick={autoClick}>
          <NavRow />
          <div className="flex flex-row">
            <Nav />
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default AppSample;
