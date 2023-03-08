import { Routes, Route } from "react-router-dom";
import {
  MainPage,
  Map,
  AllCommunity,
  Write,
  Detail,
} from "../comps/mainPageIndex";
import { MapContextProvider } from "../Context/MapContext";
import { CommunityContextProvider } from "../Context/CommunityContext";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route
        path="animal_hospital"
        element={
          <MapContextProvider>
            <Map />
          </MapContextProvider>
        }
      ></Route>
      <Route
        path="AllCommunity"
        element={
          <CommunityContextProvider>
            <AllCommunity />
          </CommunityContextProvider>
        }
      ></Route>
      <Route
        path="write"
        element={
          <CommunityContextProvider>
            <Write />
          </CommunityContextProvider>
        }
      ></Route>
      <Route
        path="/community/:seq"
        element={
          <CommunityContextProvider>
            <Detail />
          </CommunityContextProvider>
        }
      ></Route>
    </Routes>
  );
};

export default MainRouter;
